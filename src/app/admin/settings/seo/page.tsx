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
        meta_keywords: { type: "text", value: setting?.seo?.meta_keywords },

        meta_description: {
          type: "text",
          value: setting?.seo?.meta_description,
        },
      }}
    />
  );
}
