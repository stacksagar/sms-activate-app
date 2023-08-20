import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_countries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const countries = await smsActive.getCountries();
    res.status(200).json({ countries });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
