import { convertDates } from "./data";

describe("utils/data", () => {
  it("converts all date string in an object", () => {
    const testObject = {
      name: "Limerick",
      id: "14652",
      nametype: "Valid",
      recclass: "H5",
      mass: "50000",
      fall: "Fell",
      year: "1813-01-01T00:00:00.000",
      reclat: "52.566670",
      reclong: "-8.783330",
      geolocation: { type: "Point", coordinates: [-8.78333, 52.56667] },
    };
    const expectedObject = {
      name: "Limerick",
      id: "14652",
      nametype: "Valid",
      recclass: "H5",
      mass: "50000",
      fall: "Fell",
      year: "Fri, 01 Jan 1813 15:56:00 GMT",
      reclat: "52.566670",
      reclong: "-8.783330",
      geolocation: { type: "Point", coordinates: [-8.78333, 52.56667] },
    };

    expect(convertDates(testObject)).toEqual(expectedObject);
  });
});
