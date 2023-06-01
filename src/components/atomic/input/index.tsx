import { ChangeEventHandler, FocusEventHandler } from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  error?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const TextInput = ({
  label,
  error = false,
  helperText,
  onChange,
  onBlur,
}: Props) => {
  return (
    <TextField
      error={error}
      size="small"
      variant="outlined"
      label={label}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default TextInput;
