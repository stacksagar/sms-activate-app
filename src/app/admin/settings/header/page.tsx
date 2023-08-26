"use client";

import { useSetting } from "@/context/SettingProvider";
import SettingForm from "../SettingForm";

export default function HeaderSetting() {
  const { setting } = useSetting();

  return (
    <SettingForm
      keyValue="header"
      fields={{
        text_logo: { type: "text", value: setting?.header?.text_logo },
      }}
    />
  );
}
