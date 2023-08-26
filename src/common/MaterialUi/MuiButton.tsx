import React from "react";
import { Button } from "@mui/material";
import CircleSpinner from "./CircleSpinner";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  size?: "medium" | "small" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
}

export default function MuiButton({
  children,
  loading,
  size,
  color,
  variant,
  ...buttonProps
}: Props) {
  return (
    <Button
      className="w-full"
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      disabled={loading}
      {...buttonProps}
    >
      <span></span>
      <span className="flex items-center gap-x-2 whitespace-nowrap group">
        {children}
      </span>
      {loading ? <CircleSpinner /> : <span> </span>}
    </Button>
  );
}
