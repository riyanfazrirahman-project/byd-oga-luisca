const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(value) {
  return Number.isFinite(value) && value > 0 ? rupiah.format(value) : "Hubungi Oga untuk harga";
}

export function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function isPlaceholder(value) {
  return typeof value !== "string" || !value.trim() || /^\[[^\]]+\]$/.test(value.trim());
}
