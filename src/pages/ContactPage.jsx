import { useState } from "react";
import {
  Camera,
  Check,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Phone,
  Pin,
  Send,
  UserRound,
} from "lucide-react";
import Seo from "@/components/seo/Seo";
import Testimonials from "@/components/seller/Testimonials";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import { asset } from "@/lib/paths";
import { isPlaceholder } from "@/lib/format";

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  if (!value || isPlaceholder(value)) return null;

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Gagal menyalin ke clipboard.", error);
    }
  }

  return (
    <button
      className="copy-button"
      type="button"
      onClick={copyValue}
      aria-label={copied ? `${label} disalin` : `Salin ${label}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

export default function ContactPage() {
  const { contact } = SITE.seller;
  const [photoFailed, setPhotoFailed] = useState(false);
  const hasPhoto = SITE.seller.photo && !photoFailed;
  const bio = SITE.seller.bio.filter((item) => item && !isPlaceholder(item));
  const phoneReady = !isPlaceholder(contact.phone);
  const emailReady = !isPlaceholder(contact.email);
  const validMap = /^https:\/\/(www\.)?google\.com\/maps\/embed/.test(
    contact.mapsEmbedUrl,
  );

  function socialClick(platform) {
    trackEvent("click_social", { platform, page: "contact" });
  }

  return (
    <>
      <Seo
        title={`Hubungi ${SITE.seller.name}`}
        description={`Kenali ${SITE.seller.name}, ${SITE.seller.role}, dan hubungi untuk konsultasi BYD.`}
      />
      <section className="contact-hero">
        <div className="container contact-hero-layout">
          <div className="contact-portrait">
            {hasPhoto ? (
              <img
                src={asset("seller", SITE.seller.photo)}
                alt={`Foto ${SITE.seller.name}`}
                width="600"
                height="750"
                fetchPriority="high"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="contact-avatar">
                <UserRound size={64} strokeWidth={1.1} />
                <span>OL</span>
              </div>
            )}
            <span className="portrait-status">
              <span />
              Siap membantu Anda
            </span>
          </div>
          <div className="contact-intro">
            <span className="eyebrow">Kenalan dengan konsultan Anda</span>
            <h1>{SITE.seller.name}</h1>
            <p className="contact-role">
              {SITE.seller.role}
              {!isPlaceholder(SITE.seller.dealer) && (
                <>
                  {" "}
                  <span>·</span> {SITE.seller.dealer}
                </>
              )}
            </p>
            {!isPlaceholder(SITE.seller.area) && (
              <p className="contact-area">
                <MapPin size={17} />
                {SITE.seller.area}
              </p>
            )}
            <p className="contact-bio-lead">
              {bio[0] || "Informasi profil Oga akan segera dilengkapi."}
            </p>
            <div className="contact-hero-actions">
              <WhatsAppButton source="contact-hero" />
              {phoneReady && (
                <a
                  className="button button-outline"
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  onClick={() => trackEvent("click_phone", { page: "contact" })}
                >
                  <Phone size={17} />
                  Telepon
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {bio.length > 0 && (
        <section className="section contact-story">
          <div className="container story-layout">
            <div>
              <span className="eyebrow">Cerita Oga</span>
              <h2>Menemani Anda memilih dengan lebih yakin.</h2>
            </div>
            <div className="story-copy">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {SITE.seller.highlights.length > 0 && (
        <section className="section contact-highlights">
          <div className="container highlights-grid">
            {SITE.seller.highlights.map((item) => (
              <div className="highlight-item" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {SITE.seller.services.length > 0 && (
        <section className="section service-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Dukungan untuk Anda</span>
                <h2>Layanan yang bisa dibicarakan</h2>
              </div>
            </div>
            <div className="service-grid">
              {SITE.seller.services.map((service, index) => (
                <article className="service-card" key={service}>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service}</h3>
                  <p>
                    Diskusikan kebutuhan dan langkah berikutnya langsung dengan
                    Oga.
                  </p>
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
              <div>
                <span className="eyebrow">Cerita pelanggan</span>
                <h2>Pengalaman bersama Oga</h2>
              </div>
            </div>
            <Testimonials items={SITE.seller.testimonials} />
          </div>
        </section>
      )}

      <section className="section contact-details-section">
        <div className="container contact-details-layout">
          <div className="contact-details-card">
            <span className="eyebrow">Terhubung langsung</span>
            <h2>Kontak Oga</h2>
            <div className="contact-list">
              <div className="contact-row">
                <span className="contact-icon">
                  <Send size={18} />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <strong>
                    {isPlaceholder(contact.whatsapp)
                      ? "Belum diatur"
                      : contact.whatsapp}
                  </strong>
                </div>
                <WhatsAppButton source="contact-details" iconOnly />
              </div>
              {phoneReady && (
                <div className="contact-row">
                  <span className="contact-icon">
                    <Phone size={18} />
                  </span>
                  <div>
                    <small>Telepon</small>
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      onClick={() =>
                        trackEvent("click_phone", { page: "contact" })
                      }
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <CopyButton value={contact.phone} label="nomor telepon" />
                </div>
              )}
              {emailReady && (
                <div className="contact-row">
                  <span className="contact-icon">
                    <Mail size={18} />
                  </span>
                  <div>
                    <small>Email</small>
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={() =>
                        trackEvent("click_email", { page: "contact" })
                      }
                    >
                      {contact.email}
                    </a>
                  </div>
                  <CopyButton value={contact.email} label="alamat email" />
                </div>
              )}
              {!isPlaceholder(contact.instagram) && (
                <a
                  className="contact-row contact-row-link"
                  href={`https://instagram.com/${contact.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => socialClick("instagram")}
                >
                  <span className="contact-icon">
                    <Camera size={18} />
                  </span>
                  <div>
                    <small>Instagram</small>
                    <strong>{contact.instagram}</strong>
                  </div>
                  <span className="contact-chevron">↗</span>
                </a>
              )}
              {!isPlaceholder(contact.tiktok) && (
                <a
                  className="contact-row contact-row-link"
                  href={`https://tiktok.com/@${contact.tiktok.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => socialClick("tiktok")}
                >
                  <span className="contact-icon">
                    <span className="tiktok-glyph">♪</span>
                  </span>
                  <div>
                    <small>TikTok</small>
                    <strong>{contact.tiktok}</strong>
                  </div>
                  <span className="contact-chevron">↗</span>
                </a>
              )}
            </div>
            {!isPlaceholder(contact.hours) && (
              <p className="hours-note">
                <Clock3 size={17} />
                {contact.hours}
              </p>
            )}
          </div>
          <div className="location-card">
            <span className="eyebrow">Lokasi & jam layanan</span>
            <h2>Temui Oga</h2>
            {!isPlaceholder(contact.address) && (
              <p className="address-line">
                <MapPin size={18} />
                {contact.address}
              </p>
            )}
            {validMap ? (
              <iframe
                title="Lokasi dealer"
                src={contact.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-placeholder">
                <Pin size={28} />
                <span>
                  {isPlaceholder(contact.address)
                    ? "Peta lokasi akan ditampilkan setelah alamat tersedia."
                    : contact.address}
                </span>
                {!isPlaceholder(contact.address) && (
                  <a
                    className="button button-outline"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buka di Peta
                  </a>
                )}
              </div>
            )}
            {!isPlaceholder(contact.hours) && (
              <p className="hours-note">
                <Clock3 size={17} />
                {contact.hours}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section closing-section">
        <div className="container closing-card">
          <div className="closing-mark" aria-hidden="true">
            O
          </div>
          <div>
            <span className="eyebrow">
              Langkah pertama cukup dengan bertanya
            </span>
            <h2>Mulai percakapan bersama Oga.</h2>
            <p>Tidak perlu terburu-buru mengambil keputusan.</p>
          </div>
          <WhatsAppButton source="contact-closing" />
        </div>
      </section>
    </>
  );
}
