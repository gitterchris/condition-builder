"use client";

import Select from "@/components/atomic/select";
import TextField from "@/components/atomic/input";
import * as Button from "@/components/atomic/button";
import styled from "@emotion/styled";
import Text from "@/components/atomic/text";

interface LeftConditionType {
  text: string;
  value: string;
}

export type Operators =
  | "Equals"
  | "Greater than"
  | "Less than"
  | "Contain"
  | "Not Contain"
  | "Regex";

export interface OperatorType {
  text: Operators;
  value: Operators;
}

interface Props {
  leftConditions: Array<LeftConditionType>;
  operators: Array<OperatorType>;
  showOr?: boolean;
}

const Container = styled.div({
  display: "flex",
  gap: "10px",
});

const Ctas = styled.div({ display: "flex" });

const Or = styled(Text)({
  color: "blue",
  fontWeight: "bold",
  height: "40px",
  lineHeight: "40px",
  marginRight: "20px",
});

const noop = () => {};

// TODO:
// Replace noop with event handlers
// Update styling as needed
const Condition = ({ showOr = false, leftConditions, operators }: Props) => {
  return (
    <Container>
      {showOr && <Or variant="body1" text="OR" />}
      <Select
        label="Left Condition"
        menuItems={leftConditions}
        onSelection={noop}
      />
      <Select label="Operator" menuItems={operators} onSelection={noop} />
      <TextField label="Value" onChange={noop} />
      <Ctas>
        <Button.Icon type="add" onClick={noop} />
        <Button.Icon type="delete" onClick={noop} />
      </Ctas>
    </Container>
  );
};

export default Condition;
