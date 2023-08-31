import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

import error_message from "@/lib/error_message";
import User from "@/models/mongodb/User";
import Res from "@/lib/server/Res";

export default async function SIGNUP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method?.toUpperCase() as Methods;
    if (method !== "PUT") throw new Error("Not allow");
    const id = req.query.id;
    const user = await User.findById(id);
    if (!user) return Res.err(res, "Not user", 404);
    const { old_password, new_password } = req.body;

    const matched = await bcrypt.compare(old_password, user.password);
    if (!matched) throw new Error("Wrong password!");

    const password = await bcrypt.hash(new_password, 10);
    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password updated.", user });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
