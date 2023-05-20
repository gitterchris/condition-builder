import { TextField } from "@mui/material";

interface Props {
  label: string;
  helperText?: string;
}

const TextInput = ({ label, helperText }: Props) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      label={label}
      helperText={helperText}
    />
  );
};

export default TextInput;
