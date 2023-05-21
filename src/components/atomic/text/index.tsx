import { Theme } from "@emotion/react";
import { SxProps, Typography } from "@mui/material";

interface Props {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "body1";
  text: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const Text = ({ variant, text, sx, className }: Props) => {
  return (
    <Typography variant={variant} sx={sx} className={className}>
      {text}
    </Typography>
  );
};

export default Text;
