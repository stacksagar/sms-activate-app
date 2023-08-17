import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_status(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string = req.query?.id?.toString() || "";
    const status = await smsActive.getStatus(id);
    res.status(200).json({ status });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
