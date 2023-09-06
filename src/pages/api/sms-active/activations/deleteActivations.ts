import Res from "@/lib/server/Res";
import Activation from "@/models/mongodb/Activation";
import User from "@/models/mongodb/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteActivations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const IDsToDelete = req.body?.ids as ID[];
  if (IDsToDelete?.length === 0) return;
  for (let i = 0; i < IDsToDelete.length; i++) {
    const activation = await Activation.findById(IDsToDelete[i]);
    const user = await User.findById(activation?.user);
    if (activation?.status === "STATUS_WAIT_CODE" && user) {
      user.balance = (user?.balance || 0) + (activation?.total_cost || 0);
      await user.save();
    }

    if (
      activation?.status !== "IN_HISTORY" &&
      activation?.status !== "COMPLETED"
    ) {
      await activation?.deleteOne();
    } else return Res.msg(res, "You can't delete!", 400);
  }
}
