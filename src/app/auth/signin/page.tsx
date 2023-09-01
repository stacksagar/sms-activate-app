import SigninForm from "./SigninForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Signin() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/services");

  return <SigninForm />;
}
