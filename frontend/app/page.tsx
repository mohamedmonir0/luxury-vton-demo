"use client";

import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState } from "react";

type Categoria =
  | "Vestiti"
  | "Camicie e Bluse"
  | "Pantaloni"
  | "Kimono"
  | "Maglioni e Cardigan"
  | "Pigiami"
  | "Gilet";

type ProdottoCatalogo = {
  id: number;
  name: string;
  price: string;
  category: Categoria;
  image: string;
};

type BackendTryOnCategory = "upper_body" | "lower_body" | "dress";

type RispostaTryOn = {
  status?: string;
  result_image_url?: string;
  detail?: string;
};

const categorie: Categoria[] = [
  "Vestiti",
  "Camicie e Bluse",
  "Pantaloni",
  "Kimono",
  "Maglioni e Cardigan",
  "Pigiami",
  "Gilet",
];

const catalogData: ProdottoCatalogo[] = [
  { id: 1, name: "Vestito Atelier I", price: "€129.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/157077_0004.jpg?v=1773069775&width=1100" },
  { id: 2, name: "Vestito Atelier II", price: "€135.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/156998_0042.jpg?v=1773067851&width=1100" },
  { id: 3, name: "Vestito Atelier III", price: "€139.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/157031_0572.jpg?v=1771419694&width=1100" },
  { id: 4, name: "Vestito Atelier IV", price: "€142.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/157040_0001.jpg?v=1774368027&width=1100" },
  { id: 5, name: "Vestito Atelier V", price: "€145.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/157386.jpg?v=1775727130&width=1100" },
  { id: 6, name: "Vestito Atelier VI", price: "€138.00", category: "Vestiti", image: "https://naturaselection.com/cdn/shop/files/157391_0019.jpg?v=1776327706&width=1100" },
  { id: 7, name: "Camicia Signature I", price: "€79.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/R_156989_0029.jpg?v=1775732260&width=1100" },
  { id: 8, name: "Camicia Signature II", price: "€85.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/155378_155399_0049.jpg?v=1770989520&width=1100" },
  { id: 9, name: "Blusa Signature III", price: "€89.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/S7_057EXTENDED_460d2d6e-30e1-42e8-b9ed-961eb31a9bff.jpg?v=1773235590&width=1100" },
  { id: 10, name: "Blusa Signature IV", price: "€94.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/156978W_0064.jpg?v=1771929936&width=1100" },
  { id: 11, name: "Camicia Signature V", price: "€99.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/157108_1155.jpg?v=1768309262&width=1100" },
  { id: 12, name: "Blusa Signature VI", price: "€105.00", category: "Camicie e Bluse", image: "https://naturaselection.com/cdn/shop/files/156975_IA.jpg?v=1771592185&width=1100" },
  { id: 13, name: "Pantalone Tailored I", price: "€92.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/155320B_155326B_0777_05be8d3c-3fc2-4b83-b749-7300ed4eeb19.jpg?v=1768566908&width=1100" },
  { id: 14, name: "Pantalone Tailored II", price: "€98.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/R155319G_155326G_1881_105b46e0-6ca5-4361-a6dd-228b9a8b86b9.jpg?v=1768566941&width=1100" },
  { id: 15, name: "Pantalone Tailored III", price: "€104.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/155324_155310_155322_0949.jpg?v=1768402308&width=1100" },
  { id: 16, name: "Pantalone Tailored IV", price: "€109.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/P_5_1446.jpg?v=1775727057&width=1100" },
  { id: 17, name: "Pantalone Tailored V", price: "€115.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/155311-BLUE_1.jpg?v=1771493446&width=1100" },
  { id: 18, name: "Pantalone Tailored VI", price: "€119.00", category: "Pantaloni", image: "https://naturaselection.com/cdn/shop/files/20241025_NATURA_SS25_ECOM_151362_151268_0015.jpg?v=1738140737&width=1100" },
  { id: 19, name: "Kimono Resort I", price: "€124.00", category: "Kimono", image: "https://naturaselection.com/cdn/shop/files/157177_0017.jpg?v=1772725978&width=1100" },
  { id: 20, name: "Kimono Resort II", price: "€129.00", category: "Kimono", image: "https://naturaselection.com/cdn/shop/files/157261_0011.jpg?v=1772898490&width=1100" },
  { id: 21, name: "Kimono Resort III", price: "€134.00", category: "Kimono", image: "https://naturaselection.com/cdn/shop/files/157178_0010.jpg?v=1772915111&width=1100" },
  { id: 22, name: "Kimono Resort IV", price: "€139.00", category: "Kimono", image: "https://naturaselection.com/cdn/shop/files/157583_0125.jpg?v=1773922856&width=1100" },
  { id: 23, name: "Maglione Heritage I", price: "€88.00", category: "Maglioni e Cardigan", image: "https://naturaselection.com/cdn/shop/files/157104-CHOCOLATE_1.jpg?v=1773235510&width=1100" },
  { id: 24, name: "Cardigan Heritage II", price: "€96.00", category: "Maglioni e Cardigan", image: "https://naturaselection.com/cdn/shop/files/155291_0394.jpg?v=1768309131&width=1100" },
  { id: 25, name: "Maglione Heritage III", price: "€101.00", category: "Maglioni e Cardigan", image: "https://naturaselection.com/cdn/shop/files/155324_155310_0817.jpg?v=1768994615&width=1100" },
  { id: 26, name: "Cardigan Heritage IV", price: "€108.00", category: "Maglioni e Cardigan", image: "https://naturaselection.com/cdn/shop/files/155338-TAUPE_1.jpg?v=1772658876&width=1100" },
  { id: 27, name: "Maglione Heritage V", price: "€114.00", category: "Maglioni e Cardigan", image: "https://naturaselection.com/cdn/shop/files/155397_155398_157379B_0138.jpg?v=1773424252&width=1100" },
  { id: 28, name: "Pigiama Lounge I", price: "€69.00", category: "Pigiami", image: "https://naturaselection.com/cdn/shop/files/P_8_2585.jpg?v=1775732075&width=1100" },
  { id: 29, name: "Pigiama Lounge II", price: "€75.00", category: "Pigiami", image: "https://naturaselection.com/cdn/shop/files/157337_0049.jpg?v=1774951132&width=1100" },
  { id: 30, name: "Pigiama Lounge III", price: "€82.00", category: "Pigiami", image: "https://naturaselection.com/cdn/shop/files/157250_2568.jpg?v=1771414617&width=1100" },
  { id: 31, name: "Pigiama Lounge IV", price: "€89.00", category: "Pigiami", image: "https://naturaselection.com/cdn/shop/files/157400_157399_0078.jpg?v=1775727033&width=1100" },
  { id: 32, name: "Gilet Couture I", price: "€95.00", category: "Gilet", image: "https://naturaselection.com/cdn/shop/files/155303_0130.jpg?v=1774268040&width=1100" },
  { id: 33, name: "Gilet Couture II", price: "€102.00", category: "Gilet", image: "https://naturaselection.com/cdn/shop/files/157262_157263_0107.jpg?v=1774525927&width=1100" },
  { id: 34, name: "Gilet Couture III", price: "€108.00", category: "Gilet", image: "https://naturaselection.com/cdn/shop/files/155361_155398W_0039.jpg?v=1772106125&width=1100" },
  { id: 35, name: "Gilet Couture IV", price: "€114.00", category: "Gilet", image: "https://naturaselection.com/cdn/shop/files/155292R_0021.jpg?v=1770197861&width=1100" },
  { id: 36, name: "Gilet Couture V", price: "€119.00", category: "Gilet", image: "https://naturaselection.com/cdn/shop/files/155396-OFFWHITE_1.jpg?v=1775731801&width=1100" },
];

function getBackendCategory(category: Categoria): BackendTryOnCategory {
  if (category === "Pantaloni") {
    return "lower_body";
  }

  if (category === "Vestiti") {
    return "dress";
  }

  return "upper_body";
}

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
  const inputFotoRef = useRef<HTMLInputElement | null>(null);
  const [categoriaAttiva, setCategoriaAttiva] = useState<Categoria>("Vestiti");
  const [capoSelezionatoId, setCapoSelezionatoId] = useState<number | null>(null);
  const [fileModella, setFileModella] = useState<File | null>(null);
  const [anteprimaModella, setAnteprimaModella] = useState<string | null>(null);
  const [immagineRisultato, setImmagineRisultato] = useState<string | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [messaggioErrore, setMessaggioErrore] = useState<string | null>(null);
  const [consensoPrivacy, setConsensoPrivacy] = useState(false);

  const capiFiltrati = useMemo(
    () => catalogData.filter((capo) => capo.category === categoriaAttiva),
    [categoriaAttiva],
  );

  const capoSelezionato =
    catalogData.find((capo) => capo.id === capoSelezionatoId) ?? capiFiltrati[0] ?? catalogData[0];

  const immaginePrincipale = immagineRisultato ?? anteprimaModella;

  function apriUploadFoto() {
    inputFotoRef.current?.click();
  }

  function gestisciCambioModella(event: ChangeEvent<HTMLInputElement>) {
    const nuovoFile = event.target.files?.[0] ?? null;

    if (anteprimaModella) {
      URL.revokeObjectURL(anteprimaModella);
    }

    setMessaggioErrore(null);
    setImmagineRisultato(null);
    setFileModella(nuovoFile);
    setAnteprimaModella(nuovoFile ? URL.createObjectURL(nuovoFile) : null);
  }

  async function creaFileDaUrl(urlImmagine: string, nomeCapo: string) {
    const risposta = await fetch(urlImmagine);

    if (!risposta.ok) {
      throw new Error("Impossibile scaricare l'immagine del capo selezionato.");
    }

    const blob = await risposta.blob();
    const nomePulito = nomeCapo.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const estensione = blob.type.split("/")[1] || "jpg";

    return new File([blob], `${nomePulito}.${estensione}`, {
      type: blob.type || "image/jpeg",
    });
  }

  async function handleTryOn(capo: ProdottoCatalogo) {
    setCapoSelezionatoId(capo.id);

    if (!consensoPrivacy) {
      setMessaggioErrore("Devi accettare il trattamento dei dati personali per continuare.");
      return;
    }

    if (!fileModella) {
      setMessaggioErrore("Carica prima la foto della modella per avviare la prova virtuale.");
      return;
    }

    setCaricamento(true);
    setMessaggioErrore(null);

    try {
      const fileCapo = await creaFileDaUrl(capo.image, capo.name);
      const formData = new FormData();

      formData.append("human_image", fileModella);
      formData.append("garment_image", fileCapo);
      formData.append("category", getBackendCategory(capo.category));

      const risposta = await fetch(`${apiBaseUrl}/api/try-on`, {
        method: "POST",
        body: formData,
      });

      const dati: RispostaTryOn = await risposta.json();

      if (!risposta.ok) {
        throw new Error(dati.detail || "La sartoria digitale non ha completato il risultato.");
      }

      if (!dati.result_image_url) {
        throw new Error("Il backend non ha restituito un'immagine finale valida.");
      }

      setImmagineRisultato(dati.result_image_url);
    } catch (errore) {
      setImmagineRisultato(null);
      setMessaggioErrore(
        errore instanceof Error ? errore.message : "Si è verificato un errore imprevisto.",
      );
    } finally {
      setCaricamento(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f3ee_0%,#f3f5f7_100%)] text-[#1f2937]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <div className="flex flex-1 flex-col xl:grid xl:grid-cols-[15fr_30fr_55fr]">
        <aside className="border-b border-[#d9dde5] bg-[linear-gradient(180deg,#f4ede3_0%,#eef1f4_100%)] xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col p-5 md:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b6f47]">
                Natura Selection
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-[#111827]">Personalizza</h1>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 xl:grid-cols-1">
              {categorie.map((categoria) => {
                const attiva = categoriaAttiva === categoria;

                return (
                  <button
                    key={categoria}
                    type="button"
                    onClick={() => setCategoriaAttiva(categoria)}
                    className={`group rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                      attiva
                        ? "border-[#b88a44] bg-[#fff8ef] text-[#7a5521] shadow-[0_10px_30px_rgba(122,85,33,0.08)]"
                        : "border-[#d7dce5] bg-white/90 text-[#4b5563] hover:border-[#d4b27b] hover:bg-[#fffaf2] hover:text-[#6d4c22]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{categoria}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          attiva ? "bg-[#b88a44]" : "bg-[#d5d8de] group-hover:bg-[#d4b27b]"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-[#d8dde6] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#94a3b8]">
                Suggerimento
              </p>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                Carica una foto frontale nitida. Poi tocca un capo nel catalogo per avviare la
                prova virtuale.
              </p>
            </div>
          </div>
        </aside>

        <section className="border-b border-[#e5e7eb] bg-white xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col p-5 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#94a3b8]">
                  Catalogo
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#111827]">
                  Seleziona un capo
                </h2>
              </div>
              <div className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#6b7280]">
                {capiFiltrati.length} articoli
              </div>
            </div>

            <div className="mt-6 grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-1 xl:max-h-[calc(100vh-8rem)]">
              {capiFiltrati.map((capo) => {
                const selezionato = capo.id === capoSelezionatoId;

                return (
                  <button
                    key={capo.id}
                    type="button"
                    onClick={() => {
                      setCapoSelezionatoId(capo.id);
                      setMessaggioErrore(null);
                    }}
                    className={`overflow-hidden rounded-3xl border bg-white text-left transition ${
                      selezionato
                        ? "border-[#b88a44] ring-2 ring-[#e4c99a]"
                        : "border-[#e5e7eb] hover:border-[#d4b27b] hover:shadow-md"
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-[#f8fafc]">
                      <Image
                        src={capo.image}
                        alt={capo.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 20vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-semibold text-[#111827]">
                        {capo.name}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-sm text-[#6b7280]">{capo.price}</span>
                        <span className="rounded-full bg-[#fff5e8] px-2.5 py-1 text-[11px] font-semibold text-[#9a6a2f]">
                          Prova
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f8fa]">
          <div className="flex h-full flex-col p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#94a3b8]">
                  Anteprima
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#111827]">Prova virtuale</h2>
              </div>
              {capoSelezionato ? (
                <div className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#6b7280] shadow-sm">
                  {capoSelezionato.name}
                </div>
              ) : null}
            </div>

            <div className="relative mt-6 flex-1 overflow-hidden rounded-[2rem] border border-[#dde3ea] bg-white shadow-sm">
              <button
                type="button"
                onClick={apriUploadFoto}
                className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1f2937]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8h3l1.5-2h7L17 8h3v10H4z" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
                Carica la tua foto
              </button>

              {immaginePrincipale ? (
                <button
                  type="button"
                  onClick={apriUploadFoto}
                  className="relative block h-full min-h-[420px] w-full cursor-pointer"
                  aria-label="Carica una nuova foto modella"
                >
                  <Image
                    src={immaginePrincipale}
                    alt={immagineRisultato ? "Risultato della prova virtuale" : "Foto della modella"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1279px) 100vw, 55vw"
                    unoptimized={
                      immaginePrincipale.startsWith("blob:") ||
                      immaginePrincipale.startsWith("data:")
                    }
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111827]/70 to-transparent px-6 pb-5 pt-12 text-left text-white">
                    <p className="text-sm font-semibold">Tocca l’immagine per sostituire la foto</p>
                    <p className="mt-1 text-xs text-white/80">
                      Supporta upload diretto di un nuovo ritratto o figura intera.
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={apriUploadFoto}
                  className="flex h-full min-h-[420px] w-full flex-col items-center justify-center px-8 text-center transition hover:bg-[#fcfaf7]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7ead7] text-[#9a6a2f]">
                    ✦
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-[#111827]">
                    Carica la tua modella
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#6b7280]">
                    Tocca l’anteprima o il pulsante in alto per scegliere una foto. Dopo il
                    caricamento, seleziona un capo nel catalogo per generare il fitting.
                  </p>
                </button>
              )}

              {caricamento ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm">
                  <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#ead9bb] border-t-[#9a6a2f]" />
                  <p className="mt-5 text-2xl font-semibold text-[#7a5521]">
                    Sartoria in corso...
                  </p>
                  <p className="mt-2 text-sm text-[#6b7280]">
                    Stiamo adattando il capo selezionato alla modella.
                  </p>
                </div>
              ) : null}
            </div>

            <p className="mt-3 text-xs leading-5 text-[#6b7280]">
              Nota: Per i pantaloni, caricare una foto a figura intera. Per maglie e camicie, una
              foto a mezzo busto è sufficiente.
            </p>

            {messaggioErrore ? (
              <div className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b91c1c]">
                {messaggioErrore}
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                ref={inputFotoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={gestisciCambioModella}
              />
              <div className="text-sm text-[#6b7280]">
                {fileModella
                  ? `Foto caricata: ${fileModella.name}`
                  : "Nessuna foto caricata al momento"}
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-[1.75rem] border border-[#dbc6a5] bg-[linear-gradient(135deg,rgba(255,248,239,0.96)_0%,rgba(255,255,255,0.98)_100%)] px-5 py-4 shadow-[0_16px_40px_rgba(122,85,33,0.08)] transition hover:border-[#c8a876]">
              <input
                type="checkbox"
                checked={consensoPrivacy}
                onChange={(event) => {
                  setConsensoPrivacy(event.target.checked);
                  if (event.target.checked) {
                    setMessaggioErrore(null);
                  }
                }}
                className="mt-1 h-5 w-5 rounded border-[#b88a44] text-[#9a6a2f] accent-[#9a6a2f]"
              />
              <span className="space-y-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6f47]">
                  Privacy & Consenso
                </span>
                <span className="block text-sm font-medium leading-6 text-[#4b5563]">
                  Acconsento al trattamento dei dati personali (GDPR).
                </span>
              </span>
            </label>

            <button
              type="button"
              onClick={() => void handleTryOn(capoSelezionato)}
              disabled={!consensoPrivacy || !fileModella || caricamento}
              className={`mt-5 inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                !consensoPrivacy || !fileModella || caricamento
                  ? "cursor-not-allowed bg-[#d6d3d1] text-white"
                  : "bg-[linear-gradient(135deg,#8b6f47_0%,#c39a5b_100%)] text-white shadow-[0_20px_40px_rgba(139,111,71,0.24)] hover:translate-y-[-1px] hover:shadow-[0_24px_46px_rgba(139,111,71,0.28)]"
              }`}
            >
              {caricamento ? "Elaborazione in corso..." : "Try-On"}
            </button>
          </div>
        </section>
        </div>

        <footer className="border-t border-[#ddd6ce] bg-white/80 px-6 py-5 text-center text-xs leading-6 text-[#6b7280] backdrop-blur">
          Le immagini vengono elaborate in tempo reale e non vengono salvate sui nostri server.
        </footer>
      </div>
    </main>
  );
}
