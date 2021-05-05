import { getNodeText, render } from "@testing-library/react";
import { mockData, mockColumns } from "./mock";
import Table from "./index";

describe("data-table", () => {
  describe("sort", () => {
    test("should sort correctly when clicking headers", () => {
      const container = render(
        <Table title="Orders" data={mockData} columns={mockColumns} />
      );

      // Sort by Order Value
      container.getByText(/Order Value/i).click();

      const orderValueData = container
        .getAllByTestId("col-Order Value")
        .map((el) => +getNodeText(el).slice(1));

      expect(
        orderValueData.every((v, i, arr) => i === 0 || v >= arr[i - 1])
      ).toBe(true);
    });

    test("should switch sort direction when clicking header again", () => {
      const container = render(
        <Table title="Orders" data={mockData} columns={mockColumns} />
      );

      // Sort by Order Value
      container.getByText(/Order Value/i).click();

      container.getByText(/Order Value/i).click();

      const orderValueData = container
        .getAllByTestId("col-Order Value")
        .map((el) => +getNodeText(el).slice(1));

      expect(
        orderValueData.every((v, i, arr) => i === 0 || v <= arr[i - 1])
      ).toBe(true);
    });
  });
});
