import React from "react";
import { Button } from "@mui/material";

type Props = {
  shouldHide?: boolean | string;
  fullLength: number;
  showLength: number;
  onMore: () => void;
  onLess: () => void;
};

export default function ShowAndLessButton({
  shouldHide,
  fullLength,
  showLength,
  onMore,
  onLess,
}: Props) {
  if (shouldHide) return null;

  return showLength >= fullLength ? (
    <Button className="w-full" color="warning" onClick={onLess}>
      Less more...
    </Button>
  ) : (
    <Button className="w-full" onClick={onMore} color="secondary">
      Show more...
    </Button>
  );
}
