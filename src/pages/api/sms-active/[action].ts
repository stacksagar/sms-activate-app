 
import { NextApiRequest, NextApiResponse } from "next";
import request from "./request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await request(
      req.query,
      req.method?.toUpperCase()?.trim() === "GET" ? "GET" : "POST"
    );

    res.status(200).json({ data });
  } catch (error: any) {
    res.json({ message: error?.message });
  }
}
