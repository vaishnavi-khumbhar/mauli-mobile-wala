/* ==========================================================================
   FIX IMAGES — run:  npm run images
   --------------------------------------------------------------------------
   1. iPhone photos (.heic / .heif) do NOT show in browsers.
      This converts them to .jpg with the SAME name (about-hero.HEIC -> about-hero.jpg).
   2. Heavy images (over 600 KB) are resized to max 1920px and compressed to .jpg,
      so the website loads fast on mobile data.
   Originals are moved (not deleted) to:  image-originals/  (project root)
   If two files have the same name (e.g. store-interior.png + store-interior.HEIC),
   the NEWEST file is kept on the website and the older one goes to image-originals/.
   ========================================================================== */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const DIR = path.resolve("src/assets/images");
const BACKUP = path.resolve("image-originals");
const MAX_W = 1920;
const HEAVY = 600 * 1024;
const IMG = /\.(heic|heif|jpe?g|png|webp|avif)$/i;
const HEIC = /\.(heic|heif)$/i;

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function backup(file) {
  await fs.mkdir(BACKUP, { recursive: true });
  let dest = path.join(BACKUP, file);
  try { await fs.access(dest); dest = path.join(BACKUP, `${Date.now()}-${file}`); } catch {}
  await fs.rename(path.join(DIR, file), dest);
}

const files = (await fs.readdir(DIR)).filter((f) => IMG.test(f));

// Group by name (without extension) → keep the newest file of each name
const groups = {};
for (const f of files) {
  const { mtimeMs, size } = await fs.stat(path.join(DIR, f));
  const name = f.replace(/\.[^.]+$/, "").toLowerCase();
  (groups[name] ||= []).push({ f, mtimeMs, size });
}

let changed = 0;
for (const [name, list] of Object.entries(groups)) {
  list.sort((a, b) => b.mtimeMs - a.mtimeMs);
  const [keep, ...older] = list;
  for (const o of older) {
    await backup(o.f);
    console.log(`  duplicate   ${o.f}  -> moved to image-originals (kept newer ${keep.f})`);
    changed++;
  }

  const isHeic = HEIC.test(keep.f);
  if (!isHeic && keep.size <= HEAVY) continue;

  const src = path.join(DIR, keep.f);
  // Already a jpg of web size → leave it (never re-compress again and again)
  if (!isHeic && /\.jpe?g$/i.test(keep.f)) {
    const { width = 0 } = await sharp(src).metadata();
    if (width <= MAX_W) continue;
  }
  let input = await fs.readFile(src);
  if (isHeic) input = Buffer.from(await heicConvert({ buffer: input, format: "JPEG", quality: 1 }));

  const out = await sharp(input)
    .rotate() // respects phone orientation
    .resize({ width: MAX_W, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await backup(keep.f);
  const base = keep.f.replace(/\.[^.]+$/, "");
  await fs.writeFile(path.join(DIR, `${base}.jpg`), out);
  console.log(`  ${isHeic ? "HEIC -> JPG" : "compressed "}  ${keep.f} (${kb(keep.size)}) -> ${base}.jpg (${kb(out.length)})`);
  changed++;
}

console.log(changed ? `\nDone: ${changed} change(s). Restart "npm run dev" and press Ctrl+Shift+R.` : "All images are already fine.");
