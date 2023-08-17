import { useState } from 'react';
import useBoolean from './useBoolean';

const useString = <T>(defaultValue?: T) => {
  const [value, setValue] = useState<T>(defaultValue || ('' as T));
  const loading = useBoolean();

  return {
    value,
    reset: () => setValue('' as T),
    change: (e: any) => setValue(e.target.value),
    setCustom: (val?: T) => setValue(val || ('' as T)),

    loading,
  };
};

export default useString;

export type UseString = ReturnType<typeof useString>;
