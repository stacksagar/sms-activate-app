"use client";

import React from "react";
import MuiTableHeadToolbar from "./MuiTableHeadToolbar";
import ListSkeleton from "../Skeleton/ListSkeleton";
import GridSkeleton from "../Skeleton/GridSkeleton";
import { Box, Paper } from "@mui/material";

interface Props {
  tableTitle: React.ReactNode | string;
}

export default function MuiTableSkeleton({ tableTitle }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <MuiTableHeadToolbar tableTitle={tableTitle} selected={[]} />
        <div className="space-y-2 p-2">
          <ListSkeleton height={80} count={1} />
          <GridSkeleton count={5} height={60} colSpans={[1, 7, 4]} />
          <ListSkeleton height={40} count={1} />
        </div>
      </Paper>
    </Box>
  );
}
