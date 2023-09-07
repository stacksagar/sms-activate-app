"use client";

import { useSetting } from "@/context/SettingProvider";
import SettingForm from "../SettingForm";

export default function FooterSetting() {
  const { setting } = useSetting();
  return (
    <SettingForm
      keyValue="footer"
      fields={{
        copyright: { type: "text", value: setting?.footer?.copyright },
      }}
    />
  );
}
