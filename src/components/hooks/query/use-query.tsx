import type { QueryType, QueriesType, QueriesTriple } from "@/utils/types";
import { generateId } from "@/utils/queries";
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

interface QueryContextOpsType {
  add(newQuery: QueriesTriple, insertionIndex: number): void;
  update(updatedQuery: QueriesTriple, query: QueriesType): void;
  deleteQuery(query: QueriesTriple): void;
  addQuerySet(): void;
}

interface QueryContextType {
  queries: QueriesType;
  ops: QueryContextOpsType;
}

const defaultQueriesTriple: QueryType = {
  condition: "",
  operator: "",
  value: "",
};
const initialQuery: QueriesType = [
  ["and_1", "or_1", { ...defaultQueriesTriple }],
];
const noop = () => {};

const QueryContext = createContext<QueryContextType>({
  queries: [],
  ops: { add: noop, update: noop, deleteQuery: noop, addQuerySet: noop },
});

export const QueryContextProvider = ({ children }: Props) => {
  const [queries, setQueries] = useState<QueriesType>([...initialQuery]);

  const update = useCallback(
    (updatedQuery: QueriesTriple, queries: QueriesType) => {
      const newQueries = queries.map((query) => {
        const isSameQuery =
          updatedQuery[0] === query[0] && updatedQuery[1] && query[1];
        return isSameQuery ? updatedQuery : query;
      });
      setQueries(newQueries);
    },
    []
  );

  const add = (newQuery: QueriesTriple, insertionIndex: number) => {
    const newQueries = [
      ...queries.slice(0, insertionIndex),
      newQuery,
      ...queries.slice(insertionIndex),
    ];
    setQueries(newQueries);
  };

  const deleteQuery = (query: QueriesTriple) => {
    const newQueries = queries.filter((q) => {
      const isQueryToBeDeleted = query[0] === q[0] && query[1] === q[1];
      return !isQueryToBeDeleted;
    });
    setQueries(newQueries);
  };

  const addQuerySet = () => {
    const andKey = generateId("and");
    const orKey = generateId("or");
    const newQuery: QueriesTriple = [
      andKey,
      orKey,
      { ...defaultQueriesTriple },
    ];
    const newQueries = [...queries, newQuery];
    setQueries(newQueries);
  };

  return (
    <QueryContext.Provider
      value={{ queries, ops: { add, update, deleteQuery, addQuerySet } }}
    >
      {children}
    </QueryContext.Provider>
  );
};

const useQuery = () => useContext(QueryContext);
export default useQuery;
