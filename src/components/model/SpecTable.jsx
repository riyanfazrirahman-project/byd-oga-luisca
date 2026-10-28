import { formatNumber } from "@/lib/format";

const SPECS = [
  ["batteryKwh", "Baterai", (value) => `${formatNumber(value)} kWh`],
  ["rangeKm", "Jarak tempuh", (value) => `${formatNumber(value)} km`],
  ["powerHp", "Tenaga", (value) => `${formatNumber(value)} hp`],
  ["seats", "Kapasitas", (value) => `${formatNumber(value)} kursi`],
  ["drive", "Penggerak", (value) => value],
];

export default function SpecTable({ variants = [] }) {
  const visibleSpecs = SPECS.filter(([key]) =>
    variants.some(
      (variant) =>
        variant.specs?.[key] !== undefined && variant.specs?.[key] !== "",
    ),
  );
  if (!visibleSpecs.length)
    return <p className="empty-note">Spesifikasi belum tersedia.</p>;

  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            <th>Spesifikasi</th>
            {variants.map((variant) => (
              <th key={variant.id}>{variant.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleSpecs.map(([key, label, format]) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              {variants.map((variant) => (
                <td key={variant.id}>
                  {variant.specs?.[key] ? format(variant.specs[key]) : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
