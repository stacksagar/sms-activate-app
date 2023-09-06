import Res from "@/lib/server/Res";
import Deposit from "@/models/mongodb/Deposit";
import User from "@/models/mongodb/User";
import { NextApiRequest, NextApiResponse } from "next";

const reqBody: any = {
  type: "payment",
  uuid: "7db035be-f1a8-4b66-818d-6899fa86b047",
  order_id: "bcb1b118595",
  amount: "1.30000000",
  payment_amount: "0.02066513",
  payment_amount_usd: "1.30",
  merchant_amount: "0.02025183",
  commission: "0.00041330",
  is_final: true,
  status: "paid",
  from: "ltc1qyhgpq7j2hrdxtsa905rz6ngnhth9pm2hac2exv",
  wallet_address_uuid: null,
  network: "ltc",
  currency: "USD",
  payer_currency: "LTC",
  additional_data: JSON.stringify({
    payable_amount: "1.3",
    userId: "64e892e12da6ceec2c826c01",
  }),
  txid: "2dd657b9af632d9b7f3aefa310bdf09315712f72eb857d2f5ddfdf1e58712bdc",
  sign: "24be952c8a7b440eaeb1bc8cac747dd7",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const body = req.body as DepositT & { additional_data: string };

    const body = reqBody as DepositT & { additional_data: string };
    if (!body?.amount) return Res.err(res, "Something wrong!");

    const callbackData = {
      ...body,
      additional_data: JSON.parse(body.additional_data || "{}"),
    } as DepositT & { additional_data: object };

    const exist = await Deposit.findOne({ txid: callbackData.txid });
    if (exist?._id) return Res.msg(res, "txid already exist!");

    const user = await User.findById(callbackData.additional_data?.userId);
    if (!user) return Res.msg(res, "Payment successfull, But user not found!");

    user.balance = (user.balance || 0) + Number(callbackData.amount || "0");
    await user.save();

    const deposit = await Deposit.create({
      ...callbackData,
      user: callbackData.additional_data?.userId,
    });

    res.status(200).json({ message: "Deposit successfull!", deposit, user });
  } catch (error) {
    console.log("ERROR: ", error);
    return Res.err(res, error);
  }
}
