import { ChangeEventHandler, FocusEventHandler } from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  id?: string;
  error?: boolean;
  helperText?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const TextInput = ({
  label,
  id,
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
      inputProps={{ "data-testid": id }}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default TextInput;
