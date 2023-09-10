"use client";

import FIcon from "@/common/FIcon";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiButton from "@/common/MaterialUi/MuiButton";
import TextLogo from "@/common/TextLogo";
import AuthPageLayout from "@/components/AuthPageLayout";
import error_message from "@/lib/error_message";
import toast from "@/lib/toast";
import { fields_required } from "@/validations/formik_validations";
import axios from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },

    validate: fields_required([
      "name",
      "email",
      {
        field: "password",
        message: "Please provide your password!",
      },
    ]),

    onSubmit: async (values) => {
      try {
        await axios.post(`/api/auth/signup`, {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        });

        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        router.replace("/");

        toast({ message: "Registration Successfull!" });
      } catch (error) {
        toast({ message: error_message(error), type: "error" });
      }
    },
  });

  return (
    <AuthPageLayout>
      <form onSubmit={formik.handleSubmit} className="h-fit w-full space-y-6">
        <h2 className="flex items-center gap-x-2 pb-4 text-center text-2xl font-semibold text-blue-500">
          <FIcon icon="user" />
          <span>Register</span>
          <span className="hidden sm:block">to</span>
          <div className="hidden scale-75 transform sm:block">
            <TextLogo />
          </div>
        </h2>

        <MuiTextField
          required={true}
          label="Your Name"
          {...formik.getFieldProps("name")}
          touched={formik.touched.name}
          error={formik.errors.name}
        />

        <MuiTextField
          required={true}
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          touched={formik.touched.email}
          error={formik.errors.email}
        />

        <MuiTextField
          required={false}
          label="Phone"
          {...formik.getFieldProps("phone")}
          touched={formik.touched.phone}
          error={formik.errors.phone}
        />

        <MuiTextField
          required={true}
          label="Password"
          type="password"
          autoComplete="off"
          aria-autocomplete="none"
          {...formik.getFieldProps("password")}
          touched={formik.touched.password}
          error={formik.errors.password}
        />

        <div className="w-full sm:w-fit">
          <MuiButton loading={formik.isSubmitting} type="submit">
            Create Account
          </MuiButton>
        </div>

        {/* Signup Message */}
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          <span className="mr-1"> Already have an account? </span>
          <a
            href="/auth/signin"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            Sign in here
          </a>
        </p>
      </form>
    </AuthPageLayout>
  );
}
