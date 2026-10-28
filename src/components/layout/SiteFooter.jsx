import { Link } from "react-router";
import { Camera, Clock3, Mail, MapPin, Music2, Phone } from "lucide-react";
import { SITE } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import { isPlaceholder } from "@/lib/format";
import { asset, routePath } from "@/lib/paths";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function SiteFooter() {
  const { contact } = SITE.seller;
  const phoneReady = !isPlaceholder(contact.phone);
  const emailReady = !isPlaceholder(contact.email);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link
            className="wordmark footer-wordmark"
            to={routePath("home")}
            aria-label={`${SITE.seller.name}, beranda`}
          >
            <img
              className="wordmark-logo"
              src={asset("base", "byd-com-brandmark.svg")}
              alt="BYD"
              width="90"
              height="24"
            />
            <span>
              <strong>{SITE.seller.name}</strong>
              <small>{SITE.seller.role}</small>
            </span>
          </Link>
          {!isPlaceholder(SITE.seller.dealer) && <p>{SITE.seller.dealer}</p>}
          {!isPlaceholder(SITE.seller.area) && (
            <p className="footer-area">
              <MapPin size={15} aria-hidden="true" />
              {SITE.seller.area}
            </p>
          )}
        </div>

        <div className="footer-links">
          <h2 className="footer-heading">Jelajahi</h2>
          {SITE.nav.map((item) => (
            <Link key={item.route} to={routePath(item.route)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-contact">
          <h2 className="footer-heading">Hubungi</h2>
          <WhatsAppButton source="footer" />
          {phoneReady && (
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              onClick={() => trackEvent("click_phone", { page: "footer" })}
            >
              <Phone size={16} />
              {contact.phone}
            </a>
          )}
          {emailReady && (
            <a
              href={`mailto:${contact.email}`}
              onClick={() => trackEvent("click_email", { page: "footer" })}
            >
              <Mail size={16} />
              {contact.email}
            </a>
          )}
          {!isPlaceholder(contact.hours) && (
            <span className="footer-hours">
              <Clock3 size={16} />
              {contact.hours}
            </span>
          )}
          {!isPlaceholder(contact.instagram) && (
            <a
              href={`https://instagram.com/${contact.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("click_social", {
                  platform: "instagram",
                  page: "footer",
                })
              }
            >
              <Camera size={16} />
              Instagram
            </a>
          )}
          {!isPlaceholder(contact.tiktok) && (
            <a
              href={`https://tiktok.com/@${contact.tiktok.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("click_social", {
                  platform: "tiktok",
                  page: "footer",
                })
              }
            >
              <Music2 size={16} />
              TikTok
            </a>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE.seller.name}
        </p>
        <p>{SITE.meta.disclaimer}</p>
      </div>
    </footer>
  );
}
