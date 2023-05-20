import { useState } from "react";
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import MUISelect, { SelectChangeEvent } from "@mui/material/Select";

interface MenuItem {
  text: string;
  value: string;
}

interface Props {
  initialValue?: string;
  label: string;
  menuItems: Array<MenuItem>;
  onSelection: (a: string) => void;
}

const Select = ({
  initialValue = "",
  label,
  menuItems,
  onSelection,
}: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSelection(newValue);
  };

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id={label}>{label}</InputLabel>
      <MUISelect
        labelId={label}
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
