import type { QueriesType, Operators, OperatorType } from "./types";
import { v4 as uuidv4 } from "uuid";

const ops: Array<Operators> = [
  "Equals",
  "Greater than",
  "Less than",
  "Contain",
  "Not Contain",
  "Regex",
];
export const operators: Array<OperatorType> = ops.map((o) => ({
  text: o,
  value: o,
}));

export const generateId = (type: "or" | "and") => {
  return `${type}_${uuidv4()}`;
};

export const groupQueries = (queries: QueriesType) => {
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
