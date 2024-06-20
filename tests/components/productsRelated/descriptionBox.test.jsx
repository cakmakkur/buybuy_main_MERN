import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import DescriptionBox from "../../../src/components/ProductsRelated/DescriptionBox";

const exProdId = "123456789";

describe("Description Box Suite", () => {
  it("should render the component correctly", async () => {
    global.fetch = vi.fn((url) =>
      Promise.resolve({
        text: () => Promise.resolve("<div>Injected Text</div>"),
      })
    );

    render(<DescriptionBox id={exProdId} />);

    await waitFor(() => {
      const textElement = screen.getByText("Injected Text");
      expect(textElement).toBeInTheDocument();
    });
  });
});
