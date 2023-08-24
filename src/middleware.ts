import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

// export function middleware(req: NextRequest, res: NextApiResponse) {
//   console.log("req.nextUrl ", req.nextUrl.pathname);
// }

export const config = {
  matcher: ["/dashboard"],
};
