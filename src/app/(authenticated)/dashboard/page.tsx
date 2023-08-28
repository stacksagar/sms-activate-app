"use client";
import React from "react";
import ServiceLeftbar from "./ServiceLeftbar";
import ServiceRightbar from "./ServiceRightbar";

export default function Dashboard() {
  return (
    <div className="container flex items-center py-20">
      <div className="lg:grid grid-cols-12 h-fit min-h-fit max-w-full gap-4">
        <ServiceLeftbar />
        <ServiceRightbar />
      </div>
    </div>
  );
}
