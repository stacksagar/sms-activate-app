import Res from "@/lib/server/Res";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { CryptomusService } from "./cryptomus.service";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const invoice = await CryptomusService.createInvoice(
      10,
      randomUUID(),
      "USD",
      "tron"
    );

    if (!invoice) {
      Res.msg(res, "Failed to create invoice");
    } else {
      res.send(
        `<a href="${invoice.result.url}" target="_blank">Pay here: ${invoice.result.url}</a>`
      );
    }
  } catch (error) {
    return Res.err(res, error);
  }
}
