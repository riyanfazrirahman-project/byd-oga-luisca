import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  MapPin,
  Maximize2,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { useModel } from "@/hooks/use-model";
import Seo from "@/components/seo/Seo";
import SpecTable from "@/components/model/SpecTable";
import ModelCard from "@/components/model/ModelCard";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import NotFoundPage from "@/pages/NotFoundPage";
import { SITE } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import { formatDate, formatRupiah } from "@/lib/format";
import { asset, modelAsset, routePath } from "@/lib/paths";

export default function ModelDetailPage() {
  const model = useModel();
  const [variantId, setVariantId] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [imageFailed, setImageFailed] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewCloseRef = useRef(null);
  const previewTriggerRef = useRef(null);
  const selectedVariant =
    model?.variants.find((variant) => variant.id === variantId) ??
    model?.variants[0];
  const images = useMemo(() => {
    if (!model) return [];
    const colorImages = (model.images.colors || [])
      .map((color) => color.image)
      .filter(Boolean);
    return [
      ...new Set(
        [
          model.images.hero,
          ...(model.images.gallery || []),
          ...colorImages,
        ].filter(Boolean),
      ),
    ];
  }, [model]);

  useEffect(() => {
    if (!model) return;
    trackEvent("view_model", { model: model.slug });
    setVariantId(model.variants[0]?.id ?? "");
    setImageIndex(0);
    setImageFailed(false);
  }, [model]);

  useEffect(() => {
    if (!previewOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previewCloseRef.current?.focus();

    function handlePreviewKeyDown(event) {
      if (event.key === "Escape") setPreviewOpen(false);
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setImageFailed(false);
        setImageIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setImageFailed(false);
        setImageIndex((current) => (current + 1) % images.length);
      }
    }

    window.addEventListener("keydown", handlePreviewKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handlePreviewKeyDown);
      if (previewTriggerRef.current?.isConnected) previewTriggerRef.current.focus();
    };
  }, [images.length, previewOpen]);

  if (!model) return <NotFoundPage />;

  const activeImage = images[imageIndex];
  const otherModels = SITE.models
    .filter(
      (item) =>
        item.slug !== model.slug && (item.type === model.type || item.featured),
    )
    .slice(0, 3);

  function selectColor(image) {
    const index = images.indexOf(image);
    if (index >= 0) {
      setImageFailed(false);
      setImageIndex(index);
      setActiveTab("gallery");
    }
  }

  function changeImage(direction) {
    if (!images.length) return;
    setImageFailed(false);
    setImageIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  }

  return (
    <>
      <Seo
        title={model.seo?.title || model.name}
        description={model.seo?.description || model.tagline}
        image={modelAsset(model, model.images.hero)}
        model={model}
      />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to={routePath("home")}>Beranda</Link>
          <span>/</span>
          <Link to={routePath("models")}>Model</Link>
          <span>/</span>
          <span aria-current="page">{model.name}</span>
        </nav>
        <section className="detail-layout">
          <div className="detail-gallery-column">
            <div className="detail-gallery">
              {activeImage && !imageFailed ? (
                <button
                  type="button"
                  className="detail-gallery-preview"
                  onClick={(event) => {
                    previewTriggerRef.current = event.currentTarget;
                    setPreviewOpen(true);
                  }}
                  aria-label={`Perbesar gambar ${imageIndex + 1} ${model.name}`}
                >
                  <img
                    src={modelAsset(model, activeImage)}
                    alt={`${model.name} — gambar ${imageIndex + 1}`}
                    width="1200"
                    height="750"
                    fetchPriority="high"
                    onError={() => setImageFailed(true)}
                  />
                  <span className="gallery-zoom-hint"><Maximize2 size={16} /> Perbesar</span>
                </button>
              ) : (
                <div className="gallery-placeholder">
                  <CarFront size={66} strokeWidth={1.1} />
                  <span>Gambar model belum tersedia</span>
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    className="gallery-arrow gallery-prev"
                    onClick={() => changeImage(-1)}
                    aria-label="Gambar sebelumnya"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className="gallery-arrow gallery-next"
                    onClick={() => changeImage(1)}
                    aria-label="Gambar berikutnya"
                  >
                    <ChevronRight />
                  </button>
                  <span className="gallery-counter">
                    {imageIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbnails" aria-label="Pilih gambar">
                {images.map((image, index) => (
                  <button
                    key={image}
                    className={imageIndex === index ? "active" : ""}
                    onClick={() => {
                      setImageFailed(false);
                      setImageIndex(index);
                    }}
                    aria-label={`Tampilkan gambar ${index + 1}`}
                  >
                    <img
                      src={modelAsset(model, image)}
                      alt=""
                      loading="lazy"
                      width="120"
                      height="80"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-purchase">
            <div className="detail-title-row">
              <span className="badge badge-type">{model.type}</span>
              {model.status === "coming-soon" && (
                <span className="badge">Informasi menyusul</span>
              )}
              {model.status === "sold-out" && (
                <span className="badge">Stok habis</span>
              )}
            </div>
            <h1>{model.name}</h1>
            <p className="detail-tagline">{model.tagline}</p>
            <div className="detail-price">
              <span>
                {model.status === "coming-soon"
                  ? "Harga menyusul"
                  : selectedVariant
                    ? "Harga varian dipilih"
                    : "Harga mulai dari"}
              </span>
              {model.status !== "coming-soon" && (
                <strong>
                  {formatRupiah(selectedVariant?.price ?? model.priceFrom)}
                </strong>
              )}
              {model.promo?.until && (
                <small>Promo hingga {formatDate(model.promo.until)}</small>
              )}
            </div>
            {model.variants.length > 0 && (
              <fieldset className="variant-picker">
                <legend>Pilih varian</legend>
                {model.variants.map((variant) => (
                  <label
                    className={`variant-option${selectedVariant?.id === variant.id ? " selected" : ""}`}
                    key={variant.id}
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={variant.id}
                      checked={selectedVariant?.id === variant.id}
                      onChange={() => setVariantId(variant.id)}
                    />
                    <span>
                      <strong>{variant.name}</strong>
                      <small>{formatRupiah(variant.price)}</small>
                    </span>
                    {selectedVariant?.id === variant.id && <Check size={18} />}
                  </label>
                ))}
              </fieldset>
            )}
            {model.images.colors?.length > 0 && (
              <fieldset className="color-picker">
                <legend>Pilihan warna</legend>
                <div>
                  {model.images.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className="color-option"
                      onClick={() => selectColor(color.image)}
                      aria-label={`Pilih warna ${color.name}`}
                      title={color.name}
                    >
                      <span style={{ backgroundColor: color.hex }} />
                      <small>{color.name}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            <div className="purchase-actions">
              <WhatsAppButton
                model={model}
                variant={selectedVariant}
                source="model-detail-panel"
                disabled={model.status === "sold-out"}
              >
                {model.status === "coming-soon"
                  ? "Tanya info"
                  : "Minta penawaran"}
              </WhatsAppButton>
              {model.brochure && (
                <a
                  className="button button-outline"
                  href={asset("docs", model.brochure)}
                  download
                >
                  Unduh brosur
                </a>
              )}
            </div>
            <div className="oga-mini-card">
              <span className="mini-avatar">
                {SITE.seller.photo ? (
                  <img src={asset("seller", SITE.seller.photo)} alt="" />
                ) : (
                  <UserRound size={21} />
                )}
              </span>
              <div>
                <strong>Dilayani langsung oleh {SITE.seller.name}</strong>
                <small>
                  <MapPin size={13} />
                  {SITE.seller.area}
                </small>
              </div>
              <Link to={routePath("contact")} aria-label="Lihat profil Oga">
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="detail-information section">
          <div
            className="detail-tabs"
            role="tablist"
            aria-label="Informasi model"
          >
            <button
              role="tab"
              aria-selected={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Ringkasan
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "specs"}
              onClick={() => setActiveTab("specs")}
            >
              Spesifikasi
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "gallery"}
              onClick={() => setActiveTab("gallery")}
            >
              Galeri
            </button>
          </div>
          {activeTab === "overview" && (
            <div className="detail-tab-content">
              <div>
                <span className="eyebrow">Mengenal {model.name}</span>
                <h2>Hal yang perlu Anda ketahui</h2>
                <p>{model.tagline}</p>
              </div>
              {model.highlights?.length > 0 ? (
                <ul className="highlight-list">
                  {model.highlights.map((item) => (
                    <li key={item}>
                      <Check size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-note">
                  <CircleHelp size={17} />
                  Informasi keunggulan belum ditambahkan.
                </p>
              )}
            </div>
          )}
          {activeTab === "specs" && (
            <div className="detail-tab-content">
              <h2>Spesifikasi per varian</h2>
              <SpecTable variants={model.variants} />
            </div>
          )}
          {activeTab === "gallery" && (
            <div className="detail-tab-content">
              <h2>Galeri {model.name}</h2>
              {images.length ? (
                <div className="gallery-grid">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={(event) => {
                        setImageIndex(index);
                        setImageFailed(false);
                        previewTriggerRef.current = event.currentTarget;
                        setPreviewOpen(true);
                      }}
                      aria-label={`Perbesar gambar ${index + 1} ${model.name}`}
                    >
                      <img
                        src={modelAsset(model, image)}
                        alt={`${model.name} — gambar ${index + 1}`}
                        loading="lazy"
                        width="600"
                        height="375"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="empty-note">Galeri foto belum tersedia.</p>
              )}
            </div>
          )}
        </section>
      </div>

      {otherModels.length > 0 && (
        <section className="section related-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Pilihan lainnya</span>
                <h2>Model yang mungkin cocok</h2>
              </div>
              <Link className="text-link" to={routePath("models")}>
                Semua model <ArrowRight size={17} />
              </Link>
            </div>
            <div className="model-grid">
              {otherModels.map((item) => (
                <ModelCard key={item.slug} model={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {previewOpen && activeImage && (
        <div
          className="image-preview-overlay"
          role="presentation"
          onClick={() => setPreviewOpen(false)}
        >
          <section
            className="image-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Pratinjau gambar ${model.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={previewCloseRef}
              type="button"
              className="image-preview-close"
              onClick={() => setPreviewOpen(false)}
              aria-label="Tutup pratinjau"
            >
              <X />
            </button>
            {images.length > 1 && (
              <button
                type="button"
                className="image-preview-arrow image-preview-prev"
                onClick={() => changeImage(-1)}
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft />
              </button>
            )}
            <img
              className="image-preview-full"
              src={modelAsset(model, activeImage)}
              alt={`${model.name} — gambar ${imageIndex + 1}`}
            />
            {images.length > 1 && (
              <button
                type="button"
                className="image-preview-arrow image-preview-next"
                onClick={() => changeImage(1)}
                aria-label="Gambar berikutnya"
              >
                <ChevronRight />
              </button>
            )}
            <span className="image-preview-caption">
              {model.name} · {imageIndex + 1} / {images.length}
            </span>
          </section>
        </div>
      )}

      <div className="detail-bottom-bar">
        <div>
          <small>
            {model.status === "coming-soon" ? "Harga" : "Harga mulai dari"}
          </small>
          <strong>
            {model.status === "coming-soon"
              ? "Harga menyusul"
              : formatRupiah(selectedVariant?.price || model.priceFrom)}
          </strong>
        </div>
        <WhatsAppButton
          model={model}
          variant={selectedVariant}
          source="model-detail-sticky"
          disabled={model.status === "sold-out"}
        />
      </div>
    </>
  );
}
