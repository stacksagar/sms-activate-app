"use client";

import { useState } from "react";
import useBoolean from "./useBoolean";

export default function useNumber(defaultValue?: number) {
  const [value, setValue] = useState<number>(defaultValue as number);
  const loading = useBoolean();

  return {
    value,
    set: setValue,
    reset: () => setValue(0),
    change: (e: any) => setValue(Number(e.target.value)),
    setCustom: (val?: number) => setValue(val as number),
    loading,
  };
}

export type UseNumber = ReturnType<typeof useNumber>;
