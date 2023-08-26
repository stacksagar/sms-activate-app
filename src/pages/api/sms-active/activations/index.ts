import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import Activation from "@/models/mongodb/Activation";
import createActivation from "./createActivation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;

    switch (method) {
      case "POST": {
        const data = await createActivation(req, res);
        return Res.json(res, { ...data });
      }

      case "GET": {
        const activations = await Activation.find().sort({ createdAt: -1 });
        return Res.json(res, { activations });
      }

      case "PUT": {
        const activation = await Activation.findByIdAndUpdate(
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
        return Res.json(res, { activation }, 201);
      }

      case "DELETE": {
        const IDsToDelete = req.body?.ids;
        await Activation.deleteMany({
          _id: {
            $in: IDsToDelete,
          },
        });
        return Res.msg(res, "Successfully deleted", 200);
      }
    }
  } catch (error) {
    return Res.err(res, error);
  }
};

export default handler;
