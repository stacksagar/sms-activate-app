import FIcons, { Icon } from "../Icons/FIcons";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Size?: "lg" | "xl" | "2xl";
}

export default function SearchInput({ Size, ...props }: Props) {
  const [dynamicClasses, setDynamicClass] = useState<any>();

  useEffect(() => {
    setDynamicClass(
      classNames({
        "py-2.5": Size === "lg" || !Size,
        "py-3": Size === "xl",
        "py-4": Size === "2xl",
      })
    );
  }, [Size]);

  return (
    <div className="relative w-full">
      <label htmlFor="hs-table-with-pagination-search" className="sr-only">
        Search
      </label>
      <input
        {...props}
        type="text"
        name="hs-table-with-pagination-search"
        className={`pl-10 pr-2 border focus:ring-1 focus:outline-none block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${dynamicClasses} ${props.className}`}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
        <Icon I={FIcons.faSearch} />
      </div>
    </div>
  );
}
