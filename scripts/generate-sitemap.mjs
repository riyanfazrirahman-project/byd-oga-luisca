import { writeFile } from "node:fs/promises";
import { loadSiteConfig } from "./site-config.mjs";

const SITE = await loadSiteConfig();
const baseUrl = SITE.meta.url;

if (!/^https:\/\/[^/]+/.test(baseUrl) || /^\[[^\]]+\]$/.test(baseUrl)) {
  throw new Error("Isi SITE.meta.url dengan URL HTTPS situs sebelum membuat sitemap.");
}

const urls = [
  SITE.routes.home,
  SITE.routes.models,
  SITE.routes.simulation,
  SITE.routes.contact,
  ...SITE.models.map((model) => `${SITE.routes.models}/${encodeURIComponent(model.slug)}`),
];
const entries = urls
  .map((route) => `  <url><loc>${new URL(route, baseUrl).href}</loc></url>`)
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Sitemap dibuat untuk ${urls.length} URL.`);
