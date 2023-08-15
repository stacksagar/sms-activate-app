import { useEffect, useState } from "react";
import Label from "../Label";
import Textarea from "../Textarea"; 
import FIcon from "@/common/FIcon";

interface propTypes extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: any;
  touched?: any;
}

export default function FormikTextarea({
  label,
  name,
  touched,
  error,
  required = true,
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

      <Textarea
        className={`  ${!error && "border-gray-300"}
      ${error && touched && "border-red-500"}
      ${count === 2 && "border-green-400"}`}
        required={required}
        name={name}
        id={name}
        {...rest}
      />

      {touched && error ? (
        <p className="flex items-center justify-start gap-x-1 pt-0.5 capitalize">
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
