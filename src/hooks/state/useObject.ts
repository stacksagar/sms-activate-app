import useBoolean from './useBoolean';
import { useState } from 'react';

const useObject = <T>(defaultData?: T) => {
  const [data, setData] = useState<T>(defaultData || ({} as T));
  const loading = useBoolean();

  return {
    data,
    set: setData,
    setCustom: (values: any) => setData(values as T),
    reset: () => setData({} as T),
    onChange: (e: any) =>
      setData((p) => ({ ...p, [e.target.id]: e.target.value })),
    loading,
  };
};

export type UseObject = ReturnType<typeof useObject>;

export default useObject;
