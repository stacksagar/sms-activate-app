import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("server is ok");
  res.status(200).json({ message: "ok" });
}
