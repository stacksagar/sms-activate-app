import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import error_message from '@/lib/error_message';
import User from '@/models/mongodb/User';

export default async function SIGNUP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password: text_password } = await req.body;

    const exist = await User.findOne({ email });
    if (exist) throw new Error("Email already exist!");

    const password = await bcrypt.hash(text_password, 10);

    const user = await User.create({ ...req.body, password });
    return res.status(201).json({ message: "User registered.", user });
  } catch (error) {
    return res.status(500).json({ message: error_message(error) });
  }
}
