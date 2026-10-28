import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Info } from "lucide-react";
import { Link } from "react-router";
import Seo from "@/components/seo/Seo";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import { calculateInstallment } from "@/lib/installment";
import { formatNumber, formatRupiah } from "@/lib/format";
import { routePath } from "@/lib/paths";

export default function SimulationPage() {
  const availableModels = SITE.models.filter((model) => model.status === "available");
  const [modelSlug, setModelSlug] = useState(availableModels[0]?.slug ?? "");
  const model = availableModels.find((item) => item.slug === modelSlug) ?? availableModels[0];
  const sortedVariants = useMemo(
    () => [...(model?.variants ?? [])].sort((a, b) => a.price - b.price),
    [model],
  );
  const [variantId, setVariantId] = useState("");
  const variant = sortedVariants.find((item) => item.id === variantId) ?? sortedVariants[0];
  const [dpAmount, setDpAmount] = useState("");
  const [tenor, setTenor] = useState(SITE.simulation.tenors.includes(36) ? 36 : SITE.simulation.tenors[0]);
  const price = variant?.price || model?.priceFrom || 0;
  const minDp = Math.round((price * SITE.simulation.minDpPercent) / 100);
  const maxDp = Math.round(price * 0.7);
  const currentDp = Math.min(maxDp, Math.max(minDp, Number(dpAmount) || minDp));
  const dpPercent = price ? Math.min(70, Math.max(SITE.simulation.minDpPercent, (currentDp / price) * 100)) : SITE.simulation.minDpPercent;
  const estimate = price
    ? calculateInstallment(price, dpPercent, tenor, SITE.simulation.defaultInterestPercent)
    : null;
  const simulationMessage = `Sebagai gambaran, saya ingin membahas simulasi ${model?.name ?? ""} ${variant?.name ?? ""}, DP ${formatRupiah(currentDp)}, tenor ${tenor} bulan.`;

  function changeModel(slug) {
    setModelSlug(slug);
    setVariantId("");
    setDpAmount("");
  }

  function changeDpAmount(value) {
    const parsed = Number(value);
    if (value === "") {
      setDpAmount("");
      return;
    }
    if (Number.isFinite(parsed)) setDpAmount(String(Math.min(maxDp, Math.max(minDp, parsed))));
  }

  return (
    <>
      <Seo title="Simulasi Cicilan" description="Buat perkiraan cicilan mobil BYD dan diskusikan hasilnya bersama Oga." />
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">Rencanakan dengan tenang</span>
          <h1>Simulasi cicilan</h1>
          <p>Perkiraan awal untuk membantu Anda berdiskusi dengan Oga.</p>
        </div>
      </section>
      <section className="section simulation-section">
        <div className="container simulation-layout">
          {availableModels.length ? (
            <>
              <form className="simulation-form" onSubmit={(event) => event.preventDefault()}>
                <div className="simulation-step">
                  <label htmlFor="simulation-model"><span>01</span> Pilih model</label>
                  <select id="simulation-model" value={model?.slug ?? ""} onChange={(event) => changeModel(event.target.value)}>
                    {availableModels.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                  </select>
                </div>
                <div className="simulation-step">
                  <label htmlFor="simulation-variant"><span>02</span> Pilih varian</label>
                  <select id="simulation-variant" value={variant?.id ?? ""} onChange={(event) => setVariantId(event.target.value)} disabled={!sortedVariants.length}>
                    {sortedVariants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </div>
                {price > 0 && (
                  <div className="simulation-step dp-step">
                    <label htmlFor="dp-amount"><span>03</span> Uang muka (DP)</label>
                    <div className="dp-input-row">
                      <div className="currency-input"><span>Rp</span><input id="dp-amount" type="number" inputMode="numeric" min={minDp} max={maxDp} step="1000000" value={dpAmount || minDp} onChange={(event) => changeDpAmount(event.target.value)} /></div>
                      <span className="dp-percent">{formatNumber(Math.round(dpPercent))}%</span>
                    </div>
                    <input
                      className="dp-slider"
                      type="range"
                      min={SITE.simulation.minDpPercent}
                      max="70"
                      step="1"
                      value={dpPercent}
                      aria-label="Persentase uang muka"
                      onChange={(event) => setDpAmount(String(Math.round((price * Number(event.target.value)) / 100)))}
                    />
                    <div className="range-labels"><span>Minimal {SITE.simulation.minDpPercent}%</span><span>Maksimal 70%</span></div>
                  </div>
                )}
                <fieldset className="simulation-step tenor-step">
                  <legend><span>04</span> Pilih tenor</legend>
                  <div className="tenor-options">
                    {SITE.simulation.tenors.map((months) => (
                      <button key={months} type="button" className={tenor === months ? "selected" : ""} aria-pressed={tenor === months} onClick={() => setTenor(months)}>
                        {months}<small>bln</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </form>
              <aside className="simulation-result" aria-live="polite">
                <div className="result-topline"><span><Calculator size={17} /> Estimasi Anda</span><span className="estimate-label">Perkiraan</span></div>
                <div className="monthly-estimate"><span>Perkiraan cicilan</span><strong>{estimate ? formatRupiah(estimate.monthlyPayment) : "Pilih varian"}</strong><small>per bulan · {tenor} bulan</small></div>
                <div className="result-breakdown">
                  <div><span>Harga kendaraan</span><strong>{formatRupiah(price)}</strong></div>
                  <div><span>Uang muka</span><strong>{formatRupiah(estimate?.downPayment ?? 0)}</strong></div>
                  <div><span>Pokok pinjaman</span><strong>{formatRupiah(estimate?.principal ?? 0)}</strong></div>
                  <div><span>Bunga asumsi</span><strong>{SITE.simulation.defaultInterestPercent}% per tahun</strong></div>
                </div>
                <WhatsAppButton
                  source="simulation-result"
                  model={model}
                  variant={variant}
                  extraMessage={simulationMessage}
                  className="simulation-chat"
                  onClick={() => trackEvent("submit_simulation", { model: model.slug, variant: variant?.id, tenor, down_payment: estimate?.downPayment })}
                >
                  Bahas dengan Oga
                </WhatsAppButton>
                <p className="estimate-disclaimer"><Info size={16} />Angka ini hanya perkiraan dan bukan penawaran resmi. Bunga dan biaya mengikuti leasing yang disetujui.</p>
              </aside>
            </>
          ) : (
            <div className="empty-panel simulation-empty">
              <div className="empty-icon"><Calculator size={28} /></div>
              <div><h2>Simulasi akan tersedia setelah katalog disiapkan.</h2><p>Data model, harga, dan varian diperlukan untuk membuat estimasi yang bermakna.</p></div>
              <Link className="button button-outline" to={routePath("models")}>Jelajahi katalog <ArrowRight size={17} /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
