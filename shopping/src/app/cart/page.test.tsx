import React from "react";
import { render, screen } from "@testing-library/react";
import CartPage from "./page";
import { Provider } from "react-redux";
import { makeMockStore } from "@/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("CartPage", () => {
  it("renders empty cart message when cart is empty", () => {
    const store = makeMockStore({
      cart: { products: {} },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/No items in cart/i)).toBeInTheDocument();
  });

  it("renders cart items and order summary", () => {
    const store = makeMockStore({
      cart: {
        products: {
          2: {
            product: {
              id: 2,
              title: "Mens Casual Premium Slim Fit T-Shirts ",
              price: 22.3,
              description: "Some description",
              category: "Men's Clothing",
              image: "https://example.com/image.jpg",
              rating: 4.2,
              origin: "Singapore",
            },
            quantity: 2,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();

    // child elements render text as separate nodes, handled separately
    expect(
      screen.getByText((content, element) => element?.textContent === "$44.60")
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => element?.textContent === "$4.01")
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => element?.textContent === "$51.60")
    ).toBeInTheDocument();
  });
});
