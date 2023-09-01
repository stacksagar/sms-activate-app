import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignupForm from "./SignupForm";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("profile/services");

  return <SignupForm />;
}
