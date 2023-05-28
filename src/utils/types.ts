// Common Types
export type Operators =
  | "Equals"
  | "Greater than"
  | "Less than"
  | "Contain"
  | "Not Contain"
  | "Regex"
  | "";

export interface OperatorType {
  text: Operators;
  value: Operators;
}

export interface QueryType {
  condition: string;
  operator: Operators;
  value: string;
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
export type QueriesType = Array<QueriesTriple>;

export interface LeftConditionType {
  text: string;
  value: string;
}

// TODO: further refine this type.
export type DataType = Array<Record<string, string | number>>;
