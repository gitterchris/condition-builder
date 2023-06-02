import { render, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ConditionBuilder from ".";
import { mockData } from "../../hooks/data/mock";
import { DataContextProvider } from "../../hooks/data/use-data";
import { QueryContextProvider } from "../../hooks/query/use-query";

const server = setupServer(
  rest.get("https://data.nasa.gov/resource/y77d-th95.json", (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

beforeAll(async () => server.listen());
afterEach(async () => server.resetHandlers());
afterAll(async () => server.close());

describe("condition builder page", () => {
  it("tests loading and displaying of results", async () => {
    render(
      <DataContextProvider>
        <QueryContextProvider>
          <ConditionBuilder />
        </QueryContextProvider>
      </DataContextProvider>
    );

    expect(screen.queryByText("Result")).toBeNull();

    fireEvent.change(screen.getByLabelText("Url"), {
      target: { value: "https://data.nasa.gov/resource/y77d-th95.json" },
    });
    fireEvent.blur(screen.getByLabelText("Url"));

    expect(await screen.findByText("Result")).toBeVisible();
    expect(screen.getByText("Total: 1000")).toBeVisible();
    expect(screen.getByText("Filtered: 1000")).toBeVisible();

    // Test one query condition
    fireEvent.change(screen.getByTestId("left-condition-0"), {
      target: { value: "name" },
    });
    fireEvent.change(screen.getByTestId("operator-0"), {
      target: { value: "Equals" },
    });
    fireEvent.change(screen.getByTestId("value-0"), {
      target: { value: "Aachen" },
    });

    expect(screen.getByText("Filtered: 1")).toBeVisible();

    // Test adding and deleting OR conditions
    expect(screen.queryByTestId("left-condition-1")).toBeNull();
    fireEvent.click(screen.getAllByTestId("AddIcon")[0]);
    expect(await screen.findByTestId("left-condition-1")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("value-1"), {
      target: { value: "Aarhus" },
    });

    expect(screen.getByText("Filtered: 2")).toBeVisible();

    fireEvent.click(screen.getAllByTestId("DeleteIcon")[1]);
    expect(screen.queryByTestId("left-condition-1")).toBeNull();
    expect(screen.getByText("Filtered: 1")).toBeVisible();

    // Test adding AND conditions
    const addButton = screen.getAllByTestId("AddIcon")[1];
    fireEvent.click(addButton);
    expect(screen.getByText("Filtered: 1")).toBeVisible();

    fireEvent.change(screen.getAllByTestId("operator-0")[1], {
      target: { value: "Contains" },
    });
    fireEvent.change(screen.getAllByTestId("value-0")[1], {
      target: { value: "Aaron" },
    });

    expect(screen.getByText("Filtered: 0")).toBeVisible();
  });
});
