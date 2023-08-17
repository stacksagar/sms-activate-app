import { useEffect, useState } from "react";

export default function useTracking() {
  const [values, setValues] = useState<Tracking[]>(["initial"]);

  const start = (should?: boolean) => {
    if (should && values.length === 1) setValues(["initial", "start"]);
  };

  const finish = (should?: boolean) => {
    if (should && values.length === 2)
      setValues(["initial", "start", "finished"]);
  };

  return {
    values,
    setValues,
    start,
    finish,
    reset: () => setValues(["initial"]),
    done: values.length === 3,
  };
}
