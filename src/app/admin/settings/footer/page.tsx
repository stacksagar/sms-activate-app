"use client";

import FormWithFormik from "@/common/Form/FormWithFormik";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";

export default function FooterSetting() {
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
        logo: { type: "text", value: setting?.footer?.logo },
        location: { type: "text", value: setting?.footer?.location },
        copyright: { type: "text", value: setting?.footer?.copyright },
      }}
    />
  );
}
