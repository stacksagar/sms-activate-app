import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import error_message from "@/utils/error_message";

export default async function SIGNUP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongoDB();
    const { name, email, password } = await req.body;

    const exist = await User.findOne({ email });
    if (exist) throw new Error("Email already exist!");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({ message: "User registered.", user });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
