export const isEqual = (
  data: Record<string, string>,
  condition: string,
  value: string | number
) => data[condition] === value;

export const isGreaterThan = (
  data: Record<string, number>,
  condition: string,
  value: number
) => data[condition] > value;

export const isLessThan = (
  data: Record<string, number>,
  condition: string,
  value: number
) => data[condition] < value;

export const contains = (
  data: Record<string, string>,
  condition: string,
  value: string
) => data[condition].includes(value);

export const doesNotContain = (
  data: Record<string, string>,
  condition: string,
  value: string
) => !contains(data, condition, value);

export const match = (
  data: Record<string, string>,
  condition: string,
  value: string
) => data[condition].match(value);

export const opsMapping = {
  Equals: isEqual,
  "Greater than": isGreaterThan,
  "Less than": isLessThan,
  Contain: contains,
  "Not Contain": doesNotContain,
  Regex: match,
  "": () => {}, // TODO
};
