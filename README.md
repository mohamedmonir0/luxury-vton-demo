# 🇮🇹 Natura Selection - Virtual Try-On AI Platform

Natura Selection is a high-end AI-powered virtual dressing room tailored for luxury Italian fashion. The platform combines a refined Next.js frontend with a FastAPI backend powered by IDM-VTON running through Hugging Face ZeroGPU inference.

## Features

- Real-time AI dressing with IDM-VTON virtual try-on generation
- GDPR compliant user flow with mandatory consent before image processing
- Categorized luxury catalog curated for premium Italian fashion
- Responsive UI optimized for desktop and mobile experiences

## Tech Stack

- Next.js for the frontend application
- FastAPI for the backend API layer
- Hugging Face ZeroGPU for AI inference

## Project Structure

```text
luxury-vton-demo/
├── frontend/
│   └── Next.js application
└── backend/
    └── FastAPI API service
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/monir/luxury-vton-demo.git
cd luxury-vton-demo
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically be available at `http://localhost:3000`.

### 3. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will typically be available at `http://localhost:8000`.

## Environment Variables

Create the appropriate local environment files before starting the app.

### Frontend

Set this variable in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Backend

Set this variable in `backend/.env`:

```env
HF_TOKEN=your_hugging_face_token
```

## Deployment Notes

- Ensure the frontend can reach the backend through `NEXT_PUBLIC_API_URL`.
- Provide a valid `HF_TOKEN` in the backend environment for authenticated Hugging Face access when required.
- The UI includes a privacy consent gate and a legal disclaimer stating that images are processed in real time and not stored on the server.

## Running In Production

### Frontend

```bash
cd frontend
npm install
npm run build
npm run start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
