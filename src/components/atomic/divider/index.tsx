import { Divider, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const VerticalDivider = ({ sx, children }: Props) => {
  return (
    <Divider orientation="vertical" textAlign="right" sx={sx}>
      {children}
    </Divider>
  );
};

export default VerticalDivider;
