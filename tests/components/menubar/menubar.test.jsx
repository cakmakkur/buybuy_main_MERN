import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";

import { AuthContextProvider } from "../../../src/global_variables/AuthContext";
import { CartContextProvider } from "../../../src/global_variables/CartContext";
import { QueryContextProvider } from "../../../src/global_variables/QueryContext";
import { BrowserRouter as Router } from "react-router-dom";

import Menubar from "../../../src/components/Menubar/Menubar";

const customRender = () =>
  render(
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryContextProvider>
            <Menubar />
          </QueryContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );

describe("Menubar Dropdown", () => {
  it("should render menubar", () => {
    customRender();
    const a = screen.getByRole("button", { name: "Cart" });
    expect(a).toBeInTheDocument();
    const b = screen.getByRole("heading", { name: "Buy-Buy" });
    expect(b).toBeInTheDocument();
  });

  it("should toggle dropdown 'language' on click", () => {
    customRender();
    const button = screen.getByRole("button", { name: /language/i });
    fireEvent.click(button);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("should toggle dropdown 'account' on click", () => {
    customRender();
    const button = screen.getByRole("button", { name: /account/i });
    fireEvent.click(button);
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("should toggle tooltip on mouseover", async () => {
    vi.useRealTimers();
    customRender();
    const languageButton = screen.getByRole("button", { name: /language/i });
    const accountButton = screen.getByRole("button", { name: /account/i });
    const cartButton = screen.getByRole("button", { name: /cart/i });

    // language button
    fireEvent.mouseOver(languageButton);
    await waitFor(
      () => {
        expect(screen.getByText("Language")).toHaveClass("tooltip_open");
      },
      { timeout: 1500 }
    );
    fireEvent.mouseOut(languageButton);
    expect(screen.getByText("Language")).not.toHaveClass("tooltip_open");

    // account button
    fireEvent.mouseOver(accountButton);
    await waitFor(
      () => {
        expect(screen.getByText("Account")).toHaveClass("tooltip_open");
      },
      { timeout: 1500 }
    );
    fireEvent.mouseOut(accountButton);
    expect(screen.getByText("Account")).not.toHaveClass("tooltip_open");

    // cart button
    fireEvent.mouseOver(cartButton);
    await waitFor(
      () => {
        expect(screen.getByText("Cart")).toHaveClass("tooltip_open");
      },
      { timeout: 1500 }
    );
    fireEvent.mouseOut(cartButton);
    expect(screen.getByText("Cart")).not.toHaveClass("tooltip_open");
  });
});
