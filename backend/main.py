import base64
import mimetypes
import os
import tempfile
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client, handle_file

load_dotenv()


app = FastAPI(
    title="Luxury VTON Backend",
    version="1.0.0",
    description="Production-ready FastAPI backend for IDM-VTON virtual try-on.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _get_suffix(upload: UploadFile) -> str:
    filename = upload.filename or ""
    _, suffix = os.path.splitext(filename)
    suffix = suffix.lower()
    return suffix if suffix else ".jpg"


async def _save_upload_to_temp_file(upload: UploadFile, prefix: str) -> str:
    temp_path: str | None = None

    try:
        file_bytes = await upload.read()
        if not file_bytes:
            raise HTTPException(
                status_code=400,
                detail=f"{prefix} upload is empty.",
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            prefix=f"{prefix}_",
            suffix=_get_suffix(upload),
        ) as temp_file:
            temp_file.write(file_bytes)
            temp_file.flush()
            temp_path = temp_file.name

        return temp_path
    finally:
        await upload.close()


def _extract_generated_image_path(result: Any) -> str:
    if isinstance(result, tuple) and result:
        image_path = result[0]
    elif isinstance(result, list) and result:
        image_path = result[0]
    else:
        raise HTTPException(
            status_code=500,
            detail="Hugging Face Space returned an unexpected result format.",
        )

    if not isinstance(image_path, str) or not image_path:
        raise HTTPException(
            status_code=500,
            detail="Generated image path is missing from the Hugging Face response.",
        )

    if not os.path.exists(image_path):
        raise HTTPException(
            status_code=500,
            detail="Generated image file was not found after try-on processing.",
        )

    return image_path


def _image_file_to_data_url(image_path: str) -> str:
    mime_type, _ = mimetypes.guess_type(image_path)
    if not mime_type:
        mime_type = "image/png"

    with open(image_path, "rb") as image_file:
        encoded = base64.b64encode(image_file.read()).decode("utf-8")

    return f"data:{mime_type};base64,{encoded}"


def _normalize_tryon_category(category: str | None) -> str:
    normalized = (category or "").strip().lower()

    if normalized in {"pantaloni", "lower_body"}:
        return "lower_body"

    if normalized in {"vestiti", "dress"}:
        return "dress"

    return "upper_body"


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Luxury VTON backend is running."}


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/try-on")
async def try_on(
    human_image: UploadFile = File(...),
    garment_image: UploadFile = File(...),
    category: str | None = Form(default=None),
) -> dict[str, str]:
    human_temp_path: str | None = None
    garm_temp_path: str | None = None
    result_image_path: str | None = None

    try:
        human_temp_path = await _save_upload_to_temp_file(human_image, "human_image")
        garm_temp_path = await _save_upload_to_temp_file(garment_image, "garment_image")

        hf_token = os.getenv("HF_TOKEN")
        if hf_token:
            os.environ["HF_TOKEN"] = hf_token
        try:
            client = Client("yisol/IDM-VTON", token=hf_token)
        except Exception:
            client = Client("yisol/IDM-VTON")
        gradio_category = _normalize_tryon_category(category)
        result = client.predict(
            {
                "background": handle_file(human_temp_path),
                "layers": [],
                "composite": None,
            },
            handle_file(garm_temp_path),
            "Natura Selection Premium Style",
            True,
            False,
            30,
            42,
            gradio_category,
            api_name="/tryon",
        )

        result_image_path = _extract_generated_image_path(result)
        base64_data_url = _image_file_to_data_url(result_image_path)
        return {"result_image_url": base64_data_url}
    except HTTPException:
        raise
    except Exception as exc:
        print(f"Unexpected try-on error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        for temp_path in (human_temp_path, garm_temp_path, result_image_path):
            if temp_path and os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except OSError as cleanup_error:
                    print(f"Failed to delete temp file {temp_path}: {cleanup_error}")
