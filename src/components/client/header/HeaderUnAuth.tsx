import Button from "@/common/Buttons/Button";
import Link from "next/link";
import React from "react";

export default function HeaderUnAuth() {
  return (
    <>
      <Link href="/auth/signup" className="w-fit">
        <Button
          color="pink"
          className="hover:scale-105 transition-all hover:gap-x-4"
        >
          Signup
        </Button>
      </Link>

      <Link href="/auth/signin" className="w-fit">
        <Button className="hover:scale-105 transition-all hover:gap-x-4">
          Signin
        </Button>
      </Link>
    </>
  );
}
