import { NextApiResponse } from "next";

export default function json_response(
  res: NextApiResponse,
  data: object,
  status?: number
) {
  return res.status(status || 200).json({ ...data });
}
