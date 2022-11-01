export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "gbp",
    style: "currency",
    minimumFractionDigits: 2
});
// passed "undefined" to default to current users locale

export const formatCurrency = (amount) => currencyFormatter.format(amount);