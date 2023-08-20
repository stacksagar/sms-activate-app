export default function dynamic_filter<T>(
  arr: T[],
  keys?: string[],
  filterText?: string
) {
  return arr.filter((item: any) => {
    if (!keys || !filterText) return arr;

    for (const key of keys) {
      const value = item[key];
      if (
        value &&
        value
          ?.trim()
          ?.toLowerCase()
          ?.includes(filterText?.trim()?.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
}
