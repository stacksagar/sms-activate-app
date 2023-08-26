"use client";

import FormWithFormik, {
  FormWithFormikFields,
} from "@/common/Form/FormWithFormik";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";
import toast_async from "@/lib/toast_async";
import axios from "axios";
import { Stack } from "@mui/material";
import ListSkeleton from "@/common/MaterialUi/Skeleton/ListSkeleton";

interface Props {
  fields?: FormWithFormikFields;
  keyValue: keyof SettingT;
}

export default function SettingForm({ fields, keyValue }: Props) {
  const { setSetting, fetched } = useSetting();
  const submitting = useBoolean();

  async function submit(values: object) {
    console.log("keyValue ", keyValue);
    const res = await toast_async<{ settings: SettingT }>(
      axios.put("/api/settings", { [keyValue]: values }),
      {
        success: "Setting updated!",
      }
    );
    res.data?.settings && setSetting(res.data?.settings);
    submitting.setFalse();
  }

  if (!fetched.true)
    return (
      <Stack spacing={1.5}>
        <ListSkeleton
          height={60}
          count={Object.keys(fields || {}).length || 5}
        />
        <div className="max-w-[150px]">
          <ListSkeleton height={55} count={1} />
        </div>
      </Stack>
    );

  return (
    <FormWithFormik
      onSubmit={submit}
      submitting={submitting.true}
      fields={fields}
    />
  );
}
