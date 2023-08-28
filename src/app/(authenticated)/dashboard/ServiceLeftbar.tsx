import React from "react";

import ServicesList from "./ServicesList";
import { Typography } from "@mui/material";
export default function ServiceLeftbar() {
  return (
    <div className="col-span-4 h-full p-8 dark:bg-gray-950 space-y-6 bg-white">
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
