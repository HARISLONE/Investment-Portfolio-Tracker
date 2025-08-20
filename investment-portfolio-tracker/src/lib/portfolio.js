// currency helpers
export const formatCurrency = (n, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(
    n ?? 0
  );

// current value for a holding from quotes
export function holdingValue(holding, quotes) {
  const q = quotes[holding.symbol]?.price ?? 0;
  return holding.qty * q;
}

// allocation by type (stocks vs crypto)
export function allocationByType(holdings, quotes) {
  const buckets = holdings.reduce((acc, h) => {
    const t = h.type || "other";
    acc[t] = (acc[t] || 0) + holdingValue(h, quotes);
    return acc;
  }, {});
  return Object.entries(buckets).map(([name, value]) => ({ name, value }));
}

// totals and P/L (day)
export function computeTotals(holdings, quotes) {
  let totalValue = 0;
  let dayPL = 0;

  for (const h of holdings) {
    const q = quotes[h.symbol];
    if (!q) continue;
    totalValue += h.qty * q.price;
    dayPL += h.qty * q.price * (q.changePct / 100);
  }
  const dayPLPct = totalValue ? (dayPL / totalValue) * 100 : 0;
  return { totalValue, dayPL, dayPLPct };
}

// simple filter & search utilities
export const filterByType = (holdings, type) =>
  type === "all" ? holdings : holdings.filter((h) => h.type === type);

export const searchHoldings = (holdings, q) =>
  !q
    ? holdings
    : holdings.filter((h) =>
        (h.symbol || "").toLowerCase().includes(q.toLowerCase())
      );
