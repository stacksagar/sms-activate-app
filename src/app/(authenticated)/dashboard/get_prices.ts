import axios from "axios";

export default async function get_prices() {
  const { data } = await axios.get(`/api/sms-active/prices`);
  const prices = data?.prices as SMSServicePrice[];
  return prices;
}
