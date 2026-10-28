export function calculateInstallment(price, dpPercent, tenorMonths, annualInterestPercent) {
  if (![price, dpPercent, tenorMonths, annualInterestPercent].every(Number.isFinite)) return null;
  if (price <= 0 || tenorMonths <= 0 || dpPercent < 0 || dpPercent >= 100) return null;

  const downPayment = Math.round((price * dpPercent) / 100);
  const principal = price - downPayment;
  const monthlyRate = annualInterestPercent / 100 / 12;
  // TODO: konfirmasi metode leasing
  const monthlyPayment =
    monthlyRate === 0
      ? principal / tenorMonths
      : (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -tenorMonths);

  return {
    downPayment,
    principal,
    monthlyPayment: Math.round(monthlyPayment),
  };
}
