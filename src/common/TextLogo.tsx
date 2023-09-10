import React from "react";
import FIcon from "./FIcon";

export default function TextLogo() {
  return (
    <div className="flex w-fit items-center justify-around gap-2 group">
      <div className="-rotate-12 group-hover:rotate-12 transition-all transform text-2xl text-purple-600 dark:text-white">
        <FIcon icon="mobile-screen" />
      </div>
      <div className="space-x-1 border-r-2 border-t-2 border-b-2 border-purple-600 py-1 pr-2 text-2xl font-bold tracking-wider dark:border-white">
        <span className="text-blue-600 dark:text-blue-300">YEN</span>
        <span className="text-purple-600 dark:text-white font-extrabold">
          SMS
        </span>
      </div>
    </div>
  );
}
