import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadSiteConfig } from "./site-config.mjs";

const SITE = await loadSiteConfig();
const root = fileURLToPath(new URL("../", import.meta.url));
const production = process.env.NODE_ENV === "production";
const errors = [];
const warnings = [];
const placeholderPattern = /^\[[^\]]+\]$/;
const types = new Set(["suv", "sedan", "hatchback", "mpv"]);
const statuses = new Set(["available", "coming-soon", "sold-out"]);
const slugs = new Set();

function requireValue(condition, message) {
  if (!condition) errors.push(message);
}

function checkPlaceholder(value, label) {
  if (typeof value === "string" && placeholderPattern.test(value.trim())) {
    (production ? errors : warnings).push(`${label} masih placeholder: ${value}`);
  }
}

function scanPlaceholders(value, label = "SITE") {
  if (typeof value === "string") {
    checkPlaceholder(value, label);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => scanPlaceholders(entry, `${label}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => scanPlaceholders(entry, `${label}.${key}`));
  }
}

scanPlaceholders(SITE);

const whatsapp = SITE.seller.contact.whatsapp;
if (!placeholderPattern.test(whatsapp)) {
  requireValue(/^\d+$/.test(whatsapp) && whatsapp.startsWith("62"), "Nomor WhatsApp harus digit dan diawali 62.");
} else if (production) {
  requireValue(false, "Nomor WhatsApp harus diisi sebelum build produksi.");
}
if (!SITE.models.length) warnings.push("SITE.models masih kosong; katalog dan simulasi belum memiliki data model.");
if (production && !SITE.models.length) errors.push("Tambahkan data model sebelum build produksi.");

for (const [index, model] of SITE.models.entries()) {
  const label = `SITE.models[${index}]`;
  requireValue(typeof model.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(model.slug), `${label}.slug tidak valid.`);
  requireValue(!slugs.has(model.slug), `Slug model duplikat: ${model.slug}`);
  slugs.add(model.slug);
  requireValue(model.images?.folder === model.slug, `${label}.images.folder harus sama dengan slug.`);
  requireValue(typeof model.images?.hero === "string" && Boolean(model.images.hero), `${label}.images.hero wajib diisi.`);
  requireValue(typeof model.images?.card === "string" && Boolean(model.images.card), `${label}.images.card wajib diisi.`);
  requireValue(types.has(model.type), `${label}.type tidak dikenali.`);
  requireValue(statuses.has(model.status), `${label}.status tidak dikenali.`);
  requireValue(Number.isFinite(model.priceFrom) && model.priceFrom >= 0, `${label}.priceFrom harus berupa angka.`);
  requireValue(Array.isArray(model.variants), `${label}.variants harus berupa array.`);
  if (model.status !== "coming-soon") {
    requireValue(model.variants.length > 0, `${label}.variants harus berisi minimal satu varian.`);
  }
  if (model.promo?.until) {
    requireValue(!Number.isNaN(Date.parse(model.promo.until)), `${label}.promo.until bukan tanggal yang valid.`);
  }

  const imageNames = [model.images?.hero, model.images?.card, ...(model.images?.gallery || []), ...(model.images?.colors || []).map((color) => color.image)].filter(Boolean);
  for (const imageName of imageNames) {
    const imagePath = path.join(root, "public", "assets", "img", "models", model.images.folder, imageName);
    try {
      await access(imagePath);
    } catch {
      errors.push(`File gambar tidak ditemukan: public/assets/img/models/${model.images.folder}/${imageName}`);
    }
  }

  for (const variant of model.variants || []) {
    requireValue(Number.isFinite(variant.price) && variant.price >= 0, `${label}.variants.${variant.id}.price harus berupa angka.`);
  }
  if (model.brochure) {
    try {
      await access(path.join(root, "public", "assets", "docs", model.brochure));
    } catch {
      errors.push(`Brosur tidak ditemukan: public/assets/docs/${model.brochure}`);
    }
  }
}

for (const item of SITE.nav) {
  requireValue(Boolean(SITE.routes[item.route]), `Rute navigasi tidak dikenal: ${item.route}`);
}

for (const warning of warnings) console.warn(`Peringatan: ${warning}`);
for (const error of errors) console.error(`Galat: ${error}`);
if (errors.length) process.exitCode = 1;
else console.log(`Konfigurasi valid (${SITE.models.length} model).`);
