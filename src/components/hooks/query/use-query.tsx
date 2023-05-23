import type { Operators } from "@/utils/queries";
import { useState, createContext, ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: ReactNode;
}

export interface QueryType {
  condition: string;
  operator: Operators;
  value: string;
}

interface QueryContextOpsType {
  upsertQuery: Function;
}

interface QueryContextType {
  queries: ANDConditionsType;
  ops: QueryContextOpsType;
}

/*
  Sample:
  {
    and_1: {
      or_1: {
        condition: "name", operator: "Contain", value: "Alm"
      },
      or_2: {
        condition: "name", operator: "Contain", value: "Iron"
      }
    },
    and_2: {
      or_1: {
        condition: "name", operator: "Contain", value: "Alm"
      },
      or_2: {
        condition: "name", operator: "Contain", value: "Iron"
      }
    }
  }
*/
export type ORConditionsType = Record<string, QueryType>;
export type ANDConditionsType = Record<string, ORConditionsType>;

const QueryContext = createContext<QueryContextType>({
  queries: {},
  ops: { upsertQuery: () => {} },
});

export const update = (query: QueryType, oldQuery: QueryType) => {
  oldQuery.condition = query.condition;
  oldQuery.operator = query.operator;
  oldQuery.value = query.value;
};

export const add = (
  query: QueryType,
  queries: ANDConditionsType,
  keyAnd: string
) => {
  const hasAndLevelEntry = !!queries[keyAnd];
  if (!hasAndLevelEntry) {
    queries[keyAnd] = { [`or_${uuidv4()}`]: query };
    return;
  }

  queries[keyAnd] = {
    ...queries[keyAnd],
    [`or_${uuidv4()}`]: query,
  };
};

export const QueryContextProvider = ({ children }: Props) => {
  const [queries, setQueries] = useState<ANDConditionsType>({});

  // TODO: We can put these in useCallback.
  const upsertQuery = (keyAnd: string, keyOr: string, query: QueryType) => {
    const isExisting = !!(queries[keyAnd] && queries[keyAnd][keyOr]);

    isExisting
      ? update(query, queries[keyAnd][keyOr])
      : add(query, queries, keyAnd);
    setQueries(queries);
  };

  return (
    <QueryContext.Provider value={{ queries, ops: { upsertQuery } }}>
      {children}
    </QueryContext.Provider>
  );
};

const useQuery = () => useContext(QueryContext);
export default useQuery;
