import React from "react";

type Props = {
  shouldShow: boolean;
  text?: string;
};

export default function WarningText({ shouldShow, text }: Props) {
  if (!shouldShow) return null;

  return <p className="text-yellow-700"> {text || "Not Available!"} </p>;
}
