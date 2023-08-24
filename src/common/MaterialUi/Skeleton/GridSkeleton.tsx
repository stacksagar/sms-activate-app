import React from "react";
import { Stack, Skeleton } from "@mui/material";
import { uid } from "uid";

type Props = {
  count: number;
  height: number | string;
  colSpans?: number[];
  space?: number;
};
export default function GridSkeleton({
  count,
  height,
  space,
  colSpans,
}: Props) {
  return (
    <Stack spacing={space || 1}>
      {new Array(count).fill("").map(() => (
        <div key={uid()} className="grid grid-cols-12 gap-2">
          {colSpans?.map((spanValue) => (
            <Skeleton
              key={uid()}
              variant="rounded"
              className="col-span-1"
              style={{ gridColumn: `span ${spanValue} / span ${spanValue}` }}
              width="100%"
              height={height}
            />
          ))}
        </div>
      ))}
    </Stack>
  );
}
