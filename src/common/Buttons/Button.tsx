"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  selected?: boolean;
  color?:
    | "blue"
    | "gray"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "tear"
    | "black"
    | "cyan"
    | "sky"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "official-button-red"
    | "official-button-black"
    | "official-button-logo1"
    | "official-button-logo2"
    | "custom";
}

const Button = ({
  size,
  color,
  loading,
  selected,
  children,
  ...rest
}: ButtonProps) => {
  const [dynamicClasses, setDynamicClass] = useState<any>();

  useEffect(() => {
    setDynamicClass(
      classNames({
        "px-1 py-1 text-xs": size === "xs",
        "px-1 py-1.5 text-xs": size === "sm",
        "px-3 py-2 text-xs ": size === "md",
        "px-4 py-2.5": size === "lg" || !size,
        "px-5 py-3": size === "xl",
        " ": size === "custom",
        "hover:bg-blue-600 bg-blue-500 text-white": color === "blue" || !color,
        "hover:bg-gray-600 bg-gray-500 text-white": color === "gray",
        "hover:bg-red-600 bg-red-500 text-white": color === "red",
        "hover:bg-orange-600 bg-orange-500 text-white": color === "orange",
        "hover:bg-amber-600 bg-amber-500 text-white": color === "amber",
        "hover:bg-yellow-600 bg-yellow-500 text-white": color === "yellow",
        "hover:bg-lime-600 bg-lime-500 text-white": color === "lime",
        "hover:bg-green-500 bg-green-600 text-white": color === "green",
        "hover:bg-tear-600 bg-tear-500 text-white": color === "tear",
        "hover:bg-cyan-600 bg-cyan-500 text-white": color === "cyan",
        "hover:bg-sky-600 bg-sky-500 text-white": color === "sky",
        "bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 text-white":
          color === "indigo",
        "hover:bg-violet-600 bg-violet-500 text-white": color === "violet",
        "hover:bg-purple-600 bg-purple-500 text-white": color === "purple",
        "hover:bg-fuchsia-600 bg-fuchsia-500 text-white": color === "fuchsia",
        "hover:bg-pink-600 bg-pink-500 text-white": color === "pink",
        "hover:bg-rose-600 bg-rose-500 text-white": color === "rose",
        "bg-black text-white hover:bg-gray-900 focus:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:focus:bg-gray-200":
          color === "black",
        "": color === "custom",
        ring: selected,
      })
    );
  }, [size, color, selected]);

  return (
    <button
      {...rest}
      type={rest.type || "button"}
      disabled={loading}
      className={`w-full inline-flex justify-center items-center gap-2 rounded border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${dynamicClasses} ${rest.className}`}
    >
      <span></span>
      <span className="flex items-center gap-x-2 whitespace-nowrap group">
        {children}
      </span>

      {loading ? (
        <span className="block ml-2 sm:ml-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full animate-spin border-[3px] sm:border-4 border-r-transparent"></span>
      ) : (
        <span> </span>
      )}
    </button>
  );
};

export default Button;
