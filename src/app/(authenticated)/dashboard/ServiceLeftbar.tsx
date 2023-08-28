import React from "react";

import ServicesList from "./ServicesList";
import { Typography } from "@mui/material";
export default function ServiceLeftbar() {
  return (
    <div className="w-full lg:min-w-[350px] lg:max-w-[350px]  h-full p-6 dark:bg-gray-950 space-y-6 bg-white">
      <Typography variant="h5" gutterBottom>
        SMS Verifications
      </Typography>
      <p>
        Rent a phone for 5 minutes. Credits are only used if you receive the SMS
        code.
      </p>

      <ServicesList />
    </div>
  );
}
