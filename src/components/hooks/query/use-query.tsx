import type { Operators } from "@/utils/queries";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useCallback,
} from "react";

interface Props {
  children: ReactNode;
}

export interface QueryType {
  condition: string;
  operator: Operators;
  value: string;
}

interface QueryContextOpsType {
  add: (newQuery: QueriesTriple, insertionIndex: number) => void;
  update: (updatedQuery: QueriesTriple) => void;
  deleteQuery: (query: QueriesTriple) => void;
}

interface QueryContextType {
  queries: QueriesType;
  ops: QueryContextOpsType;
}

/*
  Sample:
  [
    [ "and_1", "or_1", { condition: "name", operator: "Contain", value: "Alm" } ],
    [ "and_1", "or_2", { condition: "name", operator: "Contain", value: "Iron" } ],
    [ "and_2", "or_1", { condition: "name", operator: "Contain", value: "Alm" } ],
    [ "and_2", "or_2", { condition: "name", operator: "Contain", value: "Iron" }],
  ]
*/
export type QueriesTriple = [string, string, QueryType];
export type QueriesType = Array<[string, string, QueryType]>;

const mockQueries: QueriesType = [
  ["and_1", "or_1", { condition: "name", operator: "Contain", value: "Alm" }],
  ["and_1", "or_2", { condition: "name", operator: "Contain", value: "Iron" }],
  ["and_2", "or_1", { condition: "name", operator: "Contain", value: "Alm" }],
  ["and_2", "or_2", { condition: "name", operator: "Contain", value: "Iron" }],
];

const noop = () => {};

const QueryContext = createContext<QueryContextType>({
  queries: [],
  ops: { add: noop, update: noop, deleteQuery: noop },
});

export const QueryContextProvider = ({ children }: Props) => {
  const [queries, setQueries] = useState<QueriesType>([...mockQueries]);

  const update = useCallback(
    (updatedQuery: QueriesTriple) => {
      const newQueries = queries.map((query) => {
        const isSameQuery =
          updatedQuery[0] === query[0] && updatedQuery[1] && query[1];
        return isSameQuery ? updatedQuery : query;
      });
      setQueries(newQueries);
    },
    [queries]
  );

  const add = useCallback(
    (newQuery: QueriesTriple, insertionIndex: number) => {
      const newQueries = [
        ...queries.slice(0, insertionIndex),
        newQuery,
        ...queries.slice(insertionIndex),
      ];
      setQueries(newQueries);
    },
    [queries]
  );

  const deleteQuery = useCallback(
    (query: QueriesTriple) => {
      const newQueries = queries.filter((q) => {
        const isQueryToBeDeleted = query[0] === q[0] && query[1] === q[1];
        return !isQueryToBeDeleted;
      });
      setQueries(newQueries);
    },
    [queries]
  );

  return (
    <QueryContext.Provider
      value={{ queries, ops: { add, update, deleteQuery } }}
    >
      {children}
    </QueryContext.Provider>
  );
};

const useQuery = () => useContext(QueryContext);
export default useQuery;
