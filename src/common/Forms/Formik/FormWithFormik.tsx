import { useFormik } from "formik";

import Button from "../../Buttons/Button";
import FileInput from "../FileInput";
import FormikInput from "./FormikInput";
import FormikTextarea from "./FormikTextarea";
import { Fragment } from "react";
import onChangeSetURL from "@/utils/onChangeSetURL";
import setFormikField from "@/utils/formik/setFormikField";
import Image from "next/image";
interface MyFormikProps {
  fields?: {
    [key: string]: {
      value?: string;
      type: React.HTMLInputTypeAttribute | "textarea";
      optional?: boolean;
    };
  };

  onSubmit: any;
  submitting?: boolean;
}

export default function FormWithFormik({
  fields,
  onSubmit,
  submitting,
}: MyFormikProps) {
  const initialValues: any = {};
  Object.entries(fields || {}).map(([key, obj]) => {
    initialValues[key] = obj.value;
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  function splitKey(key: string) {
    return key.split("_").join(" ");
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full space-y-4 md:space-y-6 bg-white dark:bg-gray-800 dark:bg-opacity-50 p-5 shadow border dark:border-transparent"
      action="#"
    >
      {Object.entries(fields || {}).map(([key, obj]) =>
        obj.type === "text" ? (
          <FormikInput
            key={key}
            required={obj.optional ? false : true}
            label={splitKey(key)}
            placeholder={splitKey(key)}
            {...formik.getFieldProps(key)}
            touched={formik.touched[key]}
            error={formik.errors[key]}
          />
        ) : obj.type === "file" ? (
          <div key={key}>
            <FormikInput
              required={obj.optional ? false : true}
              label={splitKey(key)}
              placeholder={splitKey(key)}
              {...formik.getFieldProps(key)}
              touched={formik.touched[key]}
              error={formik.errors[key]}
            />
            <div className="my-1">
              <FileInput
                onChange={onChangeSetURL(setFormikField(formik, key))}
                title={splitKey(key)}
              />
            </div>

            <Image
              className="w-44 rounded pb-3"
              src={formik.values[key]}
              width={100}
              height={100}
              alt=""
            />
          </div>
        ) : obj.type === "textarea" ? (
          <FormikTextarea
            key={key}
            required={obj.optional ? false : true}
            label={splitKey(key)}
            placeholder={splitKey(key)}
            {...formik.getFieldProps(key)}
            touched={formik.touched[key]}
            error={formik.errors[key]}
          />
        ) : (
          <Fragment key={key}></Fragment>
        )
      )}

      <Button type="submit" loading={submitting || formik.isSubmitting}>
        Update
      </Button>
    </form>
  );
}
