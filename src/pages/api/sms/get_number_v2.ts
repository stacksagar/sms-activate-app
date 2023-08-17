import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_number_v2(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await smsActive.getNumberV2(
      "fb", // service
      false, // forward
      12, // country
      "tmobile", // operator
      null, // ref
      null, // phoneException
      null, // maxPrice
      null // verification
    );
    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
