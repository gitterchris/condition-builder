import useQuery from "@/components/hooks/query/use-query";
import styled from "@emotion/styled";
import ConditionsWithOr from "./conditions-with-or";
import * as Button from "@/components/atomic/button";
import VerticalDivider from "@/components/atomic/divider";
import { Fragment } from "react";
import Text from "@/components/atomic/text";
import { groupQueries } from "@/utils/queries";

const Container = styled.div({
  width: "100%",
  maxWidth: "768px",
  marginLeft: "auto",
  marginRight: "auto",
});

/**
 * ConditionsWithAnd represents the list of "AND" boxes.
 */
const ConditionsWithAnd = () => {
  const {
    queries,
    ops: { addQuerySet },
  } = useQuery();
  const groupedByAndQueries = groupQueries(queries);

  return (
    <Container>
      {[...groupedByAndQueries.values()].map((groupedQuery, index, arr) => (
        <Fragment key={groupedQuery[0]}>
          <ConditionsWithOr orConditions={groupedQuery} />
          {arr.length !== index + 1 ? (
            <VerticalDivider sx={{ height: "100px", width: "50px" }}>
              <Text variant="subtitle1" text="AND" />
            </VerticalDivider>
          ) : (
            <VerticalDivider
              sx={{
                height: "60px",
                width: "50px",
                "&>span": {
                  padding: 0,
                },
                "&::after": {
                  content: "none",
                },
              }}
            >
              <Button.Outlined label="AND" icon="add" onClick={addQuerySet} />
            </VerticalDivider>
          )}
        </Fragment>
      ))}
    </Container>
  );
};

export default ConditionsWithAnd;
