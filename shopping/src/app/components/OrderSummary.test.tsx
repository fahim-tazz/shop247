import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import { Provider } from "react-redux";
import { makeMockStore } from "@/test-utils";

describe("OrderSummary", () => {
  it("calculates and displays subtotal, GST, delivery fee, and total", () => {
    const initialState = {
      cart: {
        products: {
          1: {
            product: {
              id: 1,
              title: "Test Product",
              price: 100,
              description: "",
              category: "",
              image: "",
              rating: 4.5,
              origin: "Singapore",
            },
            quantity: 2,
          },
          2: {
            product: {
              id: 2,
              title: "Another Product",
              price: 50,
              description: "",
              category: "",
              image: "",
              rating: 4.0,
              origin: "Korea",
            },
            quantity: 1,
          },
        },
      },
    };

    const store = makeMockStore(initialState);
    render(
      <Provider store={store}>
        <OrderSummary />
      </Provider>
    );

    expect(screen.getByText("Subtotal:")).toBeInTheDocument();
    expect(screen.getByText("$250.00")).toBeInTheDocument(); // 100*2 + 50*1
    expect(screen.getByText("GST (9%):")).toBeInTheDocument();
    expect(screen.getByText("$22.50")).toBeInTheDocument(); // 9% of 250
    expect(screen.getByText("Delivery Fee:")).toBeInTheDocument();
    expect(screen.getByText("$2.99")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("$275.49")).toBeInTheDocument(); // 250 + 22.5 + 2.99
  });

  it("updates values when store changes", () => {
    const updatedState = {
      cart: {
        products: {
          1: {
            product: {
              id: 1,
              title: "Test Product",
              price: 100,
              description: "",
              category: "",
              image: "",
              rating: 4.5,
              origin: "Singapore",
            },
            quantity: 3, // changed from 2 to 3
          },
        },
      },
    };

    const store = makeMockStore(updatedState);
    render(
      <Provider store={store}>
        <OrderSummary />
      </Provider>
    );

    expect(screen.getByText("$300.00")).toBeInTheDocument(); // 100 * 3
    expect(screen.getByText("$27.00")).toBeInTheDocument(); // 9% of 300
    expect(screen.getByText("$2.99")).toBeInTheDocument();
    expect(screen.getByText("$329.99")).toBeInTheDocument(); // 300 + 27 + 2.99
  });
  it("shows zero values and no delivery fee when cart is empty", () => {
    const state = {
      cart: {
        products: {},
      },
    };

    const store = makeMockStore(state);
    render(
      <Provider store={store}>
        <OrderSummary />
      </Provider>
    );

    const allZeros = screen.getAllByText("$0.00");
    expect(allZeros).toHaveLength(4);
    expect(screen.queryByText("$2.99")).not.toBeInTheDocument();
  });
});
