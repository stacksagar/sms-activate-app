import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function sms_active_request(params: any, method: "GET" | "POST") {
  if (!["GET", "POST"].includes(method)) {
    throw new Error("Method can only be GET or POST");
  }

  const response = await axios.request({
    method,
    url: "https://api.sms-activate.org/stubs/handler_api.php",
    params: {
      api_key: process.env.SMS_ACTIVE_API_KEY,
      ...params,
    },

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method?.toUpperCase() as Methods;
    const { data } = await sms_active_request(
      req.query,
      method === "GET" ? "GET" : "POST"
    );

    res.status(200).json({ data });
  } catch (error: any) {
    res.json({ message: error?.message });
  }
}
