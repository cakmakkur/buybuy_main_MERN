import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthContextProvider } from "../../../src/global_variables/AuthContext";
import { CartContextProvider } from "../../../src/global_variables/CartContext";
import { QueryContextProvider } from "../../../src/global_variables/QueryContext";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../../src/components/Menubar/Sidebar";

const customRender = () =>
  render(
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryContextProvider>
            <Sidebar />
          </QueryContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );

describe("Sidebar Suite", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render the sidebar", () => {
    customRender();
    const accountLink = screen.getByText(/account settings/i);
    expect(accountLink).toBeInTheDocument();
  });

  it("should toggle sidebar on click", async () => {
    customRender();
    const burgerButton = screen.getByTestId("burger-toggle");
    expect(burgerButton).toBeInTheDocument();
    // open sidebar
    await user.click(burgerButton);
    const xButton = screen.getByText("X");
    expect(xButton).toHaveClass("burger_x--opened");
    const mainSidebarDiv = screen.getByTestId("main-sidebar-div");
    expect(mainSidebarDiv).toHaveClass("sidebar_main_div--opened");
    // close sidebar
    await user.click(burgerButton);
    expect(mainSidebarDiv).not.toHaveClass("sidebar_main_div--opened");
    expect(xButton).not.toHaveClass("burger_x--opened");
  });
});
