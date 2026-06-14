const fs = require("fs");
const path = require("path");

const siteUrl = (process.env.REACT_APP_SITE_URL || "").replace(/\/$/, "");
const buildDir = path.join(__dirname, "..", "build");

const routes = [
  "/",
  "/about",
  "/works",
  "/works/CoranoJewelry",
  "/works/Kyyeudreamers",
  "/works/IronFitness",
  "/works/SocialApp",
];

if (!siteUrl) {
  console.log("REACT_APP_SITE_URL not set — skipping sitemap generation.");
  process.exit(0);
}

if (!fs.existsSync(buildDir)) {
  console.log("Build directory not found — skipping sitemap generation.");
  process.exit(0);
}

const lastmod = new Date().toISOString().split("T")[0];
const urlEntries = routes
  .map((route) => {
    const loc = `${siteUrl}${route === "/" ? "" : route}`;
    const priority = route === "/" ? "1.0" : route === "/about" || route === "/works" ? "0.8" : "0.7";

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(buildDir, "robots.txt"), robots);

console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`);
