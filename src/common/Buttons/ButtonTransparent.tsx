import classNames from "classnames";
import { useEffect, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const ButtonTransparent = ({ size, children, ...rest }: ButtonProps) => {
  const [dynamicClasses, setDynamicClass] = useState<any>();

  useEffect(() => {
    setDynamicClass(
      classNames({
        "px-2 py-1 text-xs": size === "xs",
        "px-2.5 py-1.5 text-xs": size === "sm",
        "px-3 py-2 text-xs ": size === "md",
        "px-4 py-2.5": size === "lg" || !size,
        "px-5 py-3": size === "xl",
      })
    );
  }, [size]);

  return (
    <button
      {...rest}
      type={rest.type || "button"}
      className={`hs-dropdown-toggle flex flex-shrink-0 justify-center items-center rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${dynamicClasses} ${rest.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonTransparent;
