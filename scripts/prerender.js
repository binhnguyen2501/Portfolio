/*
 * Post-build step for search engines and AI assistants.
 *
 * The app is a client-rendered SPA, so a crawler that does not run JavaScript
 * (most AI crawlers, link previews) would only see an empty <div id="root">.
 * This script reads the same data the app uses (src/constants.ts, src/seo.ts)
 * and writes, for every route:
 *   - build/<route>/index.html with that page's own <title>, description,
 *     canonical, Open Graph/Twitter tags and JSON-LD, plus the page's content
 *     as plain semantic HTML inside #root (React replaces it on load);
 *   - build/sitemap.xml and build/robots.txt;
 *   - build/llms.txt and build/llms-full.txt (markdown summaries for LLMs).
 */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");

if (!fs.existsSync(path.join(buildDir, "index.html"))) {
  console.log("Build output not found — skipping prerender.");
  process.exit(0);
}

/* ---------- Load the app's own data (TypeScript) ---------- */

const cache = {};
const loadTs = (file) => {
  if (cache[file]) return cache[file].exports;
  const source = fs.readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  });
  const mod = { exports: {} };
  cache[file] = mod;
  const localRequire = (id) => {
    if (id === "@/constants") return loadTs(path.join(root, "src", "constants.ts"));
    // images and videos are only needed by the browser bundle
    if (id.includes("/assets/")) return id;
    return require(id);
  };
  // eslint-disable-next-line no-new-func
  new Function("require", "module", "exports", outputText)(localRequire, mod, mod.exports);
  return mod.exports;
};

const data = loadTs(path.join(root, "src", "constants.ts"));
const seo = loadTs(path.join(root, "src", "seo.ts"));
const { WorkDetailList, ExperienceList, SkillCategories, EducationList } = data;
const { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_SHORT_NAME, JOB_TITLE, SOCIAL_LINKS } = seo;

/* ---------- Helpers ---------- */

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const abs = (p) => (p.startsWith("http") ? p : `${SITE_URL}${p === "/" ? "/" : p}`);
const li = (items) => items.map((item) => `<li>${item}</li>`).join("");
const ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/* ---------- Shared page chrome ---------- */

const nav = `<header><p><a href="/">${esc(AUTHOR_SHORT_NAME)}</a></p><nav aria-label="Main"><a href="/about">About</a> · <a href="/works">Projects</a> · <a href="/CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Engineer.pdf">Resume (PDF)</a></nav></header>`;

const contact = `<footer><h2>Contact</h2><ul>${li([
  `Email: <a href="mailto:${SOCIAL_LINKS.email}">${SOCIAL_LINKS.email}</a>`,
  `Phone: <a href="tel:+84397665660">+84 39 766 56 60</a>`,
  `LinkedIn: <a href="${SOCIAL_LINKS.linkedin}">${SOCIAL_LINKS.linkedin}</a>`,
  `GitHub: <a href="${SOCIAL_LINKS.github}">${SOCIAL_LINKS.github}</a>`,
])}</ul></footer>`;

const projectList = () =>
  `<ol>${li(
    WorkDetailList.map(
      (p) =>
        `<a href="/works/${p.url}"><strong>${esc(p.title)}</strong></a> (${esc(p.category)}, ${esc(
          p.role
        )}): ${esc(p.tagline)}`
    )
  )}</ol>`;

/* ---------- Page bodies ---------- */

const homeBody = () => `
<main>
  <h1>${esc(AUTHOR_SHORT_NAME)}: ${esc(JOB_TITLE)} based in Vietnam</h1>
  <p>${esc(seo.PROFILE_SUMMARY)}</p>
  <p>Fintech &amp; Web3 / React, Next.js, TypeScript. <a href="/about">About me</a>.</p>
  <h2>Selected projects</h2>
  ${projectList()}
  <p><a href="/works">See all work</a></p>
</main>`;

const aboutBody = () => `
<main>
  <h1>About ${esc(AUTHOR_NAME)}</h1>
  <p>${esc(seo.PROFILE_SUMMARY)}</p>
  <p>He also works on the backend with Node.js, Express.js, and PostgreSQL, and works directly with founders and product teams: planning releases, reviewing code, and mentoring frontend developers.</p>
  <h2>Key facts</h2>
  <ul>${li(seo.PROFILE_FACTS.map(esc))}</ul>
  <h2>Experience</h2>
  <ol>${li(
    ExperienceList.map(
      (job) =>
        `<h3>${esc(job.role)} at <a href="${job.site}">${esc(job.company)}</a></h3><p>${esc(
          job.start
        )} – ${esc(job.end)} · ${esc(job.kind)}${job.note ? ` · ${esc(job.note)}` : ""}</p>${
          job.summary ? `<p>${esc(job.summary)}</p>` : ""
        }<ul>${li(job.highlights.map(esc))}</ul>`
    )
  )}</ol>
  <h2>Toolkit</h2>
  <dl>${SkillCategories.map(
    (s) => `<dt>${esc(s.category)}</dt><dd>${esc(s.items.join(", "))}</dd>`
  ).join("")}</dl>
  <h2>Education</h2>
  <ul>${li(
    EducationList.map(
      (e) => `<strong>${esc(e.school)}</strong>, ${esc(e.years)}. ${esc(e.program)}. Classification: ${esc(e.grade)}.`
    )
  )}</ul>
  <p><a href="/works">See my work</a> · <a href="/CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Engineer.pdf">Download CV (PDF)</a></p>
</main>`;

const worksBody = () => `
<main>
  <h1>Projects and case studies by ${esc(AUTHOR_SHORT_NAME)}</h1>
  <p>Dashboards, storefronts, and web apps: product work, client sites, and personal builds. Each case study covers the problem, the approach, and the result.</p>
  <ol>${li(
    WorkDetailList.map(
      (p) =>
        `<h2><a href="/works/${p.url}">${esc(p.title)}</a></h2><p>${esc(p.tagline)}</p><p>Role: ${esc(
          p.role
        )}. Status: ${esc(p.status)}. Stack: ${esc(p.techStack.join(", "))}.</p>`
    )
  )}</ol>
</main>`;

const projectBody = (p) => `
<main>
  <p><a href="/works">All projects</a></p>
  <h1>${esc(p.title)}</h1>
  <p>${esc(p.tagline)}</p>
  <dl>
    <dt>Role</dt><dd>${esc(p.role)} (${esc(AUTHOR_SHORT_NAME)})</dd>
    <dt>Category</dt><dd>${esc(p.category)}</dd>
    <dt>Platform</dt><dd>${esc(p.platform)}</dd>
    <dt>Status</dt><dd>${esc(p.status)}</dd>
    ${p.liveUrl ? `<dt>Live site</dt><dd><a href="${p.liveUrl}">${esc(p.liveUrl)}</a></dd>` : ""}
    ${p.repoUrl ? `<dt>Source</dt><dd><a href="${p.repoUrl}">${esc(p.repoUrl)}</a></dd>` : ""}
  </dl>
  <h2>Overview</h2>
  <p>${esc(p.content)}</p>
  <h2>The challenge</h2>
  <p>${esc(p.challenge)}</p>
  <h2>The approach</h2>
  <p>${esc(p.approach)}</p>
  <h2>Key features</h2>
  <ul>${li(p.features.map((f) => `<strong>${esc(f.title)}.</strong> ${esc(f.body)}`))}</ul>
  <h2>Tech stack</h2>
  <ul>${li(p.stack.map((g) => `${esc(g.group)}: ${esc(g.items.join(", "))}`))}</ul>
  <h2>Outcome</h2>
  <p>${esc(p.outcome)}</p>
  <ul>${li(p.facts.map((f) => `${esc(f.label)}: ${esc(f.value)}`))}</ul>
  <h2>What the demo shows</h2>
  <ol>${li(p.demoSteps.map(esc))}</ol>
</main>`;

/* ---------- Routes ---------- */

const pages = [
  {
    route: "/",
    title: seo.PAGE_SEO.home.title,
    description: seo.PAGE_SEO.home.description,
    type: "website",
    image: seo.PAGE_SEO.home.image,
    imageAlt: seo.PAGE_SEO.home.imageAlt,
    keywords: seo.DEFAULT_KEYWORDS,
    jsonLd: [seo.websiteJsonLd, seo.personJsonLd],
    body: homeBody(),
  },
  {
    route: "/about",
    title: seo.PAGE_SEO.about.title,
    description: seo.PAGE_SEO.about.description,
    type: "profile",
    image: seo.PAGE_SEO.about.image,
    imageAlt: seo.PAGE_SEO.about.imageAlt,
    keywords: seo.DEFAULT_KEYWORDS,
    jsonLd: seo.aboutJsonLd,
    body: aboutBody(),
  },
  {
    route: "/works",
    title: seo.PAGE_SEO.works.title,
    description: seo.PAGE_SEO.works.description,
    type: "website",
    image: seo.PAGE_SEO.works.image,
    imageAlt: seo.PAGE_SEO.works.imageAlt,
    keywords: seo.DEFAULT_KEYWORDS,
    jsonLd: seo.worksJsonLd,
    body: worksBody(),
  },
  ...WorkDetailList.map((p) => {
    const s = seo.getProjectSeo(p.url);
    return {
      route: s.path,
      title: s.title,
      description: s.description,
      type: "article",
      image: s.image,
      imageAlt: s.imageAlt,
      section: s.section,
      keywords: s.keywords,
      jsonLd: seo.getProjectJsonLd(p.url),
      body: projectBody(p),
    };
  }),
];

pages.forEach((page) => {
  if (!fs.existsSync(path.join(buildDir, page.image))) {
    throw new Error(`Share image missing for ${page.route}: public${page.image} (see scripts/share-cards/README.md)`);
  }
});

/* ---------- HTML for each route ---------- */

const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

// Tags the page-specific block replaces (Helmet takes them over at runtime
// through the data-react-helmet attribute, so nothing is duplicated).
const stripHead = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+(?:name|property)="(?:description|keywords|robots|author|image|og:[^"]+|twitter:[^"]+|article:[^"]+|profile:[^"]+)"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "");

const headFor = (page) => {
  const url = abs(page.route);
  const image = abs(page.image);
  const h = 'data-react-helmet="true"';
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta ${h} name="description" content="${esc(page.description)}"/>`,
    `<meta ${h} name="keywords" content="${esc(page.keywords)}"/>`,
    `<meta ${h} name="author" content="${esc(AUTHOR_NAME)}"/>`,
    `<meta ${h} name="robots" content="${ROBOTS}"/>`,
    `<link ${h} rel="canonical" href="${url}"/>`,
    `<meta ${h} property="og:site_name" content="${esc(SITE_NAME)}"/>`,
    `<meta ${h} property="og:locale" content="en_US"/>`,
    `<meta ${h} property="og:type" content="${page.type}"/>`,
    `<meta ${h} property="og:title" content="${esc(page.title)}"/>`,
    `<meta ${h} property="og:description" content="${esc(page.description)}"/>`,
    `<meta ${h} property="og:url" content="${url}"/>`,
    `<meta ${h} name="image" property="og:image" content="${image}"/>`,
    `<meta ${h} property="og:image:secure_url" content="${image}"/>`,
    `<meta ${h} property="og:image:type" content="image/jpeg"/>`,
    `<meta ${h} property="og:image:width" content="1200"/>`,
    `<meta ${h} property="og:image:height" content="630"/>`,
    `<meta ${h} property="og:image:alt" content="${esc(page.imageAlt)}"/>`,
    ...(page.type === "article"
      ? [
          `<meta ${h} property="article:author" content="${SITE_URL}/about"/>`,
          `<meta ${h} property="article:section" content="${esc(page.section)}"/>`,
        ]
      : []),
    ...(page.type === "profile"
      ? [
          `<meta ${h} property="profile:first_name" content="Binh"/>`,
          `<meta ${h} property="profile:last_name" content="Nguyen"/>`,
        ]
      : []),
    `<meta ${h} name="twitter:card" content="summary_large_image"/>`,
    `<meta ${h} name="twitter:title" content="${esc(page.title)}"/>`,
    `<meta ${h} name="twitter:description" content="${esc(page.description)}"/>`,
    `<meta ${h} name="twitter:image" content="${image}"/>`,
    `<meta ${h} name="twitter:image:alt" content="${esc(page.imageAlt)}"/>`,
    `<script ${h} type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>`,
    // Plain styling for the pre-JavaScript content, so it reads as a simple
    // version of the page rather than unstyled text while the app loads.
    `<style>#static-content{font-family:Nunito,system-ui,sans-serif;color:#1a1a1a;line-height:1.6;max-width:820px;margin:0 auto;padding:32px 8%}#static-content h1{font-size:2.25rem;line-height:1.1;font-weight:800;margin:.6em 0 .4em}#static-content h2{font-size:1.4rem;font-weight:800;margin:1.6em 0 .4em}#static-content h3{font-size:1.1rem;font-weight:800;margin:1em 0 .2em}#static-content a{color:#b23d43}#static-content ul,#static-content ol{padding-left:1.2em}#static-content li{margin:.3em 0}#static-content dt{font-weight:700;margin-top:.6em}</style>`,
  ].join("");
};

const htmlFor = (page) => {
  let html = stripHead(template).replace("</head>", `${headFor(page)}</head>`);
  const staticContent = `<div id="static-content">${nav}${page.body}${contact}</div>`;
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${staticContent}</div>`);
  // The content itself is now in the HTML, so the "enable JavaScript" notice goes.
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, "");
  return html.replace(/\n\s*\n/g, "\n");
};

// Sub-routes first: "/" overwrites build/index.html, which is the template.
const ordered = [...pages.filter((p) => p.route !== "/"), ...pages.filter((p) => p.route === "/")];
ordered.forEach((page) => {
  const dir = page.route === "/" ? buildDir : path.join(buildDir, page.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), htmlFor(page));
});

// Unknown URLs are rewritten (vercel.json) to this neutral shell: no page
// content, noindex, and it boots the app, which shows its 404 page.
const shell = stripHead(template)
  .replace(
    "</head>",
    `<title>${esc(AUTHOR_SHORT_NAME)} | ${esc(JOB_TITLE)}</title><meta data-react-helmet="true" name="robots" content="noindex, follow"/></head>`
  )
  .replace(/<noscript>[\s\S]*?<\/noscript>/i, "");
fs.writeFileSync(path.join(buildDir, "200.html"), shell);

/* ---------- sitemap.xml and robots.txt ---------- */

const lastmod = new Date().toISOString().split("T")[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map((page) => {
    const priority = page.route === "/" ? "1.0" : page.route.split("/").length === 2 ? "0.8" : "0.7";
    return `  <url>
    <loc>${abs(page.route)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <image:image><image:loc>${abs(page.image)}</image:loc></image:image>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);

// Search and AI crawlers are all welcome: the site exists to be found.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];
const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# AI search and assistant crawlers are explicitly allowed
${aiBots.map((bot) => `User-agent: ${bot}`).join("\n")}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
# Markdown summary for language models: ${SITE_URL}/llms.txt
`;
fs.writeFileSync(path.join(buildDir, "robots.txt"), robots);

/* ---------- llms.txt and llms-full.txt ---------- */

const projectLine = (p) =>
  `- [${p.title}](${abs(`/works/${p.url}`)}): ${p.category}. ${p.tagline} Role: ${p.role}.${
    p.liveUrl ? ` Live: ${p.liveUrl}` : ""
  }`;

const llms = `# ${AUTHOR_SHORT_NAME} (${AUTHOR_NAME})

> ${seo.PROFILE_SUMMARY}

This is the personal portfolio of ${AUTHOR_SHORT_NAME}. The pages below are the canonical source for his background and project work.

## Key facts

${seo.PROFILE_FACTS.map((f) => `- ${f}`).join("\n")}

## Pages

- [Home](${abs("/")}): introduction and selected projects
- [About](${abs("/about")}): experience, toolkit, and education
- [Projects](${abs("/works")}): all case studies
- [Resume (PDF)](${SITE_URL}/CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Engineer.pdf)

## Projects

${WorkDetailList.map(projectLine).join("\n")}

## Contact

- Email: ${SOCIAL_LINKS.email}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- GitHub: ${SOCIAL_LINKS.github}

## Optional

- [Full text of this site in one file](${SITE_URL}/llms-full.txt)
`;
fs.writeFileSync(path.join(buildDir, "llms.txt"), llms);

const llmsFull = `# ${AUTHOR_SHORT_NAME} (${AUTHOR_NAME}): full site content

> ${seo.PROFILE_SUMMARY}

Source: ${SITE_URL} · Last updated: ${lastmod}

## Key facts

${seo.PROFILE_FACTS.map((f) => `- ${f}`).join("\n")}

## Experience

${ExperienceList.map(
  (job) =>
    `### ${job.role} at ${job.company} (${job.start} – ${job.end})

${job.kind}${job.note ? `. ${job.note}` : ""}. Website: ${job.site}
${job.summary ? `\n${job.summary}\n` : ""}
${job.highlights.map((h) => `- ${h}`).join("\n")}`
).join("\n\n")}

## Toolkit

${SkillCategories.map((s) => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

## Education

${EducationList.map((e) => `- ${e.school} (${e.years}): ${e.program}. Classification: ${e.grade}.`).join("\n")}

## Projects

${WorkDetailList.map(
  (p) => `### ${p.title}

- URL: ${abs(`/works/${p.url}`)}
- Category: ${p.category}
- Role: ${p.role}
- Platform: ${p.platform}
- Status: ${p.status}${p.liveUrl ? `\n- Live site: ${p.liveUrl}` : ""}
- Stack: ${p.techStack.join(", ")}

${p.tagline}

${p.content}

**Challenge.** ${p.challenge}

**Approach.** ${p.approach}

**Key features**

${p.features.map((f) => `- ${f.title}: ${f.body}`).join("\n")}

**Outcome.** ${p.outcome}`
).join("\n\n")}

## Contact

- Email: ${SOCIAL_LINKS.email}
- Phone: +84 39 766 56 60
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- GitHub: ${SOCIAL_LINKS.github}
`;
fs.writeFileSync(path.join(buildDir, "llms-full.txt"), llmsFull);

console.log(
  `Prerendered ${pages.length} pages, sitemap.xml, robots.txt, llms.txt and llms-full.txt for ${SITE_URL}`
);
