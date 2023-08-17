import React from "react";
import { Skeleton, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <div>
      <LinearProgress />
      <div className="space-y-3">
        <Skeleton variant="rectangular" height={80} />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" height={200} />
        </div>
      </div>
    </div>
  );
}
