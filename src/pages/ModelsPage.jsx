import { useMemo } from "react";
import { CarFront, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";
import Seo from "@/components/seo/Seo";
import ModelCard from "@/components/model/ModelCard";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE } from "@/data/site.config";
import { sortModels } from "@/lib/data";

const TYPES = ["all", "suv", "sedan", "mpv"];

export default function ModelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get("tipe") || "all";
  const sort = searchParams.get("urut") || "recommended";
  const models = useMemo(() => {
    const filtered = SITE.models.filter(
      (model) => selectedType === "all" || model.type === selectedType,
    );
    return sortModels(filtered, sort);
  }, [selectedType, sort]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all" || value === "recommended") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  }

  return (
    <>
      <Seo
        title="Model BYD"
        description="Jelajahi model BYD dan dapatkan informasi langsung dari Oga Luisca."
      />
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">Temukan kendaraan yang sesuai</span>
          <h1>Model BYD</h1>
          <p>Pilih model, lalu tanyakan detailnya langsung kepada Oga.</p>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="container">
          <div className="catalog-toolbar">
            <div
              className="filter-list"
              role="group"
              aria-label="Filter tipe bodi"
            >
              {TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`filter-chip${selectedType === type ? " selected" : ""}`}
                  aria-pressed={selectedType === type}
                  onClick={() => updateParam("tipe", type)}
                >
                  {type === "all" ? "Semua" : type.toUpperCase()}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <SlidersHorizontal size={16} aria-hidden="true" />
              <span>Urutkan</span>
              <select
                value={sort}
                onChange={(event) => updateParam("urut", event.target.value)}
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-asc">Harga terendah</option>
                <option value="price-desc">Harga tertinggi</option>
              </select>
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            {models.length} model ditemukan
          </p>
          {models.length ? (
            <div className="model-grid">
              {models.map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
            </div>
          ) : (
            <div className="empty-panel catalog-empty">
              <div className="empty-icon">
                <CarFront size={28} />
              </div>
              <div>
                <h2>
                  {SITE.models.length
                    ? "Belum ada model di kategori ini."
                    : "Katalog model sedang disiapkan."}
                </h2>
                <p>
                  Informasi model dan harga akan tampil setelah data resmi
                  tersedia.
                </p>
              </div>
              {selectedType !== "all" && (
                <button
                  className="button button-outline"
                  onClick={() => updateParam("tipe", "all")}
                >
                  Hapus filter
                </button>
              )}
            </div>
          )}
          <aside className="help-banner">
            <div>
              <span className="eyebrow">Perlu bantuan memilih?</span>
              <h2>Diskusikan kebutuhan Anda bersama Oga.</h2>
            </div>
            <WhatsAppButton source="catalog-help" />
          </aside>
        </div>
      </section>
    </>
  );
}
