"use client";

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Select from "@/components/atomic/select";
import TextField from "@/components/atomic/input";
import * as Button from "@/components/atomic/button";
import Text from "@/components/atomic/text";
import type { Operators } from "@/utils/queries";
import useQuery from "@/components/hooks/query/use-query";
import { v4 as uuidv4 } from "uuid";

interface LeftConditionType {
  text: string;
  value: string;
}

export interface OperatorType {
  text: Operators;
  value: Operators;
}

interface Props {
  keyAnd: string;
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
const Condition = ({
  keyAnd,
  showOr = false,
  leftConditions,
  operators,
}: Props) => {
  const [leftCondition, setLeftCondition] = useState<string>();
  const [operator, setOperator] = useState<Operators>();
  const [value, setValue] = useState<string>();
  const keyOr = useRef(`or_${uuidv4()}`);

  const {
    ops: { upsertQuery },
  } = useQuery();

  useEffect(() => {
    const isCompleteCondition = leftCondition && operator && value;
    if (isCompleteCondition) {
      upsertQuery(keyAnd, keyOr, { condition: leftCondition, operator, value });
    }
  }, []);

  return (
    <Container>
      {showOr && <Or variant="body1" text="OR" />}
      <Select
        label="Left Condition"
        menuItems={leftConditions}
        onSelection={(selectedCondition) => setLeftCondition(selectedCondition)}
      />
      <Select
        label="Operator"
        menuItems={operators}
        onSelection={(selectedOperator) =>
          setOperator(selectedOperator as Operators)
        }
      />
      <TextField label="Value" onChange={(e) => setValue(e.target.value)} />
      <Ctas>
        <Button.Icon type="add" onClick={noop} />
        <Button.Icon type="delete" onClick={noop} />
      </Ctas>
    </Container>
  );
};

export default Condition;
