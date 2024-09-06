// Helper function for convert number into currency
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

// Helper function for convert iso date into normal date
export function convertToDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(); // Lokal ayarlara göre formatlanmış tarih ve saat döndürür
}
