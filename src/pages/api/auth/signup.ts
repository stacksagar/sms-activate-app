import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import error_message from "@/lib/error_message";
import { connectDB } from "@/lib/database/connectDB";

export default async function SIGNUP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const { email, password: text_password } = await req.body;

    const exist = await User.findOne({ where: { email } });
    if (exist) throw new Error("Email already exist!");

    const password = await bcrypt.hash(text_password, 10);

    const user = await User.create({ ...req.body, password });

    return res.status(201).json({ message: "User registered.", user });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
