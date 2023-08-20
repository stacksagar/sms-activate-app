import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function uploadFile(req: NextApiRequest) {
  console.log("Middleware");

  console.log(req.url);

  console.log(req.headers.origin);

  return NextResponse.next();
}
