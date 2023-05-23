export type Operators =
  | "Equals"
  | "Greater than"
  | "Less than"
  | "Contain"
  | "Not Contain"
  | "Regex";

export interface OperatorType {
  text: Operators;
  value: Operators;
}

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

export interface LeftConditionType {
  text: string;
  value: string;
}
