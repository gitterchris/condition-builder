import useQuery, { QueriesType } from "@/components/hooks/query/use-query";
import styled from "@emotion/styled";
import ConditionsWithOr from "./conditions-with-or";

const Container = styled.div({});

// TODO: Add test here.
const groupQueries = (queries: QueriesType) => {
  return queries.reduce((map, curr) => {
    const key = curr[0];
    if (!map.has(key)) {
      return map.set(key, [curr]);
    }

    const value = map.get(key);
    value.push(curr);
    return map;
  }, new Map());
};

// TODO: Add the And button and the AND separator
const ConditionsWithAnd = () => {
  const { queries } = useQuery();
  const groupedByAndQueries = groupQueries(queries);

  return (
    <Container>
      {[...groupedByAndQueries.values()].map((groupedQuery) => (
        <ConditionsWithOr key={groupedQuery[0]} orConditions={groupedQuery} />
      ))}
    </Container>
  );
};

export default ConditionsWithAnd;
