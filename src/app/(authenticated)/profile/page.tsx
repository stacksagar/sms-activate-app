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
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validate: all_fields_required,

    onSubmit: async (values) => {
      try {
        await axios.put(`/api/auth/update?id=${user._id}`, {
          name: values.name,
          email: values.email,
          phone: values.phone,
        });

        toast({ message: "Updated!" });
      } catch (error) {
        toast({ message: error_message(error), type: "error" });
      }
    },
  });

  useEffect(() => {
    if (formik.values.name) return;

    formik.setFieldValue("name", user?.name || "");
    formik.setFieldValue("email", user?.email || "");
    formik.setFieldValue("phone", user?.phone || "");

    console.log("[user]");
  }, [user]);

  return (
    <form onSubmit={formik.handleSubmit} className="h-fit w-full space-y-6">
      <h2 className="flex items-center gap-x-2 pb-4 text-center text-2xl font-semibold text-blue-500">
        <FIcon icon="user" />
        <span> Profile Info </span>
      </h2>

      <MuiTextField
        required={true}
        label="Name"
        {...formik.getFieldProps("name")}
        touched={formik.touched.name}
        error={formik.errors.name}
      />

      <MuiTextField
        required={true}
        label="Email"
        {...formik.getFieldProps("email")}
        touched={formik.touched.email}
        error={formik.errors.email}
      />

      <MuiTextField
        required={true}
        label="Phone"
        {...formik.getFieldProps("phone")}
        touched={formik.touched.phone}
        error={formik.errors.phone}
      />

      <div className="w-full sm:w-fit">
        <MuiButton loading={formik.isSubmitting} type="submit">
          Update
        </MuiButton>
      </div>
    </form>
  );
}
