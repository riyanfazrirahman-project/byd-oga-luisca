import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { SITE } from "@/data/site.config";
import { asset, routePath } from "@/lib/paths";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  function toggleTheme() {
    const nextDarkMode = !darkMode;
    document.documentElement.classList.toggle("dark", nextDarkMode);
    document.documentElement.style.colorScheme = nextDarkMode
      ? "dark"
      : "light";
    document.querySelector('meta[name="theme-color"]').content = nextDarkMode
      ? "#0b1220"
      : "#f7f9fc";
    setDarkMode(nextDarkMode);
    try {
      window.localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
    } catch (error) {
      console.error("Preferensi tema tidak dapat disimpan.", error);
    }
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner ">
        <Link
          className="wordmark"
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

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {SITE.nav.map((item) => (
            <NavLink
              key={item.route}
              to={routePath(item.route)}
              end={item.route === "home"}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Aktifkan tema terang" : "Aktifkan tema gelap"
            }
            title={darkMode ? "Tema terang" : "Tema gelap"}
          >
            {darkMode ? (
              <Sun size={20} aria-hidden="true" />
            ) : (
              <Moon size={20} aria-hidden="true" />
            )}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobile-navigation"
        hidden={!menuOpen}
      >
        <nav className="mobile-nav" aria-label="Navigasi ponsel">
          {SITE.nav.map((item) => (
            <NavLink
              key={item.route}
              to={routePath(item.route)}
              end={item.route === "home"}
              className={({ isActive }) =>
                `mobile-nav-link${isActive ? " active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <WhatsAppButton source="mobile-menu" className="mobile-chat" />
        </nav>
      </div>
    </header>
  );
}
