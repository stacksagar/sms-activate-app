"use client";

import Input from "@/common/Forms/Input";
import ClientFooter from "@/components/client/footer/ClientFooter";
import ClientHeader from "@/components/client/header/ClientHeader";
import useString from "@/hooks/state/useString";
import toast from "@/lib/toast";
import error_message from "@/utils/error_message";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const name = useString("");
  const phone = useString("");
  const email = useString("");
  const password = useString("");
  const error = useString("");

  async function signup_handle(e: React.ChangeEvent<HTMLFormElement>) {
    e?.preventDefault();

    try {
      await axios.post(`/api/auth/signup`, {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });

      await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false,
      });
      router.replace("/dashboard");

      toast({ message: "Registration Successfull!" });
    } catch (error) {
      toast({ message: error_message(error), type: "error" });
    }
  }

  return (
    <>
      <ClientHeader />

      <section className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-[70vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full md:max-w-screen-sm">
          <form
            onSubmit={signup_handle}
            className="space-y-6 bg-white p-12 dark:bg-gray-950"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <Input onChange={name.change} placeholder="Name" />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <Input onChange={phone.change} placeholder="Phone" />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  onChange={email.change}
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  onChange={password.change}
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
