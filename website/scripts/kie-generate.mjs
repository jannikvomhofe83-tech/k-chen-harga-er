/**
 * Generiert die Editorial-Bilder für /kuechen über die KIE-AI-API
 * (Modell: gpt-image-2-text-to-image) und legt sie unter public/generated/ ab.
 *
 * Aufruf:  KIE_API_KEY=... node scripts/kie-generate.mjs [namen...]
 * Ohne Argumente werden alle fehlenden Bilder erzeugt, mit Argumenten nur diese.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const API = "https://api.kie.ai/api/v1";
const KEY = process.env.KIE_API_KEY;
const OUT = path.resolve(import.meta.dirname, "../public/generated");
const MODEL = "gpt-image-2-text-to-image";

if (!KEY) {
  console.error("KIE_API_KEY fehlt.");
  process.exit(1);
}

/** Gemeinsame Stil-Klammer für einen konsistenten Look. */
const STYLE =
  "editorial interior photography for a premium German kitchen studio magazine, " +
  "warm muted palette of cream linen, sage green, oak wood and dark walnut, " +
  "soft natural window light, photorealistic, no text, no watermark, no people's faces";

const IMAGES = [
  {
    name: "hero-kueche",
    size: "3:2",
    prompt:
      "WIDE HORIZONTAL LANDSCAPE format, panoramic wide-angle view: bright airy modern kitchen interior, " +
      "sage green matte cabinets and warm oak wood fronts stretching across the frame, " +
      "large window with soft morning light, long oak kitchen island with ceramic bowl and linen towel, " +
      "generous calm negative space on the left half of the image for typography, " +
      STYLE,
  },
  {
    name: "service-kuechendesign",
    size: "3:2",
    prompt:
      "Hand sketching a kitchen design with a pencil on paper, next to material samples of oak wood " +
      "and sage green lacquer chips arranged as a moodboard on warm linen, top-down view, shallow depth of field, " +
      STYLE,
  },
  {
    name: "service-grundriss",
    size: "3:2",
    prompt:
      "Precise architectural kitchen floor plan drawing on large white paper, steel ruler and dark red fineliner, " +
      "fine technical pencil lines, top-down view on an oak desk, " +
      STYLE,
  },
  {
    name: "service-arbeitsplatten",
    size: "3:2",
    prompt:
      "WIDE HORIZONTAL LANDSCAPE format: macro close-up of a long natural stone countertop edge " +
      "running horizontally across the frame, meeting a matte oak kitchen front below, " +
      "fine material textures, warm directional side light, " +
      STYLE,
  },
  {
    name: "service-sonderanfertigung",
    size: "3:2",
    prompt:
      "Carpenter hand-planing an oak board in a joinery workshop, fine wood shavings curling off the plane, " +
      "warm workshop light, shallow depth of field, " +
      STYLE,
  },
  {
    name: "service-renovierung",
    size: "3:2",
    prompt:
      "WIDE HORIZONTAL LANDSCAPE format: kitchen renovation scene photographed from the side, " +
      "a new matte sage green cabinet front leaning against a bright wall, " +
      "painter tape, folding rule and screwdriver arranged on a canvas drop cloth in the foreground, " +
      STYLE,
  },
  {
    name: "service-montage",
    size: "3:2",
    prompt:
      "WIDE HORIZONTAL LANDSCAPE format: hands of a professional kitchen installer mounting a long oak " +
      "wall cabinet with a cordless drill, spirit level lying on the counter in the foreground, " +
      "bright clean modern kitchen stretching across the frame, " +
      STYLE,
  },
  {
    name: "prozess-erstgespraech",
    size: "2:3",
    prompt:
      "Two ceramic coffee cups and kitchen material samples spread on an oak table in a bright kitchen showroom, " +
      "warm inviting consultation scene photographed over the shoulder, portrait composition, " +
      STYLE,
  },
  {
    name: "prozess-entwurf",
    size: "2:3",
    prompt:
      "Architect desk with a kitchen floor plan, pencil, eraser and folding wooden ruler, " +
      "calm precise atmosphere, portrait composition, " +
      STYLE,
  },
  {
    name: "prozess-werkstatt",
    size: "2:3",
    prompt:
      "Custom oak kitchen cabinet frame being assembled in a joinery workshop, wooden clamps, " +
      "sawdust floating in warm slanting light, portrait composition, " +
      STYLE,
  },
  {
    name: "prozess-montage",
    size: "2:3",
    prompt:
      "Installer adjusting the hinge of a sage green kitchen cabinet door with a screwdriver, " +
      "freshly installed bright kitchen, portrait composition, " +
      STYLE,
  },
];

const headers = {
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

async function createTask(img) {
  const res = await fetch(`${API}/jobs/createTask`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODEL,
      input: { prompt: img.prompt, size: img.size },
    }),
  });
  const json = await res.json();
  if (json.code !== 200) throw new Error(`${img.name}: ${json.msg}`);
  return json.data.taskId;
}

async function pollTask(taskId, name) {
  const deadline = Date.now() + 240_000;
  for (;;) {
    if (Date.now() > deadline) throw new Error(`${name}: Timeout`);
    await new Promise((r) => setTimeout(r, 5000));
    const res = await fetch(`${API}/jobs/recordInfo?taskId=${taskId}`, { headers });
    const json = await res.json();
    const d = json.data;
    if (d.state === "success") {
      return JSON.parse(d.resultJson).resultUrls[0];
    }
    if (d.state === "fail") {
      throw new Error(`${name}: ${d.failMsg ?? d.failCode}`);
    }
  }
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const queue = IMAGES.filter((img) => only.length === 0 || only.includes(img.name));

  const todo = [];
  for (const img of queue) {
    const file = path.join(OUT, `${img.name}.png`);
    if (only.length === 0 && (await exists(file))) {
      console.log(`✓ ${img.name} existiert bereits — übersprungen`);
      continue;
    }
    todo.push({ ...img, file });
  }

  // Begrenzte Parallelität, um das API-Limit zu schonen
  const CONCURRENCY = 3;
  let failed = 0;
  for (let i = 0; i < todo.length; i += CONCURRENCY) {
    const batch = todo.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (img) => {
        try {
          console.log(`→ ${img.name}: Task wird erstellt …`);
          const taskId = await createTask(img);
          const url = await pollTask(taskId, img.name);
          await download(url, img.file);
          console.log(`✓ ${img.name} gespeichert`);
        } catch (err) {
          failed++;
          console.error(`✗ ${String(err)}`);
        }
      })
    );
  }
  if (failed > 0) process.exit(2);
}

run();
