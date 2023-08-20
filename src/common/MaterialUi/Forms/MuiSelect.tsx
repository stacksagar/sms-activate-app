import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { uid } from 'uid';

type Props = SelectProps & {
  options: { title: string; value: any }[];
};

export default function MuiSelect({ options, ...props }: Props) {
  return (
    <FormControl className="-z-0" fullWidth>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select label={props.label} labelId={props.id} {...props}>
        {options.map((option) => (
          <MenuItem key={uid()} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
