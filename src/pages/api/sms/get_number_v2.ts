import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_number_v2(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    service,
    forward,
    country,
    operator,
    ref,
    phoneException,
    maxPrice,
    verification,
  }: any = req.query;

  try {
    const data = await smsActive.getNumberV2(
      service,
      forward,
      country,
      operator,
      ref,
      phoneException,
      maxPrice,
      verification
    );
    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
