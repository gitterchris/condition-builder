"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Select from "@/components/atomic/select";
import TextField from "@/components/atomic/input";
import * as Button from "@/components/atomic/button";
import Text from "@/components/atomic/text";
import useQuery from "@/components/hooks/query/use-query";
import useData from "@/components/hooks/data/use-data";
import type { Operators, QueriesTriple } from "@/utils/types";
import { operators, generateId } from "@/utils/queries";
import RectangularPlaceholder from "@/components/atomic/placeholder";

interface Props {
  condition: QueriesTriple;
  index: number;
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

const isValid = (
  operator: Operators | undefined,
  value: string | undefined
) => {
  if (operator === "Greater than" || operator === "Less than") {
    return !!value && !isNaN(+value);
  }
  return true;
};

const Condition = ({ condition, index }: Props) => {
  const { leftConditions } = useData();
  const [valueValidForOperator, setValueValidForOperator] =
    useState<boolean>(true);
  const [leftCondition, setLeftCondition] = useState<string>();
  const [operator, setOperator] = useState<Operators>();
  const [value, setValue] = useState<string>();
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  const {
    queries,
    ops: { add, update, deleteQuery },
  } = useQuery();
  const showOr = index !== 0;

  const keyAnd = condition[0];
  const keyOr = condition[1];

  useEffect(() => {
    const isCompleteCondition = leftCondition && operator && value;
    const isValueValidForTheOperator = isValid(operator, value);
    if (isCompleteCondition && isValueValidForTheOperator) {
      update(
        [keyAnd, keyOr, { condition: leftCondition, operator, value }],
        queries
      );
    }

    setValueValidForOperator(isValueValidForTheOperator);
  }, [
    leftCondition,
    operator,
    value,
    keyAnd,
    keyOr,
    update,
    setValueValidForOperator,
  ]);

  return (
    <>
      <Container>
        <ConditionsSection>
          {showOr && <Or variant="body1" text="OR" />}
          <Select
            id={`left-condition-${index}`}
            label="Left Condition"
            initialValue={condition[2].condition}
            menuItems={leftConditions}
            onSelection={(selectedCondition) =>
              setLeftCondition(selectedCondition)
            }
          />
          <Select
            id={`operator-${index}`}
            label="Operator"
            initialValue={condition[2].operator}
            menuItems={operators}
            onSelection={(selectedOperator) =>
              setOperator(selectedOperator as Operators)
            }
          />
          <TextField
            id={`value-${index}`}
            label="Value"
            onChange={(e) => setValue(e.target.value)}
            error={!valueValidForOperator}
            helperText={
              !valueValidForOperator
                ? "Must be numeric for Greater than or Less than operator."
                : ""
            }
          />
        </ConditionsSection>
        <Ctas>
          <Button.Icon
            type="add"
            onClick={() => {
              add(
                [
                  condition[0],
                  generateId("or"),
                  { condition: "", operator: "", value: "" },
                ],
                index + 1
              );
            }}
            onMouseOver={() => setShowPlaceholder(true)}
            onMouseOut={() => setShowPlaceholder(false)}
          />
          <Button.Icon type="delete" onClick={() => deleteQuery(condition)} />
        </Ctas>
      </Container>
      {showPlaceholder && <RectangularPlaceholder />}
    </>
  );
};

export default Condition;
