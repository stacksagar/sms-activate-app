import { useFormik } from "formik";
import MuiTextField from "../MaterialUi/Forms/MuiTextField";
import Image from "next/image";
import MuiButton from "../MaterialUi/MuiButton";
import { Input } from "@mui/material";
import { useEffect } from "react";

export interface FormWithFormikFields {
  [key: string]: {
    value?: string;
    type?: React.HTMLInputTypeAttribute | "textarea";
    optional?: boolean;
    CustomComponent?: ({
      setValue,
      value,
    }: {
      setValue: (v: any) => void;
      value: any;
    }) => React.ReactNode;
  };
}

interface MyFormikProps {
  fields?: FormWithFormikFields;
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
      className="w-full space-y-6 capitalize"
      action="#"
    >
      {Object.entries(fields || {}).map(([key, { type, CustomComponent }]) =>
        type === "text" ? (
          <MuiTextField
            key={key}
            label={splitKey(key)}
            {...formik.getFieldProps(key)}
          />
        ) : type === "file" ? (
          <div key={key}>
            <MuiTextField
              label={splitKey(key)}
              {...formik.getFieldProps(key)}
            />
            <div className="my-1">
              <Input type="file" title={splitKey(key)} />
            </div>
            {formik.values[key] ? (
              <Image
                className="w-20 rounded pb-3"
                width={5}
                height={5}
                src={formik.values[key] || "/"}
                alt=""
              />
            ) : null}
          </div>
        ) : type === "textarea" ? (
          <textarea
            key={key}
            placeholder={splitKey(key)}
            {...formik.getFieldProps(key)}
          />
        ) : CustomComponent ? (
          <CustomComponent
            key={key}
            value={formik.values[key] || null}
            setValue={(value) => formik.setFieldValue(key, value)}
          />
        ) : null
      )}

      <div className="w-fit">
        <MuiButton type="submit" loading={submitting || formik.isSubmitting}>
          Update
        </MuiButton>
      </div>
    </form>
  );
}
