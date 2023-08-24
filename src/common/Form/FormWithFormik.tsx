import { useFormik } from "formik";
import { Fragment } from "react";
import MuiTextField from "../MaterialUi/Forms/MuiTextField";
import Image from "next/image";
import MuiButton from "../MaterialUi/MuiButton";
import { Input } from "@mui/material";
import onChangeSetURL from "@/lib/onChangeSetURL";
import setFormikField from "@/lib/formik/setFormikField";
import useUplaod from "@/hooks/useUpload";
import useBoolean from "@/hooks/state/useBoolean";
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

  const upload = useUplaod();

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

  const uploading = useBoolean();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e?.target?.files) return;
    const file = e.target.files[0];
    const data = await upload(file, uploading);
    console.log("data ", data);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full space-y-6 capitalize"
      action="#"
    >
      {Object.entries(fields || {}).map(([key, obj]) =>
        obj.type === "text" ? (
          <MuiTextField
            key={key}
            label={splitKey(key)}
            {...formik.getFieldProps(key)}
          />
        ) : obj.type === "file" ? (
          <div key={key}>
            <MuiTextField
              label={splitKey(key)}
              {...formik.getFieldProps(key)}
            />
            <div className="my-1">
              <Input
                type="file"
                onChange={handleUpload}
                title={splitKey(key)}
              />
            </div>
            {formik.values[key] ? (
              <Image
                className="w-20 rounded pb-3"
                width={5}
                height={5}
                src={formik.values[key] || ""}
                alt=""
              />
            ) : null}
          </div>
        ) : obj.type === "textarea" ? (
          <textarea
            key={key}
            // label={splitKey(key)}
            placeholder={splitKey(key)}
            {...formik.getFieldProps(key)}
          />
        ) : (
          <Fragment key={key}></Fragment>
        )
      )}

      <div className="w-fit">
        <MuiButton type="submit" loading={submitting || formik.isSubmitting}>
          Update
        </MuiButton>
      </div>
    </form>
  );
}
