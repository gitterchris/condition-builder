import { Button } from "@mui/material";
import { MouseEventHandler } from "react";
import { Add as AddIcon } from "@mui/icons-material";

interface Props {
  label: string;
  icon?: "add";
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const supportedIcons = {
  add: <AddIcon />,
};

const OutlinedButton = ({ label, icon, onClick }: Props) => {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={!!icon ? supportedIcons[icon] : null}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default OutlinedButton;
