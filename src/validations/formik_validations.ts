import isValidEmail from "@/lib/regex/isValidEmail";

export function check_validate(
  errors: any,
  values: any,
  key?: string,
  custome_message?: string
) {
  if (!key) return;
  if (key?.toLowerCase().includes("email")) {
    if (!values[key]) {
      errors[key] = custome_message || "Email can't be empty!";
    } else if (isValidEmail(values[key])) {
      errors[key] = "Invalid Email";
    }
  } else {
    if (!values[key])
      errors[key] =
        custome_message || `${key?.split("_").join(" ")} is required!`;
  }
}

interface FieldProperties {
  message?: string;
  minLength?: number;
  maxLength?: number;
}

export function fields_required<Values>(
  array: (FieldProperties & { field: keyof Values }[]) | any[]
) {
  const errors: any = {};
  return (values: Values) => {
    array.map((item) => {
      const isObj = typeof item === "object";
      const key = isObj ? item?.field : item;
      check_validate(errors, values, key, isObj ? item.message : undefined);
    });
    return errors;
  };
}

export function all_fields_required(values: any) {
  const errors: any = {};
  Object.keys(values).map((key) => check_validate(errors, values, key));
  return errors;
}
