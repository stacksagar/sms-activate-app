"use client";

import Image from "next/image";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggler from "@/common/ThemeToggler";
import Link from "next/link";
import TextLogo from "@/common/TextLogo";
import HeaderAuth from "./HeaderAuth";
import HeaderUnAuth from "./HeaderUnAuth";
import { useSession } from "next-auth/react";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How It Work", href: "#how-it-works" },
  { name: "F.A.Q", href: "#faq" },
];

export default function ClientHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="z-50 border-b dark:border-b-gray-600">
      <nav
        className="h-[80px] container flex items-center justify-between"
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
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 "
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggler />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          {session?.user?.name ? <HeaderAuth /> : <HeaderUnAuth />}
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
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.svg" width={44} height={44} alt="logo" />
            </Link>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex items-center gap-2">
                {session?.user?.name ? <HeaderAuth /> : <HeaderUnAuth />}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
