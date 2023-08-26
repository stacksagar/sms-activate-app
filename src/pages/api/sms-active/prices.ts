import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import SMSServicePrice from "@/models/mongodb/SMSServicePrice";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;

    switch (method) {
      case "POST":
        const { service, country } = req.body;
        const exist = await SMSServicePrice.findOne({ service, country });
        if (exist) throw new Error("service/country already exist!");
        const price = await SMSServicePrice.create(req.body);
        return Res.json(res, { price });

      case "GET":
        const prices = await SMSServicePrice.find().sort({ createdAt: -1 });
        return Res.json(res, { prices });

      case "PUT":
        const user = await SMSServicePrice.findByIdAndUpdate(
          req?.query?.id,
          {
            $set: {
              ...req.body,
            },
          },
          {
            new: true,
          }
        );

        return Res.json(res, { user }, 201);

      case "DELETE":
        const IDsToDelete = req.body?.ids;
        await SMSServicePrice.deleteMany({
          _id: {
            $in: IDsToDelete,
          },
        });

        return Res.msg(res, "Successfully deleted", 200);
    }
  } catch (error) {
    return Res.err(res, error);
  }
};

export default handler;
