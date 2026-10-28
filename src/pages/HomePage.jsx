import { useState } from "react";
import { ArrowDownRight, ArrowRight, BadgeCheck, CarFront, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Seo from "@/components/seo/Seo";
import ModelCard from "@/components/model/ModelCard";
import Testimonials from "@/components/seller/Testimonials";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE } from "@/data/site.config";
import { asset, modelAsset, routePath } from "@/lib/paths";
import { sortModels } from "@/lib/data";
import { isPlaceholder } from "@/lib/format";

export default function HomePage() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const featuredModels = sortModels(SITE.models.filter((model) => model.featured)).slice(0, 3);
  const intro = SITE.seller.bio.find((line) => line && !/^\[[^\]]+\]$/.test(line));
  const hasPhoto = SITE.seller.photo && !photoFailed;

  return (
    <>
      <Seo />
      <section className="home-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />Pendamping mobil listrik Anda</div>
            <h1>Kenali pilihan BYD,<br /><span>lebih dekat dengan Oga.</span></h1>
            {!isPlaceholder(SITE.meta.tagline) && <p className="hero-lead">{SITE.meta.tagline}</p>}
            <p className="hero-description">{intro || "Temukan informasi model dan konsultasikan kebutuhan Anda langsung bersama Oga."}</p>
            <div className="hero-actions">
              <WhatsAppButton source="home-hero" className="button-large" />
              <Link className="button button-outline button-large" to={routePath("models")}>
                Lihat model <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-trust">
              <span><BadgeCheck size={17} /> Konsultasi langsung</span>
              {!isPlaceholder(SITE.seller.area) && <span><MapPin size={17} /> {SITE.seller.area}</span>}
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="hero-portrait">
              {hasPhoto ? (
                <img
                  src={asset("seller", SITE.seller.photo)}
                  alt={`Foto ${SITE.seller.name}`}
                  width="640"
                  height="800"
                  fetchPriority="high"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="portrait-placeholder" aria-label={`Foto ${SITE.seller.name} belum tersedia`}>
                  <span>OL</span>
                  <small>Foto profil</small>
                </div>
              )}
            </div>
            <div className="portrait-note">
              <span className="note-icon"><Sparkles size={18} /></span>
              <span><strong>{SITE.seller.name}</strong><small>{SITE.seller.role}</small></span>
            </div>
            <div className="portrait-scroll" aria-hidden="true"><ArrowDownRight size={19} /></div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>Kenali layanan personal dari awal hingga serah terima</span>
          <span className="hero-scroll-label">Gulir untuk menjelajah <ArrowDownRight size={16} /></span>
        </div>
      </section>

      {SITE.seller.highlights.length > 0 && (
        <section className="section highlights-section">
          <div className="container highlights-grid">
            {SITE.seller.highlights.map((item) => (
              <div className="highlight-item" key={item.label}>
                <strong>{item.value}</strong><span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section models-section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Pilihan untuk Anda</span><h2>Jelajahi model BYD</h2></div>
            <Link to={routePath("models")} className="text-link">Semua model <ArrowRight size={17} /></Link>
          </div>
          {featuredModels.length ? (
            <div className="model-grid">
              {featuredModels.map((model) => <ModelCard key={model.slug} model={model} />)}
            </div>
          ) : (
            <div className="empty-panel">
              <div className="empty-icon"><CarFront size={28} /></div>
              <div><h3>Katalog sedang disiapkan</h3><p>Informasi model akan ditambahkan setelah data resmi tersedia.</p></div>
              <Link className="button button-outline" to={routePath("models")}>Lihat katalog <ArrowRight size={17} /></Link>
            </div>
          )}

          {SITE.models.length > 0 && (
            <div className="model-marquee" aria-label="Model BYD pilihan">
              <div className="model-marquee-track">
                <div className="model-marquee-group">
                  {SITE.models.map((model) => (
                    <Link
                      className="model-marquee-card"
                      key={model.slug}
                      to={routePath("model", { slug: model.slug })}
                      aria-label={`Lihat ${model.name}`}
                    >
                      <img src={modelAsset(model, model.images.card)} alt="" loading="lazy" />
                      <span>{model.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="model-marquee-group" aria-hidden="true">
                  {SITE.models.map((model) => (
                    <div className="model-marquee-card" key={model.slug}>
                      <img src={modelAsset(model, model.images.card)} alt="" loading="lazy" />
                      <span>{model.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="dealer-lockup" aria-label="BYD Arista">
            <img src={asset("base", SITE.brandAssets.bydLogo)} alt="BYD" loading="lazy" />
            <span className="dealer-lockup-divider" aria-hidden="true" />
            <img src={asset("base", SITE.brandAssets.aristaLogo)} alt="Arista" loading="lazy" />
          </div>

          <section className="home-faq" aria-labelledby="home-faq-title">
            <div className="home-faq-heading">
              <span className="eyebrow">Info sebelum memilih</span>
              <h3 id="home-faq-title">{SITE.homeFaqs.title}</h3>
            </div>
            <div className="home-faq-list">
              {SITE.homeFaqs.items.map((item) => (
                <details className="home-faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>

      {SITE.seller.services.length > 0 && (
        <section className="section service-section">
          <div className="container">
            <div className="section-heading section-heading-centered">
              <div><span className="eyebrow">Dari konsultasi sampai serah terima</span><h2>Didampingi dengan nyaman</h2></div>
              <p>Kenali dukungan yang bisa Anda dapatkan saat berdiskusi dengan Oga.</p>
            </div>
            <div className="service-grid">
              {SITE.seller.services.map((service, index) => (
                <article className="service-card" key={service}>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service}</h3>
                  <p>Informasi dan pendampingan sesuai kebutuhan Anda.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {SITE.seller.testimonials.length > 0 && (
        <section className="section testimonial-section">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">Cerita pelanggan</span><h2>Pengalaman bersama Oga</h2></div>
            </div>
            <Testimonials items={SITE.seller.testimonials} />
          </div>
        </section>
      )}

      <section className="section closing-section">
        <div className="container closing-card">
          <div className="closing-mark" aria-hidden="true">O</div>
          <div><span className="eyebrow">Bicara langsung, tanpa terburu-buru</span><h2>Masih mencari jawaban?</h2><p>Oga siap membantu Anda memahami pilihan yang tersedia.</p></div>
          <WhatsAppButton source="home-closing" />
        </div>
      </section>
    </>
  );
}
