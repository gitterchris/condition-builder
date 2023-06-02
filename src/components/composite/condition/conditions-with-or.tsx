import type { QueriesType } from "@/utils/types";
import Condition from "./condition";
import styled from "@emotion/styled";

interface Props {
  orConditions: QueriesType;
}

const Container = styled.div({
  border: "1px solid #DCDCDC",
  borderRadius: "5px",
  boxShadow:
    "0px 1px 4px rgba(228, 230, 232, 0.6), 0px 6px 12px rgba(239, 243, 245, 0.48)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

/**
 * ConditionsWithOr represents the list of "OR" conditions in one "AND" box
 */
const ConditionsWithOr = ({ orConditions }: Props) => {
  return (
    <Container>
      {orConditions.map((orCondition, index) => (
        <Condition
          key={`${orCondition[0]}-${orCondition[1]}`}
          condition={orCondition}
          index={index}
        />
      ))}
    </Container>
  );
};

export default ConditionsWithOr;
