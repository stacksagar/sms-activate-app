import { connectDB } from "@/lib/database/connectDB"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  console.log("server is ok");
  res.status(200).json({ message: "ok" });
}
