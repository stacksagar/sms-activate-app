import { NextApiResponse } from "next";
import error_message from "../error_message";

export default function error_response(res: NextApiResponse, error: unknown) {
  return res.status(500).json({ message: error_message(error) });
}
