import Button from "@/common/Buttons/Button";
import FormikInput from "@/common/Forms/Formik/FormikInput";
import React from "react";
import { ProfileLayout } from "../profile/page";

export default function ChangePassword() {
  return (
    <ProfileLayout>
      <form className="w-full p-6 bg-white dark:bg-gray-800 space-y-6">
        <FormikInput
          label="Old Password"
          type="password"
          placeholder="Old Password"
        />

        <FormikInput
          label="New Password"
          type="password"
          placeholder="Create New Password"
        />

        <FormikInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm New Password"
        />

        <div className="col-span-full w-fit">
          <Button type="submit" className="bg-blue-600 text-gray-100">
            Update Password
          </Button>
        </div>
      </form>
    </ProfileLayout>
  );
}
