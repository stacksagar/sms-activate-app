"use client";

import { useSetting } from "@/context/SettingProvider";
import SettingForm from "../SettingForm";

export default function SeoSetting() {
  const { setting } = useSetting();

  return (
    <SettingForm
      keyValue="seo"
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
