import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_rent_services_and_countries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("METHOD is ", req.method);

  try {
    const data = await smsActive.getRentServicesAndCountries();
    res.status(200).json({ ...data });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
