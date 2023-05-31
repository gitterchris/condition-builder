import styled from "@emotion/styled";
import Filters from "@/components/composite/condition/conditions-with-and";
import Result from "@/components/composite/results";
import useData from "@/components/hooks/data/use-data";
import TextField from "@/components/atomic/input";
import Text from "@/components/atomic/text";

const Container = styled.div({
  width: "100%",
  maxWidth: "768px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const headerStyles = {
  fontSize: "36px",
  fontWeight: 500,
};

const ConditionBuilder = () => {
  const { setUrl, data } = useData();
  return (
    <Container>
      <Text variant="h1" text="Condition Builder" sx={headerStyles} />
      <TextField
        label="Url"
        helperText="Insert data url. Returning data MUST be an array json with each element is key/value pair."
        onBlur={(e) => setUrl(e.target.value)}
      />
      <Filters />
      {data?.length > 0 && <Result />}
    </Container>
  );
};

export default ConditionBuilder;
