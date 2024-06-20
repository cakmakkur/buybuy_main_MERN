import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "../../../src/global_variables/AuthContext";
import { CartContextProvider } from "../../../src/global_variables/CartContext";
import { QueryContextProvider } from "../../../src/global_variables/QueryContext";

import QueryResults from "../../../src/components/Menubar/QueryResults";
import Searchbar from "../../../src/components/Menubar/Searchbar";

const customRender = () =>
  render(
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryContextProvider>
            <Searchbar>
              <QueryResults />
            </Searchbar>
          </QueryContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );

describe("group", () => {
  it("should render searchbar", () => {
    customRender();
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  //mock fetch with one found product:
  beforeEach(() => {
    const mockData = [
      {
        id: "2fdaa6db-8bc7-4703-bc3c-59268b74e64f",
        name: "EchoLynx White x2",
        img_path: ["images-1711460049057.jpg", "images-1711460049069.jpg"],
        category: "guitars",
        tn_description: "New white 2",
        brand: "EchoLynx Crafters",
        color: "White",
        priceCents: "39900",
        prevPriceCents: null,
        shippingCostCents: "2500",
        inStock: true,
      },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
        blob: () =>
          Promise.resolve(
            new Blob(["fake image data"], { type: "image/jpeg" })
          ),
      })
    );
    global.URL.createObjectURL = vi.fn(() => "mock_blob_url");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render QueryResults with product data if query input is not empty", async () => {
    customRender();
    const formElement = screen.getByTestId("sb-input");
    expect(formElement).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, "Echo");
    await waitFor(
      () => {
        expect(screen.getByText("EchoLynx White x2")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    screen.debug();
  });

  it("should have a route to the product's page", async () => {
    customRender();
    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, "Echo");
    await waitFor(
      () => {
        expect(screen.getByText("EchoLynx White x2")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    const prodThumbnail = screen.getByRole("link");
    expect(prodThumbnail).toHaveAttribute(
      "href",
      "/product/2fdaa6db-8bc7-4703-bc3c-59268b74e64f"
    );
  });
});
