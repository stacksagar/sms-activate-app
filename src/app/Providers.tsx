"use client";

import React from "react";
import redux_store from "@/redux/redux_store";
import { Provider as ReduxProvider } from "react-redux";
import ContextProvider from "@/context/ContextProvider";
import MaterialThemeProvider from "@/components/MaterialTheme/MaterialThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import ClientHeader from "@/components/client/header/ClientHeader";
import ClientFooter from "@/components/client/footer/ClientFooter";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const pathname = usePathname();
  function isAdmin() {
    return pathname?.toLowerCase()?.includes("admin");
  }

  return (
    <SessionProvider>
      <ContextProvider>
        <MaterialThemeProvider>
          <ReduxProvider store={redux_store}>
            <ToastContainer
              position="top-center"
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {isAdmin() ? <></> : <ClientHeader />}
            {children}
            {isAdmin() ? <></> : <ClientFooter />}
          </ReduxProvider>
        </MaterialThemeProvider>
      </ContextProvider>
    </SessionProvider>
  );
}
