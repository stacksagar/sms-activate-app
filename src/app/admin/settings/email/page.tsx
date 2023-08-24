"use client";

import FormWithFormik from "@/common/Form/FormWithFormik";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";

export default function SeoSetting() {
  const { setting } = useSetting();
  const submitting = useBoolean();

  function submit(values: object) {
    console.log("values ", values);
  }

  return (
    <FormWithFormik
      onSubmit={submit}
      submitting={submitting.true}
      fields={{
        smtp_host: { type: "text", value: setting?.private?.smtp_host },
        smtp_port: { type: "text", value: setting?.private?.smtp_port },
        smtp_user: { type: "text", value: setting?.private?.smtp_user },
        smtp_password: { type: "text", value: setting?.private?.smtp_password },
        smtp_from: { type: "text", value: setting?.private?.smtp_from },
      }}
    />
  );
}
