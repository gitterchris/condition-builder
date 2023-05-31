import { DateTime } from "luxon";
import { KeyValuePair } from "./types";

export const convertDates = (obj: KeyValuePair) => {
  const newObject = { ...obj };
  const keys = Object.keys(obj);

  for (let key of keys) {
    const value = newObject[key];
    if (typeof value === "string") {
      /*
        For some reason, DateTime.fromISO(10).isValid is true.
        So adding the value.length === 23.
      */
      const isValidDate =
        DateTime.fromISO(value).isValid && value.length === 23;
      if (!isValidDate) continue;
      newObject[key] = DateTime.fromISO(value).toHTTP();
    }
  }

  return newObject;
};
