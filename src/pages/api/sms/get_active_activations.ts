import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_active_activations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const activations = await smsActive.getActiveActivations();
    res.status(200).json({ activations });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
