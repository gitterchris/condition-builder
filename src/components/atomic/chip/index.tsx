import { Chip as MuiChip } from "@mui/material";

interface Props {
  text: string;
  primary?: boolean;
}

const Chip = ({ text, primary }: Props) => {
  return <MuiChip label={text} color={primary ? "primary" : "default"} />;
};

export default Chip;
