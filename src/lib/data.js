import { SITE } from "@/data/site.config";

export function getModel(slug) {
  return SITE.models.find((model) => model.slug === slug);
}

export function sortModels(models, sort = "recommended") {
  return [...models].sort((a, b) => {
    if (a.status === "sold-out" && b.status !== "sold-out") return 1;
    if (b.status === "sold-out" && a.status !== "sold-out") return -1;
    if (sort === "price-asc") return a.priceFrom - b.priceFrom;
    if (sort === "price-desc") return b.priceFrom - a.priceFrom;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.priceFrom - b.priceFrom || a.name.localeCompare(b.name);
  });
}
