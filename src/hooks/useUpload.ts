"use client";

import error_message from "@/lib/error_message";
import toast from "@/lib/toast";
import axios from "axios";
import { UseBoolean } from "./state/useBoolean";
import toast_async from "@/lib/toast_async";

export default function useUplaod() {
  return async (file: File, uploading: UseBoolean) => {
    if (!file) return;

    try {
      uploading.setTrue();
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await toast_async<any>(
        axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          start: "File uploading...",
          success: "File successfully uploaded!",
          error: "Upload failed, try later!",
        }
      );

      return data;
    } finally {
      uploading.setFalse();
    }
  };
}
