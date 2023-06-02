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

export interface DataType {
  [key: string]: any;
}
export type DataTypes = DataType[];
export type OpFunctions = (
  data: DataType,
  condition: string,
  value: string | number
) => boolean;
export type OperatorsWithoutEmpty = Exclude<Operators, "">;
export type OpsMappingType = Record<OperatorsWithoutEmpty, OpFunctions>;

export interface KeyValuePair {
  [key: string]: string | number | object | null;
}
