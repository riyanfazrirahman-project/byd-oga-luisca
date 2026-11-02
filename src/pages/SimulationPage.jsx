import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Info } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Seo from "@/components/seo/Seo";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE } from "@/data/site.config";
import { trackEvent } from "@/lib/analytics";
import { calculateInstallment } from "@/lib/installment";
import { formatNumber, formatRupiah } from "@/lib/format";
import { routePath } from "@/lib/paths";

export default function SimulationPage() {
  const availableModels = SITE.models.filter((model) => model.status === "available");
  const [searchParams] = useSearchParams();
  const requestedModel = availableModels.find(
    (item) => item.slug === searchParams.get("model"),
  );
  const [modelSlug, setModelSlug] = useState(
    requestedModel?.slug ?? availableModels[0]?.slug ?? "",
  );
  const model = availableModels.find((item) => item.slug === modelSlug) ?? availableModels[0];
  const sortedVariants = useMemo(
    () => [...(model?.variants ?? [])].sort((a, b) => a.price - b.price),
    [model],
  );
  const requestedVariantId = searchParams.get("variant");
  const [variantId, setVariantId] = useState(() =>
    sortedVariants.some((item) => item.id === requestedVariantId)
      ? requestedVariantId
      : "",
  );
  const variant = sortedVariants.find((item) => item.id === variantId) ?? sortedVariants[0];
  const [dpAmount, setDpAmount] = useState(null);
  const [tenor, setTenor] = useState(SITE.simulation.tenors.includes(36) ? 36 : SITE.simulation.tenors[0]);
  const [interestPercent, setInterestPercent] = useState(
    SITE.simulation.defaultInterestPercent > 0
      ? String(SITE.simulation.defaultInterestPercent)
      : "",
  );
  const price = variant?.price || model?.priceFrom || 0;
  const minDp = Math.round((price * SITE.simulation.minDpPercent) / 100);
  const maxDp = Math.round(price * 0.7);
  const enteredDp = dpAmount === null ? minDp : Number(dpAmount);
  const hasValidDp = Number.isFinite(enteredDp) && enteredDp >= minDp && enteredDp <= maxDp;
  const currentDp = hasValidDp ? enteredDp : minDp;
  const dpPercent = price ? Math.min(70, Math.max(SITE.simulation.minDpPercent, (currentDp / price) * 100)) : SITE.simulation.minDpPercent;
  const annualInterestPercent = interestPercent === "" ? null : Number(interestPercent);
  const hasValidInterest = Number.isFinite(annualInterestPercent) && annualInterestPercent >= 0;
  const estimate = price && hasValidInterest && hasValidDp
    ? calculateInstallment(price, dpPercent, tenor, annualInterestPercent)
    : null;
  const interestSummary = !hasValidInterest
    ? "bunga leasing belum ditentukan"
    : `bunga ${interestPercent}% per tahun`;
  const dpSummary = hasValidDp ? formatRupiah(currentDp) : "belum ditentukan";
  const simulationMessage = `Sebagai gambaran, saya ingin membahas simulasi ${model?.name ?? ""} ${variant?.name ?? ""}, DP ${dpSummary}, ${interestSummary}, tenor ${tenor} bulan.`;

  function changeModel(slug) {
    setModelSlug(slug);
    setVariantId("");
    setDpAmount(null);
  }

  function changeDpAmount(value) {
    setDpAmount(value);
  }

  return (
    <>
      <Seo page="simulation" />
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
                      <div className="currency-input"><span>Rp</span><input id="dp-amount" type="number" inputMode="numeric" min={minDp} max={maxDp} step="1000000" value={dpAmount ?? minDp} aria-invalid={!hasValidDp} aria-describedby="dp-range-hint" onChange={(event) => changeDpAmount(event.target.value)} /></div>
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
                    <div className="range-labels" id="dp-range-hint"><span>Minimal {SITE.simulation.minDpPercent}% ({formatRupiah(minDp)})</span><span>Maksimal 70%</span></div>
                    {!hasValidDp && <p className="dp-validation" role="alert">Masukkan DP antara {formatRupiah(minDp)} dan {formatRupiah(maxDp)}.</p>}
                  </div>
                )}
                <div className="simulation-step">
                  <label htmlFor="interest-percent"><span>04</span> Bunga leasing (% per tahun)</label>
                  <p className="interest-note">({SITE.simulation.interestNote})</p>
                  <input
                    className="interest-rate-input"
                    id="interest-percent"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    placeholder="Masukkan bunga leasing"
                    value={interestPercent}
                    onChange={(event) => setInterestPercent(event.target.value)}
                  />
                </div>
                <fieldset className="simulation-step tenor-step">
                  <legend><span>05</span> Pilih tenor</legend>
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
                <div className="monthly-estimate"><span>Perkiraan cicilan</span><strong>{estimate ? formatRupiah(estimate.monthlyPayment) : !hasValidDp ? "Periksa DP" : hasValidInterest ? "Pilih varian" : "Masukkan bunga"}</strong><small>per bulan · {tenor} bulan</small></div>
                <div className="result-breakdown">
                  <div><span>Harga kendaraan</span><strong>{formatRupiah(price)}</strong></div>
                  <div><span>Uang muka</span><strong>{formatRupiah(estimate?.downPayment ?? 0)}</strong></div>
                  <div><span>Pokok pinjaman</span><strong>{formatRupiah(estimate?.principal ?? 0)}</strong></div>
                  <div><span>Bunga leasing</span><strong>{hasValidInterest ? `${interestPercent}% per tahun` : "Belum diisi"}</strong></div>
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
