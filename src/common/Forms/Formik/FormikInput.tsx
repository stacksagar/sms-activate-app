"use client";
import FIcon from "@/common/FIcon";
import Input from "../Input";
import Label from "../Label";
import PasswordInput from "../PasswordInput";
import { useEffect, useState } from "react";

interface propTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: any;
  touched?: any;
}

export default function FormikInput({
  label,
  name,
  touched,
  error,
  required = true,
  type,
  ...rest
}: propTypes) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (error) {
      setCount(1);
    }
    if (count === 1 && !error) {
      setCount(2);
    }
  }, [error, count]);

  useEffect(() => {
    if (rest?.value && !error) setCount(2);
  }, [rest?.value, error]);

  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {label ? (
          <small className="px-1 text-yellow-500">
            {required ? "*" : "(optional)"}
          </small>
        ) : null}
      </Label>

      <div className="relative">
        {type === "password" ? (
          <PasswordInput
            required={true}
            name={name}
            id={name}
            {...rest}
            className={`        ${!error && "border-gray-300"}
          ${error && touched && "border-red-500"}
          ${count === 2 && "border-green-400"}`}
          />
        ) : (
          <Input
            required={required}
            name={name}
            id={name}
            type={type}
            className={`        ${!error && "border-gray-300"}
          ${error && touched && "border-red-500"}
          ${count === 2 && "border-green-400"}`}
            {...rest}
          />
        )}
        {count === 2 ? (
          <div className="absolute inset-y-0 my-auto flex items-center right-1.5 text-sm text-green-600">
            <FIcon icon="check-circle" />
          </div>
        ) : null}

        {error && touched ? (
          <div className="absolute inset-y-0 my-auto flex items-center right-1.5 text-sm text-red-500">
            <span className="animate-pulse">
              <FIcon icon="exclamation-circle" />
            </span>
          </div>
        ) : null}
      </div>

      {touched && error ? (
        <p className="flex items-center justify-start gap-x-1 pt-0.5">
          <span className="text-red-500 text-sm">
            <FIcon icon="exclamation-circle" />
          </span>
          <small className="text-red-500 font-medium tracking-tight">
            {error}
          </small>
        </p>
      ) : null}
    </div>
  );
}
