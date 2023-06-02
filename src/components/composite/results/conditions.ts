import { DataType, OpsMappingType } from "@/utils/types";

export const isEqual = (
  data: DataType,
  condition: string,
  // TODO: might want to check why types are failing if we have this string for some and number for others.
  value: string | number
) => data[condition] === value;

export const isGreaterThan = (
  data: DataType,
  condition: string,
  value: string | number
) => +data[condition] > +value;

export const isLessThan = (
  data: DataType,
  condition: string,
  value: string | number
) => +data[condition] < +value;

export const contains = (
  data: DataType,
  condition: string,
  value: string | number
) => (data[condition] as string).includes(value as string);

export const doesNotContain = (
  data: DataType,
  condition: string,
  value: string | number
) => !contains(data, condition, value);

export const match = (
  data: DataType,
  condition: string,
  value: string | number
) => !!(data[condition] as string).match(value as string);

export const opsMapping: OpsMappingType = {
  Equals: isEqual,
  "Greater than": isGreaterThan,
  "Less than": isLessThan,
  Contain: contains,
  "Not Contain": doesNotContain,
  Regex: match,
};
