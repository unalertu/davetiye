import { chromium } from "playwright";

const WIDTHS = [320, 360, 390, 414, 480, 768, 1024, 1280, 1536];
const browser = await chromium.launch();
let problems = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60_000 });
  await page.getByRole("button", { name: /Davetiyeyi Aç/i }).click();
  await page.waitForTimeout(1200);

  const report = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      if (el.getAttribute("aria-hidden") === "true") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // Ignore decorative art that is deliberately bled off-canvas.
      if (el.tagName === "IMG" && el.classList.contains("pointer-events-none")) continue;
      if (r.right > docWidth + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 40),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    }
    return {
      docWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders: offenders.slice(0, 6),
    };
  });

  const hScroll = report.scrollWidth > report.docWidth + 1;
  const bad = hScroll || report.offenders.length > 0 || errors.length > 0;
  if (bad) problems++;

  console.log(
    `${String(width).padStart(4)}px  hScroll=${hScroll ? `YES (${report.scrollWidth}>${report.docWidth})` : "no"}  offenders=${report.offenders.length}  jsErrors=${errors.length}`
  );
  for (const o of report.offenders) {
    console.log(`        ${o.tag} [${o.left}..${o.right}] "${o.text}"`);
  }
  for (const e of errors.slice(0, 3)) console.log(`        JS: ${e.slice(0, 120)}`);

  await ctx.close();
}

await browser.close();
console.log(problems ? `\n${problems} viewport(s) with issues` : "\nall viewports clean");
