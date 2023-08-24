import React from "react";
import { Stack, Skeleton } from "@mui/material";
import { uid } from "uid";

type Props = {
  count: number;
  height: number | string;
  space?: number;
};
export default function ListSkeleton({ count, height, space }: Props) {
  return (
    <Stack spacing={space || 1}>
      {new Array(count).fill("").map(() => (
        <Skeleton variant="rounded" key={uid()} height={height} width="100%" />
      ))}
    </Stack>
  );
}
