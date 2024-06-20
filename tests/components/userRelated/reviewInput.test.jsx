import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ReviewInput from "../../../src/components/UserRelated/ReviewInput";

const exampleProductId = "1";
const exampleUserId = "1111";
const mockSetReviewProductId = vi.fn();

const mockAxios = new MockAdapter(axios);

vi.mock("../../../src/utils/useAxiosPrivate", () => ({
  default: () => axios,
}));

vi.mock("../../../src/components/ProductsRelated/Star", () => ({
  __esModule: true,
  default: ({ color }) => (
    <div data-testid="star" data-color={color}>
      Star
    </div>
  ),
}));

const customRender = () =>
  render(
    <>
      <ReviewInput
        productId={exampleProductId}
        userId={exampleUserId}
        setReviewProductId={mockSetReviewProductId}
      />
    </>
  );

describe("Review Input Box Suite", () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    mockAxios.reset();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render review input box correctly", () => {
    customRender();
    const titleInput = screen.getByPlaceholderText("Add a title");
    expect(titleInput).toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: /send review/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should not submit if title or review is empty", async () => {
    customRender();
    const titleInput = screen.getByPlaceholderText("Add a title");
    await user.type(titleInput, "title");
    const submitButton = screen.getByRole("button", { name: /send review/i });
    await user.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });

  it("should submit review if the form filled correctly", async () => {
    mockAxios.onPost(`user_api/submit_rev/${exampleProductId}`).reply(200);

    customRender();
    const titleInput = screen.getByPlaceholderText("Add a title");
    await user.type(titleInput, "title");

    const reviewInput = screen.getByPlaceholderText("Add a review");
    await user.type(reviewInput, "review");

    const submitButton = screen.getByRole("button", { name: /send review/i });
    await user.click(submitButton);

    expect(mockSetReviewProductId).toHaveBeenCalledWith(null);
  });

  it("should show correct color of star on click", async () => {
    customRender();

    const star2 = screen.getAllByTestId("star")[1];
    const star3 = screen.getAllByTestId("star")[2];
    const star4 = screen.getAllByTestId("star")[3];

    await user.click(star3);

    expect(star2).not.toHaveAttribute("data-color", "gray");
    expect(star3).not.toHaveAttribute("data-color", "gray");
    expect(star4).toHaveAttribute("data-color", "gray");

    await user.click(star2);
    expect(star2).not.toHaveAttribute("data-color", "gray");
    expect(star3).toHaveAttribute("data-color", "gray");
  });
});
