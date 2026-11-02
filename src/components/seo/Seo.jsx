import { SITE } from "@/data/site.config";
import { isPlaceholder } from "@/lib/format";
import { asset } from "@/lib/paths";

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getSiteOrigin() {
  if (isPlaceholder(SITE.meta.url)) return null;

  try {
    const url = new URL(SITE.meta.url);
    return url.protocol === "https:" ? url.origin : null;
  } catch {
    return null;
  }
}

function absoluteUrl(path, origin) {
  if (!path || !origin) return path;
  return new URL(path, `${origin}/`).href;
}

export default function Seo({
  page = "home",
  title,
  description,
  image,
  imageAlt,
  model,
}) {
  const origin = getSiteOrigin();
  const pageConfig = SITE.meta.pages[page] || {};
  const modelTitle = model
    ? (model.seo?.title || pageConfig.titleTemplate)?.replaceAll(
        "{model}",
        model.name,
      )
    : null;
  const pageTitle = title || modelTitle || pageConfig.title || SITE.meta.title;
  const pageDescription =
    description ||
    (model
      ? (model.seo?.description || pageConfig.descriptionTemplate)?.replaceAll(
          "{model}",
          model.name,
        )
      : pageConfig.description) ||
    SITE.meta.description;
  const canonicalUrl =
    origin && typeof window !== "undefined"
      ? new URL(window.location.pathname, `${origin}/`).href
      : null;
  const socialImage = absoluteUrl(
    image || asset("seller", SITE.meta.socialImage),
    origin,
  );
  const socialImageAlt =
    imageAlt ||
    (model
      ? SITE.meta.modelImageAltTemplate.replaceAll("{model}", model.name)
      : SITE.meta.socialImageAlt);
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
    description: SITE.meta.description,
    ...(origin ? { url: `${origin}/` } : {}),
    ...(!isPlaceholder(SITE.seller.dealer)
      ? { worksFor: { "@type": "Organization", name: SITE.seller.dealer } }
      : {}),
    ...(!isPlaceholder(SITE.seller.area)
      ? { areaServed: { "@type": "City", name: SITE.seller.area } }
      : {}),
    ...(!isPlaceholder(contact.phone) ? { telephone: contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.meta.name,
    description: SITE.meta.description,
    inLanguage: SITE.meta.lang,
    ...(origin ? { url: `${origin}/` } : {}),
  };
  const productSchema = model
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: model.name,
        description: pageDescription,
        category: model.type,
        ...(image ? { image: socialImage } : {}),
        ...(canonicalUrl ? { url: canonicalUrl } : {}),
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
      <meta name="author" content={SITE.meta.name} />
      <meta name="keywords" content={SITE.meta.keywords} />
      <meta
        name="robots"
        content={page === "notFound" ? "noindex,follow" : "index,follow"}
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={SITE.meta.name} />
      {pageDescription && (
        <meta property="og:description" content={pageDescription} />
      )}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {pageDescription && (
        <meta name="twitter:description" content={pageDescription} />
      )}
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={socialImageAlt} />
      <script type="application/ld+json">
        {serializeJsonLd(websiteSchema)}
      </script>
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
