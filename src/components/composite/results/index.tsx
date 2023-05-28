import type { QueriesType, DataType, QueryType } from "@/utils/types";
import useData from "@/components/hooks/data/use-data";
import useQuery from "@/components/hooks/query/use-query";
import { groupQueries } from "@/utils/queries";
import { useMemo } from "react";
import { QueriesTriple } from "@/utils/types";
import { opsMapping } from "./conditions";

const test = (
  data: Record<string, string> & Record<string, number>,
  queriesTriple: QueriesTriple
) => {
  // TODO: Return true for now while I check the type error.
  return true;
  // const { condition, operator, value }: QueryType = queriesTriple[2];

  // const operation = opsMapping[operator];
  // return operation(data, condition, value);
};

// TODO: Add test
const filterResult = (data: DataType, queries: QueriesType) => {
  const groupedByAndQueries = groupQueries(queries);

  return data.filter((d) => {
    const AndConditions = Object.values(groupedByAndQueries);

    for (let orConditions of AndConditions) {
      let isAllFalse = true;
      for (let condition of orConditions) {
        if (test(d, condition)) {
          isAllFalse = false;
          // No need to test the rest of the conditions since one true in an OR is true
          break;
        }
      }
      // One false in an AND will make the statement false;
      if (isAllFalse) return false;
    }
    return true;
  });
};

const Result = () => {
  const { data } = useData();
  const { queries } = useQuery();

  const result = useMemo(() => filterResult(data, queries), [data, queries]);

  return (
    <>
      <h1>Result here</h1>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </>
  );
};

export default Result;
