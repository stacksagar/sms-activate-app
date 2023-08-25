import { NextApiResponse } from "next";
import error_message from "../error_message";

class Response {
  public msg(res: NextApiResponse, message: string, status?: number) {
    return res.status(status || 200).json({ message });
  }

  public err(res: NextApiResponse, error: unknown, status?: number) {
    return res.status(status || 400).json({ message: error_message(error) });
  }

  public json(res: NextApiResponse, data: object, status?: number) {
    return res.status(status || 200).json({ ...data });
  }
}

const Res = new Response();

export default Res;
