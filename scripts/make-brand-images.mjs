/**
 * Renders the share card and app icon through headless Chromium so they use the
 * same webfonts and artwork as the invitation itself. Requires `npm run dev`.
 */
import { chromium } from "playwright";
import path from "node:path";

const ORIGIN = "http://localhost:3000";
const APP_DIR = path.join(process.cwd(), "app");

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Libre+Baskerville:wght@400;700&display=swap');
`;

const BORDO = "#6e2136";
const INK = "#34151d";
const ROSE = "#c58c9b";

const shareCard = `
<html lang="tr"><head><meta charset="utf-8"><style>
  ${FONTS}
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#fff; overflow:hidden;
         font-family:'Libre Baskerville',serif; color:${INK}; }
  .wrap { position:relative; width:100%; height:100%;
          display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .frame { position:absolute; inset:26px; border:1px solid ${ROSE}66; }
  .frame2 { position:absolute; inset:34px; border:1px solid ${ROSE}33; }
  .fl { position:absolute; pointer-events:none; }
  .fl-l { top:-40px; left:-70px; height:430px; opacity:.9; }
  .fl-r { top:-40px; right:-70px; height:430px; opacity:.9; }
  .fl-b { bottom:-24px; left:50%; transform:translateX(-50%); width:640px; opacity:.85; }
  .kicker { position:relative; font-size:15px; letter-spacing:.3em; text-transform:uppercase;
            color:${INK}b3; margin-bottom:26px; }
  .names { position:relative; font-family:'Alex Brush',cursive; font-size:120px;
           line-height:1.05; color:${INK}; white-space:nowrap; }
  .names .amp { color:${BORDO}; margin:0 .1em; }
  .rings { position:relative; height:74px; margin-top:14px; }
  .date { position:relative; margin-top:18px; font-size:26px; letter-spacing:.14em; color:${INK}; }
  .sub { position:relative; margin-top:16px; font-size:20px; color:${INK}b3; }
  .rule { position:relative; display:flex; align-items:center; gap:14px; margin-top:24px; }
  .rule i { display:block; width:70px; height:1px; background:${ROSE}; }
  .rule b { display:block; width:6px; height:6px; background:${BORDO}; transform:rotate(45deg); }
</style></head><body>
  <div class="wrap">
    <div class="frame"></div><div class="frame2"></div>
    <img class="fl fl-l" src="${ORIGIN}/images/corner-left.webp">
    <img class="fl fl-r" src="${ORIGIN}/images/corner-right.webp">
    <img class="fl fl-b" src="${ORIGIN}/images/floral-divider.webp">
    <div class="kicker">Nişan Davetiyesi</div>
    <div class="names">Dilara<span class="amp">&amp;</span>Furkan</div>
    <img class="rings" src="${ORIGIN}/images/rings.webp">
    <div class="date">19 Eylül 2026</div>
    <div class="sub">Nişanımıza Davetlisiniz</div>
    <div class="rule"><i></i><b></b><i></i></div>
  </div>
</body></html>`;

const iconCard = `
<html><head><meta charset="utf-8"><style>
  ${FONTS}
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:512px; height:512px; background:#fff; overflow:hidden; }
  .wrap { position:relative; width:100%; height:100%;
          display:flex; align-items:center; justify-content:center; }
  .ring { position:absolute; inset:26px; border:6px solid ${BORDO}; border-radius:50%; }
  .ring2 { position:absolute; inset:44px; border:2px solid ${ROSE}; border-radius:50%; }
  .mono { font-family:'Alex Brush',cursive; font-size:190px; line-height:1;
          color:${BORDO}; white-space:nowrap; margin-top:-14px; letter-spacing:.02em; }
</style></head><body>
  <div class="wrap">
    <div class="ring"></div><div class="ring2"></div>
    <div class="mono">DF</div>
  </div>
</body></html>`;

const browser = await chromium.launch();

async function render(html, width, height, file, type) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: file,
    ...(type === "jpeg" ? { type: "jpeg", quality: 92 } : {}),
  });
  await ctx.close();
  console.log(`wrote ${path.basename(file)}`);
}

await render(shareCard, 1200, 630, path.join(APP_DIR, "opengraph-image.jpg"), "jpeg");
await render(iconCard, 512, 512, path.join(APP_DIR, "icon.png"));

await browser.close();
