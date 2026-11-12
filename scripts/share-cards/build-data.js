/* Writes data.json for the share-card template from the app's own data. */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..", "..");
const cache = {};
const load = (file) => {
  if (cache[file]) return cache[file].exports;
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  });
  const mod = { exports: {} };
  cache[file] = mod;
  const localRequire = (id) => {
    if (id === "@/constants") return load(path.join(root, "src", "constants.ts"));
    // asset paths become URLs served from the repo root
    if (id.includes("assets/")) return id.replace(/^(\.\/|@\/)/, "/src/");
    return require(id);
  };
  // eslint-disable-next-line no-new-func
  new Function("require", "module", "exports", outputText)(localRequire, mod, mod.exports);
  return mod.exports;
};

const { WorkDetailList } = load(path.join(root, "src", "constants.ts"));
const { WIPES, TILE_LOGOS } = load(path.join(root, "src", "components", "projectBrand.ts"));

const cards = WorkDetailList.map((p, i) => ({
  slug: p.url,
  n: i + 1,
  title: p.title,
  category: p.category,
  tagline: p.tagline,
  role: p.role,
  ink: p.ink,
  wipe: WIPES[p.url],
  logo: TILE_LOGOS[p.url].src,
  scale: TILE_LOGOS[p.url].scale,
  poster: p.posterHiDpi,
}));

fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(cards, null, 1));
console.log(`Wrote ${cards.length} cards to scripts/share-cards/data.json`);
