"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import Select from "@/components/atomic/select";
import TextField from "@/components/atomic/input";
import * as Button from "@/components/atomic/button";
import Text from "@/components/atomic/text";
import useQuery from "@/components/hooks/query/use-query";
import useData from "@/components/hooks/data/use-data";
import type { Operators } from "@/utils/queries";
import { operators } from "@/utils/queries";

interface Props {
  keyAnd: string;
  showOr?: boolean;
}

const Container = styled.div({
  display: "flex",
  gap: "10px",
  maxWidth: "1024px",
});

const ConditionsSection = styled.div({
  display: "flex",
  gap: "12px",
  width: "90%",
  "& > div": {
    flexGrow: 1,
  },
});

const Ctas = styled.div({ display: "flex" });

const Or = styled(Text)({
  color: "blue",
  fontWeight: "bold",
  height: "40px",
  lineHeight: "40px",
  marginRight: "16px",
  marginLeft: "16px",
});

const noop = () => {};

// TODO:
// Replace noop with event handlers
// Update styling as needed
const Condition = ({ keyAnd, showOr = false }: Props) => {
  const { leftConditions } = useData();
  const [leftCondition, setLeftCondition] = useState<string>();
  const [operator, setOperator] = useState<Operators>();
  const [value, setValue] = useState<string>();
  const keyOr = useRef(`or_${uuidv4()}`);

  // TODO: leftConditions should be the same everytime.
  // So we can create a new context that retrieves this data from the API.
  // Then we can remove these two as a prop for this component.

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
      <ConditionsSection>
        {showOr && <Or variant="body1" text="OR" />}
        <Select
          label="Left Condition"
          menuItems={leftConditions}
          onSelection={(selectedCondition) =>
            setLeftCondition(selectedCondition)
          }
        />
        <Select
          label="Operator"
          menuItems={operators}
          onSelection={(selectedOperator) =>
            setOperator(selectedOperator as Operators)
          }
        />
        <TextField label="Value" onChange={(e) => setValue(e.target.value)} />
      </ConditionsSection>
      <Ctas>
        <Button.Icon type="add" onClick={noop} />
        <Button.Icon type="delete" onClick={noop} />
      </Ctas>
    </Container>
  );
};

export default Condition;
