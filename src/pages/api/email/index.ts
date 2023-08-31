import send_mail from "@/configurations/send_mail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await send_mail("stacksagar@gmail.com", "Testing", "<h1>Hello </h1>");

  res.status(200).json({ message: "ok" });
}
