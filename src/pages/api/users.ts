import error_message from "@/lib/error_message";
import json_response from "@/lib/server/json_response";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;

    switch (method) {
      case "GET":
        const users = await User.findAll();
        return json_response(res, { users });

      case "PUT":
        await User.update(req.body, { where: { id: req.query?.id } });
        const user = await User.findOne({ where: { id: req.query?.id } });
        return json_response(res, { user }, 201);
    }
  } catch (error) {
    res.status(400).json({
      message: error_message(error),
    });
  }
};

export default handler;
