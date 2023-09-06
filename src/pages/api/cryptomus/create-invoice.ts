import { NextApiRequest, NextApiResponse } from "next";
import { cryptomusConfig } from "./cryptomus.config";
import { uid } from "uid";
const https = require("https");

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const method = request.method?.toUpperCase() as Methods;
  // if (method !== "POST") return response.json({ message: "not allow" });
  const {
    amount,
    currency,
    network,
    callback,
    order_id,
    additional_data,
    url_success,
  } = request.body;

  const data: any = {
    order_id: order_id || uid(),
    url_callback:
      callback || "https://sms-verification.vercel.app/api/cryptomus/callback",
    is_payment_multiple: true,
  };

  if (amount) {
    data.amount = amount;
  }

  if (currency) {
    data.currency = currency;
  }

  if (network) {
    data.network = network;
  }

  if (additional_data) {
    data.additional_data = JSON.stringify(additional_data || {});
  }

  if (url_success) {
    data.url_success = url_success;
  }

  const jsonData = JSON.stringify(data);
  const sign = require("crypto")
    .createHash("md5")
    .update(Buffer.from(jsonData).toString("base64") + cryptomusConfig.API_KEY)
    .digest("hex");

  const options = {
    hostname: "api.cryptomus.com",
    path: "/v1/payment",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      merchant: cryptomusConfig.MERCHANT_ID,
      sign: sign,
    },
  };

  try {
    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (res: any) => {
        let body = "";
        res.on("data", (chunk: any) => {
          body += chunk;
        });
        res.on("end", () => {
          const original_data = JSON.parse(body || "{}");
          resolve(original_data);
        });
        res.on("error", reject);
      });

      req.on("error", reject);

      req.write(jsonData);
      req.end();
    });

    response.json(result);
  } catch (error) {
    console.error("ERROR", error);
    response.status(500).send(error);
  }
}
