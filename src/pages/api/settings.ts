import error_message from "@/lib/error_message";
import Setting from "@/models/Setting";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase();
    let settings: Setting | null;

    switch (method) {
      case "GET":
        settings = await Setting.findOne({ where: { id: 1 } });
        break;

      case "PUT":
        await Setting.update(req.body, { where: { id: 1 } });
        settings = await Setting.findOne({ where: { id: 1 } });
        break;

      default:
        settings = await Setting.findOne({ where: { id: 1 } });
    }

    res.status(200).json({ settings });
  } catch (error) {
    res.status(400).json({
      message: error_message(error),
    });
  }
};

export default handler;
