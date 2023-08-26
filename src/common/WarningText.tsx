import React from "react";

type Props = {
  shouldShow: boolean | string;
  text?: string;
  type?: "warning" | "error" | "success";
};

export default function WarningText({ shouldShow, text, type }: Props) {
  if (!shouldShow) return null;

  switch (type) {
    case "error":
      return (
        <p className="text-red-500 font-medium">
          {text || typeof shouldShow === "string"
            ? shouldShow
            : "Something wrong!"}
        </p>
      );

    case "success":
      return (
        <p className="text-green-600 font-medium">
          {text || typeof shouldShow === "string"
            ? shouldShow
            : "Operation successfull!"}
        </p>
      );

    default:
      <p className="text-yellow-700 font-medium">
        {text || typeof shouldShow === "string" ? shouldShow : "Not Available!"}
      </p>;
  }
}
