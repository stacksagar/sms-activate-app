import { NextApiRequest, NextApiResponse } from "next";

import Res from "@/lib/server/Res";
import Activation from "@/models/mongodb/Activation";
import createActivation from "./createActivation";
import getActiveActivations from "./getActiveActivations";
import deleteActivations from "./deleteActivations";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;

    switch (method) {
      case "POST": {
        try {
          const data = await createActivation(req, res);
          return Res.json(res, { ...data });
        } catch (error) {
          return Res.err(res, error);
        }
      }

      case "GET": {
        if (req?.query?.id) {
          const activations = await Activation.find({
            user: req.query?.id,
          }).sort({
            createdAt: -1,
          });

          let count = 0;
          let get_activations_interval = setInterval(() => {
            if (count === 40) return;
            count++;
            getActiveActivations(() => clearInterval(get_activations_interval));
            console.log("GetActiveActivations count=", count);
          }, 30000);

          return Res.json(res, { activations });
        } else {
          const activations = await Activation.find().sort({
            createdAt: -1,
          });

          return Res.json(res, { activations });
        }
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
        try {
          await deleteActivations(req, res);
          return Res.msg(res, "Successfully deleted", 200);
        } catch (error) {
          return Res.err(res, error);
        }
      }
    }
  } catch (error) {
    return Res.err(res, error);
  }
};

export default handler;
