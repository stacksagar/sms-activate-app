"use client";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import toast from "@/lib/toast";
import error_message from "@/lib/error_message";
import { Checkbox } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import TextLogo from "@/common/TextLogo";
import FIcon from "@/common/FIcon";
import MuiButton from "@/common/MaterialUi/MuiButton";
import AuthPageLayout from "@/components/AuthPageLayout";
import { all_fields_required } from "@/validations/formik_validations";
import { useAuth } from "@/context/AuthProvider";
import WarningText from "@/common/WarningText";

export default function SigninForm() {
  const router = useRouter();
  const { error, setError } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: all_fields_required,

    onSubmit: async (values) => {
      try {
        const data = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (data?.error) {
          setError(data.error);
          setTimeout(() => {
            setError("");
          }, 2500);
        } else {
          toast({
            message: "You're logged in now!",
            duration: 2000,
          });
          router.push("/");
        }
      } catch (error) {
        toast({ message: error_message(error), type: "error" });
      }
    },
  });

  return (
    <AuthPageLayout>
      <form onSubmit={formik.handleSubmit} className="h-fit w-full space-y-6">
        <h2 className="flex items-center gap-x-2 pb-4 text-center text-2xl font-semibold text-blue-500">
          <FIcon icon="unlock-alt" />
          <span>Login</span>
          <span className="hidden sm:block">to</span>
          <div className="hidden scale-75 transform sm:block">
            <TextLogo />
          </div>
        </h2>

        <WarningText shouldShow={error} type="error" />

        <MuiTextField
          required={true}
          placeholder="Email"
          type="email"
          {...formik.getFieldProps("email")}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <MuiTextField
          required={true}
          placeholder="Password"
          type="password"
          {...formik.getFieldProps("password")}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
        {/* Forgot Password Message */}
        <small>
          <a
            href="/auth/forgot-password"
            className="text-primary-600 dark:text-primary-500 hover:underline"
          >
            Forgot Password?
          </a>
        </small>
        <div className="flex items-center gap-2 dark:text-white">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="flex cursor-pointer items-center gap-x-1"
            title="If you want to save your Login/Credentials for long time then checked it! Otherwise, If you don't want to save any information then don't checked it!"
          >
            Trust This Device
          </label>
        </div>
        <div className="w-full sm:w-fit">
          <MuiButton loading={formik.isSubmitting} type="submit">
            Signin
          </MuiButton>
        </div>
        {/* Signup Message */}
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          <span className="mr-1"> Do not have an account? </span>
          <a
            href="/auth/signup"
            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
          >
            Create account!
          </a>
        </p>
      </form>
    </AuthPageLayout>
  );
}
