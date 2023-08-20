import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { uid } from "uid";

type Props = {
  count: number;
  height: number | string;
};
export default function ListSkeleton({ count, height }: Props) {
  return (
    <>
      {new Array(count).fill("").map(() => (
        <Skeleton key={uid()} height={height} width="100%" />
      ))}
    </>
  );
}
