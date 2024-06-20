import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AuthContextProvider } from "../../../src/global_variables/AuthContext";
import { CartContextProvider } from "../../../src/global_variables/CartContext";
import { QueryContextProvider } from "../../../src/global_variables/QueryContext";
import { BrowserRouter as Router } from "react-router-dom";

import MenuDropdown from "../../../src/components/Menubar/MenuDropdown";
import Menubar from "../../../src/components/Menubar/Menubar";
import Language from "../../../src/components/Dropdown/Language";

const customRender = () =>
  render(
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryContextProvider>
            <Menubar>
              <MenuDropdown dropdownOpen={"language"}>
                <Language />
              </MenuDropdown>
            </Menubar>
          </QueryContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );

describe("Menu Dropdown Suite", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should close modal layer on click", async () => {
    customRender();
    const button = screen.getByRole("button", { name: /language/i });
    // open dropdown menu
    await userEvent.click(button);
    const modal = screen.getByTestId("dd-modal");
    expect(modal).toHaveClass("dropdown_modal--active");
    // close dropdown menu
    await userEvent.click(modal);
    expect(modal).not.toHaveClass("dropdown_modal--active");
  });
});
