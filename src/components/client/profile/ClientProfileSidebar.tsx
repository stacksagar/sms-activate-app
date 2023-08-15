"use client";
import { ClientSidebarItemLink } from "./ClientSidebarItem";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function ClientSidebar({ ...all }: Props) {
  return (
    <div
      {...all}
      className={`w-full hidden lg:block md:w-[280px] md:min-w-[200px] sticky top-32 left-0 ${all.className}`}
    >
      <div className="lg:w-full hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed lg:static top-0 left-0 bottom-0 z-[60] bg-white border-r border-gray-200  dark:border-gray-700 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800">
        <nav
          className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <ClientSidebarItemLink
              to="/profile"
              text="My Profile"
              icon="user-alt"
            />

            <ClientSidebarItemLink
              to="/my-orders"
              text="My Orders"
              icon="tasks"
            />

            <ClientSidebarItemLink
              to="/change-password"
              text="Change Password"
              icon="lock"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
