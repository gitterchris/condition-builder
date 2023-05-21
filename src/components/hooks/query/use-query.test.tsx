import { ANDConditionsType, QueryType, update, add } from "./use-query";
import cloneDeep from "lodash.clonedeep";

const queries: ANDConditionsType = {
  and_1: {
    or_1: {
      condition: "__name_1__",
      operator: "Contain",
      value: "__value_1__",
    },
    or_2: {
      condition: "__name_2__",
      operator: "Contain",
      value: "__value_2__",
    },
  },
  and_2: {
    or_1: {
      condition: "__name_3__",
      operator: "Contain",
      value: "__value_3__",
    },
    or_2: {
      condition: "__name_4__",
      operator: "Contain",
      value: "__value_4__",
    },
  },
};

describe("update()", () => {
  it("updates the old query", () => {
    const clonedQueries = cloneDeep(queries);
    const query: QueryType = {
      condition: "__name_3_updated__",
      operator: "Greater than",
      value: "__value_3_updated__",
    };

    update(query, clonedQueries["and_2"]["or_1"]);

    expect(clonedQueries["and_2"]["or_1"]).toEqual(query);
  });
});

describe("add()", () => {
  it("adds a new AND key if it does not exist", () => {
    const clonedQueries = cloneDeep(queries);
    const newQuery: QueryType = {
      condition: "__name_5__",
      operator: "Greater than",
      value: "__value_5__",
    };

    expect(Object.keys(clonedQueries)).toHaveLength(2);
    add(newQuery, clonedQueries, "and_3");
    expect(Object.keys(clonedQueries)).toHaveLength(3);
  });

  it("only adds a new OR key if the AND key already exists", () => {
    const clonedQueries = cloneDeep(queries);
    const newQuery: QueryType = {
      condition: "__name_5__",
      operator: "Greater than",
      value: "__value_5__",
    };

    expect(Object.keys(clonedQueries["and_2"])).toHaveLength(2);
    add(newQuery, clonedQueries, "and_2");
    expect(Object.keys(clonedQueries["and_2"])).toHaveLength(3);
  });
});
