/*
 * One-off helper: builds the 1200x630 share images in public/.
 * Needs `sharp` (not a project dependency): `npx -p sharp node scripts/generate-og-images.js`
 * or run with NODE_PATH pointing at a folder that has sharp installed.
 * Re-run it after adding a project (add its poster below).
 */
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const posters = {
  Nimbus: "Nimbus",
  LPAgent: "LPAgent",
  Scouty: "Scouty",
  Mermail: "Mermail",
  ThomasRider: "ThomasRider",
  CoranoJewelry: "CoranoMarket",
  Kyyeudreamers: "Kyyeudreamer",
  SocialApp: "SocialApp",
};

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="14" fill="#b23d43"/>
  <text x="80" y="150" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="44" font-weight="700" fill="#b23d43">Hello!</text>
  <text x="76" y="290" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="118" font-weight="800" letter-spacing="-4" fill="#1a1a1a">Nguyen Binh</text>
  <text x="80" y="390" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="-1.5" fill="#1a1a1a">Frontend Engineer in Vietnam<tspan fill="#b23d43">.</tspan></text>
  <text x="80" y="470" font-family="Menlo, Monaco, monospace" font-size="28" fill="#3d3d3d">Fintech &amp; Web3 / React, Next.js, TypeScript</text>
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#e6e6e6" stroke-width="2"/>
  <text x="80" y="580" font-family="Menlo, Monaco, monospace" font-size="24" fill="#646464">binh98.vercel.app</text>
</svg>`;

(async () => {
  await sharp(Buffer.from(card)).jpeg({ quality: 88 }).toFile(path.join(root, "public", "og.jpg"));
  for (const [slug, name] of Object.entries(posters)) {
    await sharp(path.join(root, "src", "assets", "videos", `${name}-poster-2x.webp`))
      .resize(1200, 630, { fit: "cover", position: "top" })
      .jpeg({ quality: 82 })
      .toFile(path.join(root, "public", "og", `${slug}.jpg`));
  }
  console.log("Share images written to public/og.jpg and public/og/");
})();
