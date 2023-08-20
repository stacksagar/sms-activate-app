"use client";
import React from "react";
import ClientFooter from "@/components/client/footer/ClientFooter";
import ClientHeader from "@/components/client/header/ClientHeader";
import ServiceLeftbar from "./ServiceLeftbar";
import ServiceRightbar from "./ServiceRightbar";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();
  return (
    <>
      <ClientHeader />

      <div className="container py-20">
        <div className="lg:grid grid-cols-12 h-fit max-h-screen">
          <ServiceLeftbar />
          <ServiceRightbar />
        </div>
      </div>
      <ClientFooter />
    </>
  );
}
