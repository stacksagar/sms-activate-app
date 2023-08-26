"use client";

import { useSetting } from "@/context/SettingProvider";
import SettingForm from "../SettingForm";

export default function SeoSetting() {
  const { setting } = useSetting();

  return (
    <SettingForm
      keyValue="private"
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
