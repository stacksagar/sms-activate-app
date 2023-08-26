import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import Setting from "@/models/mongodb/Setting";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase();
    let settings: SettingT | null;

    switch (method) {
      case "GET":
        settings = await Setting.findById("64e8586a9fc5ead50982daea");
        break;

      case "PUT":
        settings = await Setting.findByIdAndUpdate(
          "64e8586a9fc5ead50982daea",
          {
            $set: {
              ...req.body,
            },
          },
          {
            new: true,
          }
        );
        break;

      default:
        settings = await Setting.findById("64e8586a9fc5ead50982daea");
    }
    return Res.json(res, { settings });
  } catch (error) {
    return Res.err(res, error);
  }
};

export default handler;
