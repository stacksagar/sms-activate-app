import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { uid } from "uid";
import { useEffect, useState } from "react";
import FIcon from "@/common/FIcon";
import Image from "next/image";

type Props = {
  label?: string;

  options: any[];
  titleKey: string;

  valueKey?: string;

  defaultValue?: any;
  defaultTitle?: any;
  onChange?: (value: any) => void;

  imageKey?: string;
};

export default function MuiSearchSelect({
  label,
  options: providedOptions,
  titleKey,
  valueKey,
  defaultValue: providedDefaultValue,
  defaultTitle,
  onChange,

  imageKey,
}: Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [defaultValue, setDefaultValue] = useState<any>(null);

  function handleChange(value: object | string | any) {
    if (!value || !onChange) return;
    if (typeof value === "object") {
      onChange(valueKey ? value[valueKey] : value);
    } else {
      onChange(value);
    }
  }

  useEffect(() => {
    // setOptions(providedOptions.map((op) => op[titleKey]));
    setOptions(providedOptions);
  }, [providedOptions, titleKey]);

  useEffect(() => {
    if (!providedDefaultValue || !providedDefaultValue[titleKey]) return;
    setDefaultValue(providedDefaultValue[titleKey]);
    setDefaultValue(providedDefaultValue);
  }, [providedDefaultValue, titleKey]);

  useEffect(() => {
    if (!defaultTitle) return;
    setDefaultValue(defaultTitle || null);
  }, [defaultTitle]);

  return (
    <ul className="w-full">
      <Autocomplete
        options={options}
        value={defaultValue}
        getOptionLabel={(option) => option[titleKey]}
        renderInput={(params) => (
          <TextField {...params} label={label || "Select"} margin="normal" />
        )}
        clearIcon={
          <li>
            <FIcon
              onClick={() => {
                setDefaultValue(null);
                onChange && onChange({});
              }}
              icon="times"
            />
          </li>
        }
        onChange={(_, val) => {
          handleChange(val);
        }}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option[titleKey], inputValue, {
            insideWords: true,
          });
          const parts = parse(option[titleKey], matches);

          return (
            <li {...props}>
              <div className="flex items-center gap-1">
                {imageKey ? (
                  <Image
                    width={30}
                    height={30}
                    alt=""
                    className="rounded w-8 h-auto"
                    src={option[imageKey] || "/"}
                  />
                ) : null}
                {parts.map((part: any) => (
                  <span
                    key={uid()}
                    className={`${
                      part.highlight ? "font-bold" : "font-normal"
                    }`}
                  >
                    {part?.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </ul>
  );
}
