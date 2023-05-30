import styled from "@emotion/styled";
import Chip from "@/components/atomic/chip";

interface Props {
  totalCount: number;
  filterCount: number;
}

const Container = styled.div({
  display: "flex",
  gap: "10px",
});

const Chips = ({ totalCount, filterCount }: Props) => {
  return (
    <Container>
      <Chip text={`Total: ${totalCount}`} />
      <Chip text={`Filtered: ${filterCount}`} primary />
    </Container>
  );
};

export default Chips;
