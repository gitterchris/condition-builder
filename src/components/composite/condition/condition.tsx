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
import RectangularPlaceholder from "@/components/atomic/placeholder";

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

const Condition = ({ keyAnd, showOr = false }: Props) => {
  const { leftConditions } = useData();
  const [leftCondition, setLeftCondition] = useState<string>();
  const [operator, setOperator] = useState<Operators>();
  const [value, setValue] = useState<string>();
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
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
    <>
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
          <Button.Icon
            type="add"
            onClick={noop}
            onMouseOver={() => setShowPlaceholder(true)}
            onMouseOut={() => setShowPlaceholder(false)}
          />
          <Button.Icon type="delete" onClick={noop} />
        </Ctas>
      </Container>
      {showPlaceholder && <RectangularPlaceholder />}
    </>
  );
};

export default Condition;
