import { mockData } from "@/components/hooks/data/mock";
import { filterResult } from ".";
import { QueriesType } from "@/utils/types";

describe("filterResult", () => {
  it("filters results properly based on the operator selected", () => {
    let queries: QueriesType = [
      [
        "and_1",
        "or_1",
        { condition: "name", operator: "Equals", value: "Aachen" },
      ],
    ];

    expect(filterResult(mockData, queries)).toEqual([
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: { type: "Point", coordinates: [6.08333, 50.775] },
      },
    ]);

    queries = [
      [
        "and_1",
        "or_1",
        { condition: "id", operator: "Greater than", value: 57167 },
      ],
    ];

    expect(filterResult(mockData, queries)).toEqual([
      {
        name: "Boumdeid (2003)",
        id: "57168",
        nametype: "Valid",
        recclass: "L6",
        mass: "190",
        fall: "Fell",
        year: "2003-01-01T00:00:00.000",
        reclat: "17.710670",
        reclong: "-11.371500",
        geolocation: { type: "Point", coordinates: [-11.3715, 17.71067] },
      },
    ]);

    queries = [
      ["and_1", "or_1", { condition: "id", operator: "Less than", value: 2 }],
    ];

    expect(filterResult(mockData, queries)).toEqual([
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: { type: "Point", coordinates: [6.08333, 50.775] },
      },
    ]);

    queries = [
      [
        "and_1",
        "or_1",
        { condition: "name", operator: "Contain", value: "Aa" },
      ],
    ];

    expect(filterResult(mockData, queries)).toEqual([
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: { type: "Point", coordinates: [6.08333, 50.775] },
      },
      {
        name: "Aarhus",
        id: "2",
        nametype: "Valid",
        recclass: "H6",
        mass: "720",
        fall: "Fell",
        year: "1951-01-01T00:00:00.000",
        reclat: "56.183330",
        reclong: "10.233330",
        geolocation: { type: "Point", coordinates: [10.23333, 56.18333] },
      },
    ]);

    queries = [
      [
        "and_1",
        "or_1",
        { condition: "name", operator: "Not Contain", value: "Aa" },
      ],
    ];

    expect(filterResult(mockData, queries)).toHaveLength(998);

    queries = [
      ["and_1", "or_1", { condition: "name", operator: "Regex", value: "^Aa" }],
    ];

    expect(filterResult(mockData, queries)).toEqual([
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: { type: "Point", coordinates: [6.08333, 50.775] },
      },
      {
        name: "Aarhus",
        id: "2",
        nametype: "Valid",
        recclass: "H6",
        mass: "720",
        fall: "Fell",
        year: "1951-01-01T00:00:00.000",
        reclat: "56.183330",
        reclong: "10.233330",
        geolocation: { type: "Point", coordinates: [10.23333, 56.18333] },
      },
    ]);
  });
});
