import { useState } from "react";
import useBoolean from "./useBoolean";

const useArray = <T>(defaultData?: T[]) => {
  const [data, setData] = useState<T[]>(defaultData || []);
  const loading = useBoolean();

  return {
    data,
    reset: () => setData([]),
    set: (d: T[]) => setData(d),
    push: (d: T) => setData((prev) => [...prev, d]),
    loading,
  };
};

export default useArray;
