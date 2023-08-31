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
    if (method !== "PUT") return Res.msg(res, "Not Allow");

    const user = await User.findByIdAndUpdate(
      req.query?.id,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({ message: "User updated.", user });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
