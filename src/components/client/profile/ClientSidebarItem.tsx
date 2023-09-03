"use client";
import FIcon from "@/common/FIcon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode | any;
  icon?: IconProp;
  title: string;
}

export default function ClientSidebarItem({ children, icon, title }: Props) {
  const pathname = usePathname();
  const buttonRef = useRef<any>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 2) return;

    const links: string[] =
      children?.length > 0
        ? children?.map((c: JSX.Element) => c.props.to)
        : [children.props.to];

    const curr = links.some((link) => link === pathname);
    if (curr) buttonRef.current.click();

    setCount((p) => p + 1);
  }, [count, children, pathname]);

  return (
    <li className="hs-accordion">
      <a
        ref={buttonRef}
        className="cursor-pointer hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-300 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
      >
        {icon ? <FIcon icon={icon} /> : null}
        {title}
        <div className="ml-auto flex items-center">
          <span className="hs-accordion-active:block hidden text-gray-600 group-hover:text-gray-500 dark:text-gray-400">
            <FIcon icon="chevron-up" />
          </span>

          <span className="hs-accordion-active:hidden block text-gray-600 group-hover:text-gray-500 dark:text-gray-400">
            <FIcon icon="chevron-down" />
          </span>
        </div>
      </a>

      <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
        <ul className="pt-2 pl-2">{children}</ul>
      </div>
    </li>
  );
}

export function ClientSidebarItemLink({
  to,
  text,
  icon,
}: {
  to: string;
  text: string;
  icon?: IconProp;
}) {
  const pathname = usePathname();

  return (
    <li>
      <a
        href={to}
        className={`${
          pathname === to
            ? "bg-blue-600 text-white"
            : "text-slate-700 dark:text-slate-300 hover:bg-gray-200 hover:dark:bg-gray-700"
        } flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md `}
      >
        <div className="flex items-center gap-4">
          {icon ? (
            <FIcon icon={icon} />
          ) : (
            <small className="text-xs">
              <FIcon icon="arrow-right" />
            </small>
          )}
          {text}
        </div>
      </a>
    </li>
  );
}
