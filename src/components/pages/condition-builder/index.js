import styled from "@emotion/styled";
import Filters from "@/components/composite/condition/conditions-with-and";
import Text from "@/components/atomic/text";

const Container = styled.div({
  width: "100%",
  maxWidth: "768px",
  marginLeft: "auto",
  marginRight: "auto",
});

const headerStyles = {
  fontSize: "36px",
  fontWeight: 500,
  marginBottom: "20px",
};

const ConditionBuilder = () => {
  return (
    <Container>
      <Text variant="h1" text="Condition Builder" sx={headerStyles} />
      <Filters />
    </Container>
  );
};

export default ConditionBuilder;
