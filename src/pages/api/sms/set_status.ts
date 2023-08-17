import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function set_status(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string = req.query?.id?.toString() || "";
    const status: string = req.query?.id?.toString() || "";
    const forwad: string = req.query?.id?.toString() || "";

    const data = await smsActive.setStatus(id, status, forwad);
    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
