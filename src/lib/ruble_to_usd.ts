export default function ruble_to_usd(
  ruble?: number,
  usd_price_by_ruble?: number
) {
  return Number(((1 / (usd_price_by_ruble || 98)) * (ruble || 0)).toFixed(2));
}
