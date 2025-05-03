// CartProductCard.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import CartProductCard from "./CartProductCard";
import { Provider } from "react-redux";
import { makeMockStore } from "@/test-utils"; // helper
import * as reduxHooks from "@/redux"; // to spy on dispatch

describe("CartProductCard", () => {
  it("shows product name and price", () => {
    const store = makeMockStore({
      cart: {
        products: {
          1: {
            product: {
              id: 1,
              title: "Mock Product",
              price: 19.99,
              image: "http://example.org/image.jpg",
              description: "...",
              origin: "Singapore",
              category: "Men's Clothing",
              rating: 4.5,
            },
            quantity: 2,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <CartProductCard productId={1} />
      </Provider>
    );

    expect(screen.getByText(/mock product/i)).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });
});

describe("CartProductCard", () => {
  it("shows correct quantity", () => {
    const store = makeMockStore({
      cart: {
        products: {
          1: {
            product: {
              id: 1,
              title: "Mock Product",
              price: 19.99,
              image: "http://example.org/image.jpg",
              description: "...",
              origin: "Singapore",
              category: "Men's Clothing",
              rating: 4.5,
            },
            quantity: 4,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <CartProductCard productId={1} />
      </Provider>
    );

    expect(screen.getByText("4")).toBeInTheDocument();
  });
});

describe("CartProductCard quantity updates", () => {
  it("dispatches updateQuantity when +/- button is clicked", () => {
    const store = makeMockStore({
      cart: {
        products: {
          1: {
            product: {
              id: 1,
              title: "Mock Product",
              price: 19.99,
              image: "http://example.org/image.jpg",
              description: "...",
              origin: "Singapore",
              category: "Men's Clothing",
              rating: 4.5,
            },
            quantity: 2,
          },
        },
      },
    });

    const dispatch = jest.fn();
    jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <CartProductCard productId={1} />
      </Provider>
    );

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: "cart/updateQuantity",
      payload: { id: 1, quantity: 3 },
    });

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: "cart/updateQuantity",
      payload: { id: 1, quantity: 1 },
    });
  });
});
