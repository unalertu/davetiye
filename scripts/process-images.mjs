/**
 * Turns the generated white-background watercolour artwork into transparent
 * assets. Uses the exact "unmultiply white" solution: for an observed colour C
 * painted on a white sheet we pick the largest alpha that can reproduce C, so
 * compositing the result back onto white is pixel-identical to the source while
 * the surrounding paper becomes fully transparent.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC_DIR = process.argv[2] ?? path.join(process.cwd(), "art", "source");
const OUT_DIR = path.join(process.cwd(), "public", "images");

/** Pixels at or above this min-channel value are treated as bare paper. */
const PAPER = 249;

const JOBS = [
  { src: "gen-floral-tall.webp", out: "floral-tall.webp", width: 900 },
  // The hero corners must match the reference's 2:3 proportions, otherwise the
  // trailing vines run down into the couple's names.
  {
    src: "gen-corner-left.webp",
    out: "corner-left.webp",
    width: 820,
    cropAspect: 2 / 3,
    fadeBottom: 0.2,
  },
  {
    src: "gen-corner-right.webp",
    out: "corner-right.webp",
    width: 820,
    cropAspect: 2 / 3,
    fadeBottom: 0.2,
  },
  { src: "gen-floral-divider.webp", out: "floral-divider.webp", width: 1100 },
  { src: "gen-venue.webp", out: "venue.webp", width: 860 },
  { src: "gen-rings.webp", out: "rings.webp", width: 520 },
  { src: "gen-rings-small.webp", out: "rings-small.webp", width: 520 },
  { src: "gen-candles.webp", out: "candles.webp", width: 320 },
  { src: "gen-table.webp", out: "table.webp", width: 1100 },
  { src: "gen-birds.webp", out: "birds.webp", width: 1100 },
  // Paled-down copy for the full-bleed background washes. Bordeaux at the
  // reference's opacity reads far heavier than the original lavender did.
  {
    src: "gen-floral-tall.webp",
    out: "floral-wash.webp",
    width: 900,
    pale: { saturation: 0.66, brightness: 1.24 },
  },
];

async function unmultiplyWhite(file) {
  const { data, info } = await sharp(file)
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);

    if (min >= PAPER) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    const a = (255 - min) / 255;
    // Un-premultiply against the white paper we just removed.
    out[o] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - a)) / a)));
    out[o + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - a)) / a)));
    out[o + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - a)) / a)));
    out[o + 3] = Math.round(a * 255);
  }

  return { buffer: out, width, height };
}

/** Dissolves the bottom edge so a crop never leaves a hard cut across a stem. */
function fadeMask(width, height, fraction) {
  const start = (1 - fraction) * 100;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="${start}%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`
  );
}

/** Soft blush haze that drifts sideways behind the hero. */
async function makeCloud() {
  const w = 1100;
  const h = 460;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="a" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stop-color="#c98593" stop-opacity="0.92"/>
        <stop offset="55%" stop-color="#ddaab4" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#f0d2d7" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="30"/></filter>
    </defs>
    <g filter="url(#blur)">
      <ellipse cx="330" cy="250" rx="250" ry="105" fill="url(#a)"/>
      <ellipse cx="545" cy="200" rx="220" ry="125" fill="url(#a)"/>
      <ellipse cx="760" cy="255" rx="265" ry="100" fill="url(#a)"/>
      <ellipse cx="470" cy="285" rx="300" ry="82" fill="url(#a)"/>
      <ellipse cx="660" cy="160" rx="150" ry="70" fill="url(#a)"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(path.join(OUT_DIR, "cloud.webp"));
  console.log("cloud.webp\tgenerated");
}

mkdirSync(OUT_DIR, { recursive: true });

for (const job of JOBS) {
  const raw = await unmultiplyWhite(path.join(SRC_DIR, job.src));
  let pipeline = sharp(raw.buffer, {
    raw: { width: raw.width, height: raw.height, channels: 4 },
  }).trim({ threshold: 1 });

  // Re-open so the trim is materialised before we measure for cropping.
  let buf = await pipeline.png().toBuffer();
  let meta = await sharp(buf).metadata();

  if (job.cropAspect) {
    const target = Math.round(meta.width / job.cropAspect);
    if (target < meta.height) {
      buf = await sharp(buf)
        .extract({ left: 0, top: 0, width: meta.width, height: target })
        .png()
        .toBuffer();
      meta = await sharp(buf).metadata();
    }
  }

  if (job.fadeBottom) {
    buf = await sharp(buf)
      .composite([{ input: fadeMask(meta.width, meta.height, job.fadeBottom), blend: "dest-in" }])
      .png()
      .toBuffer();
  }

  let out = sharp(buf).resize({ width: job.width, withoutEnlargement: true });
  if (job.pale) out = out.modulate(job.pale);

  const info = await out
    .webp({ quality: 86, alphaQuality: 95, effort: 6 })
    .toFile(path.join(OUT_DIR, job.out));
  console.log(`${job.out}\t${info.width}x${info.height}\t${Math.round(info.size / 1024)}kB`);
}

await makeCloud();
