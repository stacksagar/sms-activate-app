import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_rent_number(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await smsActive.getRentNumber(
      "fb", // service
      187, // country
      24, // time
      "any", // operator
      "http://localhost:3000/api/sms/webhook" // url
    );
    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
