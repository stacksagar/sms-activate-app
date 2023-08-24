"use client";

import FormWithFormik from "@/common/Form/FormWithFormik";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";

export default function HeaderSetting() {
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
        site_title: {
          type: "text",
          value: setting?.public?.site_title,
        },

        favicon: {
          type: "text",
          value: setting?.public?.favicon,
        },

        currency: {
          type: "text",
          value: setting?.public?.currency,
        },
      }}
    />
  );
}
