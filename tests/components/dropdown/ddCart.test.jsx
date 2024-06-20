import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

import * as CartContextModule from "../../../src/global_variables/CartContext";
import { BrowserRouter as Router } from "react-router-dom";

import DdCart from "../../../src/components/Dropdown/DdCart";
import { calculateSubprice } from "../../../src/components/Dropdown/DdCart";

const mockCartItem = {
  id: "mockId",
  name: "Mock Product Name",
  quantity: 1,
  priceCents: 1000,
  shippingCostCents: 1000,
  tnUrl: "mock_url",
};
const mockSetCartItem = vi.fn();
const mockSetDropdownOpen = vi.fn();

describe("Dropdown_Cart Suite", () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  //EMPTY CART TESTS
  it("should render dd-cart (0 prod)", () => {
    vi.spyOn(CartContextModule, "useCartContext").mockReturnValue({
      cart: [],
      setCart: mockSetCartItem,
    });
    render(<DdCart setDropdownOpen={vi.fn()} />);
    const a = screen.getByText("Cart is empty");
    expect(a).toBeInTheDocument();
  });

  //NON-EMPTY CART TESTS
  beforeEach(() => {
    vi.spyOn(CartContextModule, "useCartContext").mockReturnValue({
      cart: [mockCartItem],
      setCart: mockSetCartItem,
    });
  });

  it("should render dd-cart (1 prod)", () => {
    render(<DdCart setDropdownOpen={vi.fn()} />, { wrapper: Router });
    const a = screen.getByText("Mock Product Name");
    expect(a).toBeInTheDocument();
  });

  it("should remove the product from the cart", async () => {
    render(<DdCart setDropdownOpen={vi.fn()} />, { wrapper: Router });

    const removeButton = screen.getByText("❌");
    expect(removeButton).toBeInTheDocument();
    await user.click(removeButton);
    expect(mockSetCartItem).toHaveBeenCalled();
    expect(mockSetCartItem).toHaveBeenCalledWith([]);
  });

  it("should close the dropdown menu on click", async () => {
    render(<DdCart setDropdownOpen={mockSetDropdownOpen} />, {
      wrapper: Router,
    });
    const viewCartButton = screen.getByText("View Cart");
    await user.click(viewCartButton);
    expect(mockSetDropdownOpen).toHaveBeenCalled();
    expect(mockSetDropdownOpen).toHaveBeenCalledWith("");
  });

  //THUMBNAILS

  beforeEach(() => {
    global.fetch = vi.fn((url) =>
      Promise.resolve({
        blob: () =>
          Promise.resolve(
            new Blob(["fake image data"], { type: "image/jpeg" })
          ),
      })
    );
  });

  it("should fetch thumbnail images if there is a blob url", async () => {
    global.URL.createObjectURL = vi.fn(() => "mock_blob_url");
    vi.spyOn(CartContextModule, "useCartContext").mockReturnValue({
      cart: [mockCartItem],
      setCart: vi.fn(),
    });
    render(<DdCart setDropdownOpen={vi.fn()} />, { wrapper: Router });
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      // expect(images).toHaveLength(1);
      expect(images[0].src).toContain("mock_blob_url");
    });

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_URL_FETCH_THUMBNAILS}/mockId`
    );
  });

  it("should display logo instead, if blob url doesn' exist", async () => {
    global.URL.createObjectURL = vi.fn(() => undefined);
    render(<DdCart setDropdownOpen={vi.fn()} />, { wrapper: Router });

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      // expect(images).toHaveLength(1);
      expect(images[0].src).toContain("logo");
    });
  });

  // CALCULATE SUB-PRICE
  describe("Calculate Sub-Price", () => {
    it("should return undefined if product price and quantity are not positive numbers", () => {
      expect(calculateSubprice(0, 0)).toBe(undefined);
      expect(calculateSubprice(0, "ab")).toBe(undefined);
      expect(calculateSubprice("str", "str")).toBe(undefined);
      expect(calculateSubprice("str", 0)).toBe(undefined);
      expect(calculateSubprice(-2, 3)).toBe(undefined);
      expect(calculateSubprice(2, -3)).toBe(undefined);
    });
    it("should return price with two digits after period", () => {
      expect(calculateSubprice(2000, 3)).toBe("60.00");
      expect(calculateSubprice(10000, 5)).toBe("500.00");
    });
  });
});
