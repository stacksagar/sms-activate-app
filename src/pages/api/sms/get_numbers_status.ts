import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_numbers_status(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await smsActive.getNumbersStatus(12, "tmobile");
    res.status(200).json({ data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
