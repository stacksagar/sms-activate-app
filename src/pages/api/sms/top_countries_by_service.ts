import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function top_countries_by_service(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await smsActive.getTopCountriesByService();
    res.status(200).json({ data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
