import { Outlet, ScrollRestoration } from "react-router";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function PageShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <ScrollRestoration />
    </>
  );
}
