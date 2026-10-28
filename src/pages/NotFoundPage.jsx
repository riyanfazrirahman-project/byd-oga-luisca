import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "react-router";
import Seo from "@/components/seo/Seo";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { routePath } from "@/lib/paths";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Halaman tidak ditemukan" description="Halaman yang Anda cari tidak tersedia." />
      <section className="not-found">
        <div className="not-found-icon"><SearchX size={34} /></div>
        <span className="eyebrow">404 · Halaman tidak ditemukan</span>
        <h1>Sepertinya halaman ini tidak tersedia.</h1>
        <p>Periksa kembali alamat yang Anda buka, atau jelajahi katalog model.</p>
        <div className="not-found-actions">
          <Link className="button button-primary" to={routePath("models")}><ArrowLeft size={17} />Lihat semua model</Link>
          <WhatsAppButton source="not-found" />
        </div>
      </section>
    </>
  );
}
