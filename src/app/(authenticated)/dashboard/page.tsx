"use client";
import React from "react";
import ServiceLeftbar from "./ServiceLeftbar";
import ServiceRightbar from "./ServiceRightbar";

export default function Dashboard() {
  return (
    <div className="container flex items-center py-20">
      <div className="lg:grid grid-cols-12 h-fit max-h-screen max-w-full">
        <ServiceLeftbar />
        <ServiceRightbar />
      </div>
    </div>
  );
}