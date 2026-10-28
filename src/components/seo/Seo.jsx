import { SITE } from "@/data/site.config";
import { isPlaceholder } from "@/lib/format";
import { asset } from "@/lib/paths";

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function Seo({ title, description, image, model }) {
  const pageTitle = title
    ? `${title} | ${SITE.seller.name}`
    : `${SITE.seller.name} — ${SITE.seller.role}`;
  const pageDescription =
    description ||
    (isPlaceholder(SITE.meta.tagline) ? null : SITE.meta.tagline);
  const { contact } = SITE.seller;
  const sameAs = [
    !isPlaceholder(contact.instagram) &&
      `https://instagram.com/${contact.instagram.replace(/^@/, "")}`,
    !isPlaceholder(contact.tiktok) &&
      `https://tiktok.com/@${contact.tiktok.replace(/^@/, "")}`,
  ].filter(Boolean);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.seller.name,
    jobTitle: SITE.seller.role,
    ...(pageDescription ? { description: pageDescription } : {}),
    ...(/^https:\/\/[^/]+/.test(SITE.meta.url) && !isPlaceholder(SITE.meta.url)
      ? { url: SITE.meta.url }
      : {}),
    ...(!isPlaceholder(contact.phone) ? { telephone: contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  const productSchema = model
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: model.name,
        description: model.tagline,
        category: model.type,
        brand: { "@type": "Brand", name: "BYD" },
        ...(model.priceFrom > 0
          ? {
              offers: {
                "@type": "Offer",
                price: model.priceFrom,
                priceCurrency: "IDR",
              },
            }
          : {}),
      }
    : null;

  return (
    <>
      <title>{pageTitle}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
      <meta property="og:title" content={pageTitle} />
      {pageDescription && (
        <meta property="og:description" content={pageDescription} />
      )}
      <meta property="og:image" content={image || asset("base", "byd-com-brandmark.svg")} />
      <script type="application/ld+json">
        {serializeJsonLd(personSchema)}
      </script>
      {productSchema && (
        <script type="application/ld+json">
          {serializeJsonLd(productSchema)}
        </script>
      )}
    </>
  );
}
