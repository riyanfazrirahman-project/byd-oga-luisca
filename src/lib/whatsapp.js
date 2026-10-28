import { SITE } from "@/data/site.config";
import { isPlaceholder } from "@/lib/format";

export function waLink(model, variant, extraMessage = "") {
  const number = SITE.seller.contact.whatsapp?.replace(/\D/g, "");
  if (!number?.startsWith("62") || isPlaceholder(SITE.seller.contact.whatsapp)) return null;

  const text = `${SITE.cta.whatsappTemplate
    .replaceAll("{model}", model?.name ?? "mobil BYD")
    .replaceAll("{variant}", variant?.name ?? "")
    .replace(/\s+/g, " ")
    .trim()}${extraMessage ? ` ${extraMessage}` : ""}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
