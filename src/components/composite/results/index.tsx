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
import Text from "@/components/atomic/text";
import Table from "@/components/atomic/table";
import Chips from "./chips";

const isValidQuery = (
  condition: string,
  operator: Operators,
  value: string | number
) => condition && operator && value;

const test = (data: DataType, queriesTriple: QueriesTriple) => {
  const { condition, operator, value }: QueryType = queriesTriple[2];
  if (!isValidQuery(condition, operator, value)) return true;

  const operation = opsMapping[operator as OperatorsWithoutEmpty];
  return operation(data, condition, value);
};

export const filterResult = (data: DataTypes, queries: QueriesType) => {
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
  const { data } = useData();
  const { queries } = useQuery();

  const result = useMemo(() => filterResult(data, queries), [data, queries]);
  const columns =
    (result?.[0] &&
      Object.keys(result[0]).map((key) => ({
        field: key,
        headerName: key,
      }))) ||
    [];
  return (
    <>
      <Text variant="h6" text="Result" />
      <Chips totalCount={data?.length} filterCount={result.length} />
      <Table columns={columns} rows={result} />
    </>
  );
};

export default Result;
