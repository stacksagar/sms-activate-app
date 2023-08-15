"use client";
import FIcon from "@/common/FIcon";
import TextLogo from "@/common/TextLogo";
import Link from "next/link";
import React from "react";

export default function ClientFooter() {
  return (
    <footer className="py-20">
      <div className="container py-8 flex items-center justify-between ">
        <TextLogo />

        <div className="flex items-center gap-6 text-lg">
          <a href={`mailto:${"address"}`} className="flex gap-x-1">
            <span>
              <FIcon icon="envelope" />
            </span>
            Send us an e-mail
          </a>
          <a href={`mailto:${"address"}`} className="flex gap-x-1">
            <span>
              <FIcon icon="contact-book" />
            </span>
            If you need help, open a ticket
          </a>
        </div>
      </div>
      <div className="container py-8 border-t">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">
            ©YenSMS 2023 All Rights Reserved.
          </span>
          <div className="flex items-center justify-end gap-6">
            <Link
              href="/blog"
              className="hover:underline text-lg hover:text-blue-500 "
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:underline text-lg hover:text-blue-500"
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:underline text-lg hover:text-blue-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:underline text-lg hover:text-blue-500 "
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
