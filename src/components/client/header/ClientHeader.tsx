"use client";

import Image from "next/image";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggler from "@/common/ThemeToggler";
import ButtonTransparent from "@/common/Buttons/ButtonTransparent";
import Button from "@/common/Buttons/Button";
import FIcon from "@/common/FIcon";
import Link from "next/link";
import TextLogo from "@/common/TextLogo";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Features", href: "#features" },
  { name: "How It Work", href: "#how-it-works" },
  { name: "F.A.Q", href: "#faq" },
  { name: "Pricing", href: "#pricing" },
];

export default function ClientHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="z-50 border-b dark:border-b-gray-600 py-2">
      <nav
        className="container flex items-center justify-between py-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <TextLogo />
          </Link>
        </div>

        <div className="flex lg:hidden items-center">
          <div className="flex items-center pr-5">
            <ThemeToggler />
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 items-center justify-end pr-10 w-full">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 "
            >
              {item.name}
            </a>
          ))}
          <ThemeToggler />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          <Link href="/signup" className="w-fit">
            <Button
              color="pink"
              className="hover:scale-105 transition-all hover:gap-x-4"
            >
              Signup
            </Button>
          </Link>

          <Link href="/signin" className="w-fit">
            <Button className="hover:scale-105 transition-all hover:gap-x-4">
              Signin
            </Button>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.svg" width={44} height={44} alt="logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
