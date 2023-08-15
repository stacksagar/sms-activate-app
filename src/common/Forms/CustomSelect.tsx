import { ReactNode, SelectHTMLAttributes } from "react";

interface propTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  custom_ref?: any;
}

export default function CustomSelect({
  children,
  custom_ref,
  ...others
}: propTypes) {
  return (
    <select 
    onChange={e=>e.target.value}
      ref={custom_ref}
      {...others}
      className={`h-10 px-3 block w-full ring-1 ring-gray-200 dark:ring-gray-600 border-r-8 border-r-transparent dark:border-r-transparent  rounded text-sm focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 focus:outline-none dark:bg-slate-900 dark:text-gray-400 ${others.className}`}
    >
      {children}
    </select>
  );
}
