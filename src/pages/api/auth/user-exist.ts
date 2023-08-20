import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function UserExist(req: NextApiRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.body;
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
