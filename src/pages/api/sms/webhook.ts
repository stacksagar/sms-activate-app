import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "POST") return res.end("Invaid request");

  const body = req.body;
  console.log("...body, From Webhook! ", body);
  console.log("METHOD ", req.method);

  try {
    res.status(200).json({ ...body });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
