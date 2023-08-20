import axios from "axios";

export default async function request(params: any, method: "GET" | "POST") {
  if (!["GET", "POST"].includes(method)) {
    throw new Error("Method can only be GET or POST");
  }

  const { data } = await axios.request({
    method,
    url: "https://api.sms-activate.org/stubs/handler_api.php",
    params: {
      api_key: "d2e9A91b4eA76de3f32Acec74d5957d0",
      ...params,
    },

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
}
