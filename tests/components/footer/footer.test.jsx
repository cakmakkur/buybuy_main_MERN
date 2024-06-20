import { render, screen } from "@testing-library/react";
import Footer from "../../../src/components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect } from "vitest";

describe("Footer Suite", () => {
  beforeEach(() => {
    process.env.VITE_URL_ADMIN_PORTAL = "http://localhost:5170/";
  });

  // it("should render the footer component", () => {
  //   render(
  //     <Router>
  //       <Footer />
  //     </Router>
  //   );
  //   const adminLink = screen.getByText("Admin Portal");
  //   expect(adminLink).toBeInTheDocument();
  //   expect(adminLink.getAttribute("href")).toBe("http://localhost:5170/");
  // });

  it("should show social-links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const logos = screen.getAllByRole("img");
    expect(logos[0].src).toContain("assets");
    expect(logos[1].src).toContain("assets");
  });
});
