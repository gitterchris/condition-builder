import { IconButton } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { red, blue } from "@mui/material/colors";
import { MouseEventHandler } from "react";

interface Props {
  type: "delete" | "add";
  onClick: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: MouseEventHandler<HTMLButtonElement>;
}

const SupportedIcons = {
  delete: {
    Component: DeleteIcon,
    ariaLabel: "delete",
    color: red[500],
  },
  add: {
    Component: AddIcon,
    ariaLabel: "add",
    color: blue[500],
  },
};

const Icon = ({ type, onClick, onMouseOver, onMouseOut }: Props) => {
  const { Component, ariaLabel, color } = SupportedIcons[type];
  return (
    <IconButton
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Component sx={{ color }} />
    </IconButton>
  );
};

export default Icon;
