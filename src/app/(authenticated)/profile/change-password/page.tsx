"use client";

import FIcon from "@/common/FIcon";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiButton from "@/common/MaterialUi/MuiButton";
import { useAuth } from "@/context/AuthProvider";
import error_message from "@/lib/error_message";
import toast from "@/lib/toast";
import { all_fields_required } from "@/validations/formik_validations";
import axios from "axios";
import { useFormik } from "formik";

export default function ChangePassword() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
    },

    validate: all_fields_required,

    onSubmit: async (values) => {
      try {
        await axios.put(`/api/profile/change-password?id=${user._id}`, {
          old_password: values.password,
          new_password: values.new_password,
        });

        toast({ message: "Password updated!" });
      } catch (error) {
        toast({ message: error_message(error), type: "error" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-fit w-full space-y-6">
      <h2 className="flex items-center gap-x-2 pb-4 text-center text-2xl font-semibold text-blue-500">
        <FIcon icon="lock" />
        <span>Change Your Password</span>
      </h2>

      <MuiTextField
        required={true}
        label="Old Password"
        type="password"
        autoComplete="off"
        aria-autocomplete="none"
        {...formik.getFieldProps("password")}
        touched={formik.touched.password}
        error={formik.errors.password}
      />

      <MuiTextField
        required={true}
        label="New Password"
        type="password"
        autoComplete="off"
        aria-autocomplete="none"
        {...formik.getFieldProps("new_password")}
        touched={formik.touched.new_password}
        error={formik.errors.new_password}
      />

      <div className="w-full sm:w-fit">
        <MuiButton loading={formik.isSubmitting} type="submit">
          Update Password
        </MuiButton>
      </div>
    </form>
  );
}
