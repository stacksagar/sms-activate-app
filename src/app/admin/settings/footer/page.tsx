"use client";

import { useSetting } from "@/context/SettingProvider";
import SettingForm from "../SettingForm";

export default function FooterSetting() {
  const { setting } = useSetting();
  return (
    <SettingForm
      keyValue="footer"
      fields={{
        logo: { type: "text", value: setting?.footer?.logo },
        location: { type: "text", value: setting?.footer?.location },
        copyright: { type: "text", value: setting?.footer?.copyright },
      }}
    />
  );
}
