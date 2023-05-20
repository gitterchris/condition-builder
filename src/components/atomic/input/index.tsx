import { ChangeEventHandler } from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  helperText?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const TextInput = ({ label, helperText, onChange }: Props) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      label={label}
      helperText={helperText}
      onChange={onChange}
    />
  );
};

export default TextInput;
