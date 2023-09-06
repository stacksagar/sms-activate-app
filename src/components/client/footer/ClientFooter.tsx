"use client";
import FIcon from "@/common/FIcon";
import TextLogo from "@/common/TextLogo";
import { useSetting } from "@/context/SettingProvider";
import Link from "next/link";
import React from "react";

export default function ClientFooter() {
  const { setting } = useSetting();
  return (
    <footer className="py-20 bg-white dark:bg-transparent dark:border-t dark:border-t-gray-600">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <TextLogo />

        <div className="flex items-center gap-2 xl:gap-6 text-lg flex-col md:flex-row">
          <a href={`mailto:${setting?.public?.email}`} className="flex gap-x-1">
            <span>
              <FIcon icon="envelope" />
            </span>
            Send us an e-mail
          </a>
          <a
            href={`https://t.me/${setting?.public?.telegram_phone}`}
            className="flex gap-x-1 items-center"
          >
            <FIcon icon="telegram" className="text-[#0088cc]" />
            Telegram
          </a>
        </div>
      </div>

      <div className="container py-8 border-t">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">
            {setting?.footer?.copyright}
          </span>

          <div className="flex items-center justify-center xl:justify-end flex-wrap gap-1 md:gap-2 xl:gap-5">
            <a
              href="/contact"
              className="hover:underline text-lg hover:text-blue-500"
            >
              Contact
            </a>
            <a
              href="/privacy-policy"
              className="hover:underline text-lg hover:text-blue-500"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="hover:underline text-lg hover:text-blue-500 "
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
