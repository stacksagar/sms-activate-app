import "./globals.css";
import "react-responsive-pagination/themes/classic.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "./Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "YEN:SMS Verification",
  description: "Text Verification Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="cryptomus" content="e5aaf612" />

      <body
        className={
          roboto.className +
          " text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900"
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
