import { readFile } from "node:fs/promises";

export async function loadSiteConfig() {
  const configPath = new URL("../src/data/site.config.js", import.meta.url);
  const source = (await readFile(configPath, "utf8")).replace(
    /import\.meta\.env\.BASE_URL/g,
    JSON.stringify("/"),
  );
  const encoded = Buffer.from(source).toString("base64");
  const { SITE } = await import(`data:text/javascript;base64,${encoded}`);
  return SITE;
}
