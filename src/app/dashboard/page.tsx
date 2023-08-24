"use client";
import React from "react";
import ServiceLeftbar from "./ServiceLeftbar";
import ServiceRightbar from "./ServiceRightbar";

export default function Dashboard() {
  return (
    <div className="container py-20">
      <div className="lg:grid grid-cols-12 h-fit max-h-screen">
        <ServiceLeftbar />
        <ServiceRightbar />
      </div>
    </div>
  );
}
