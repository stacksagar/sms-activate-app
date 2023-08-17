import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_rent_list(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await smsActive.getRentList();

    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
