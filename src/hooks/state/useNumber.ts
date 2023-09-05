"use client";

import { useState } from "react";
import useBoolean from "./useBoolean";

export default function useNumber(defaultValue?: number) {
  const [value, setValue] = useState<number>(defaultValue || 0);
  const loading = useBoolean();

  return {
    value,
    set: setValue,
    reset: () => setValue(0),
    change: (e: any) => setValue(Number(e.target.value)),
    setCustom: (val?: number) => setValue(val || 0),
    loading,
  };
}

export type UseNumber = ReturnType<typeof useNumber>;
