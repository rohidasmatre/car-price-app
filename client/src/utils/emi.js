export function calculateEMI(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (!principal || !annualRate || !years) return null;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
}
