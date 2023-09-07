import MuiSelect from "@/common/MaterialUi/Forms/MuiSelect";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiModal from "@/common/MaterialUi/Modal/MuiModal";
import MuiButton from "@/common/MaterialUi/MuiButton";
import { UseBoolean } from "@/hooks/state/useBoolean";
import error_message from "@/lib/error_message";
import toast from "@/lib/toast";
import { userActions } from "@/redux/features/users/usersSlice";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";

interface Props {
  open: UseBoolean;
  userId: string;
}

export default function EditUserModal({ open, userId }: Props) {
  const { data: users } = useReduxSelector((s) => s.users);
  const dispatch = useReduxDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      balance: 0,
    },

    onSubmit: async (values) => {
      formik.setSubmitting(true);
      console.log(values);
      try {
        const { data } = await axios.put<{ user: UserT }>(
          `/api/users?id=${userId}`,
          values
        );
        dispatch(userActions.updateUser(data.user));
      } catch (error) {
        toast({ message: error_message(error), type: "error" });
      } finally {
        formik.setSubmitting(false);
        open.setFalse();
      }
    },
  });

  useEffect(() => {
    const user = users.find((u) => u._id === userId);
    formik.setValues({
      name: user?.name || "",
      email: user?.email || "",
      balance: user?.balance || 0,
      role: user?.role || "",
    });
    console.log("useEffect: [userId, users]");
  }, [userId, users]);

  return (
    <MuiModal open={open}>
      <form onSubmit={formik.handleSubmit} className="space-y-6 ">
        <MuiTextField
          required={true}
          label="User Name"
          {...formik.getFieldProps("name")}
          touched={formik.touched.name}
          error={formik.errors.name}
        />

        <MuiTextField
          required={true}
          label="User Email"
          type="email"
          {...formik.getFieldProps("email")}
          touched={formik.touched.email}
          error={formik.errors.email}
        />

        <MuiTextField
          required={true}
          label="User Account Balance"
          type="number"
          {...formik.getFieldProps("balance")}
          touched={formik.touched.balance}
          error={formik.errors.balance}
        />

        <select
          title="Show Activations"
          {...formik.getFieldProps("role")}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex items-center justify-end w-fit ml-auto gap-2">
          <MuiButton color="error" onClick={open.setFalse}>
            Close
          </MuiButton>
          <MuiButton type="submit" disabled={formik.isSubmitting}>
            Submit
          </MuiButton>
        </div>
      </form>
    </MuiModal>
  );
}
