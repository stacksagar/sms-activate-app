import  { useState } from "react";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  handleToggleID?: any;
}

const Checkbox = ({ handleToggleID, ...all }: props) => {
  const [checked, setChecked] = useState(false);

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        all.onChange && all.onChange(e);
      }}
      {...all}
      className={`${
        checked || all.checked ? "ring-[1.4px] ring-offset-[1.5px]" : ""
      } focus:ring-1 focus:ring-offset-1 w-4 h-4  text-blue-600 ring-blue-600 bg-gray-200`}
    />
  );
};

export default Checkbox;
