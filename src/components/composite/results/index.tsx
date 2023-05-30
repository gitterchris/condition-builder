import type {
  QueriesType,
  DataType,
  DataTypes,
  QueryType,
  OperatorsWithoutEmpty,
  Operators,
} from "@/utils/types";
import useData from "@/components/hooks/data/use-data";
import useQuery from "@/components/hooks/query/use-query";
import { groupQueries } from "@/utils/queries";
import { useMemo, useState } from "react";
import { QueriesTriple } from "@/utils/types";
import { opsMapping } from "./conditions";
import orderBy from "lodash.orderby";

const isValidQuery = (
  condition: string,
  operator: Operators,
  value: string | number
) => condition && operator && value;

const test = (data: DataType, queriesTriple: QueriesTriple) => {
  const { condition, operator, value }: QueryType = queriesTriple[2];
  if (!isValidQuery(condition, operator, value)) return false;

  const operation = opsMapping[operator as OperatorsWithoutEmpty];
  return operation(data, condition, value);
};

// TODO: Add test
const filterResult = (data: DataTypes, queries: QueriesType) => {
  const groupedByAndQueries = groupQueries(queries);

  return data.filter((d) => {
    const AndConditions = groupedByAndQueries.values();

    for (let orConditions of [...AndConditions]) {
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
  const [sortBy, setSortBy] = useState("");
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
  const { data } = useData();
  const { queries } = useQuery();

  const result = useMemo(() => {
    console.log("FILTERING RESULT.....", data, queries);
    return filterResult(data, queries);
  }, [data, queries]);
  const sortedResult = useMemo(
    () => orderBy(result, sortBy, isSortedAsc),
    [result, sortBy, isSortedAsc]
  );
  console.log("RENDERING RESULT...", result);
  return (
    <>
      <h1>Result here</h1>
      <pre>
        <code>{JSON.stringify(sortedResult, null, 2)}</code>
      </pre>
    </>
  );
};

export default Result;
