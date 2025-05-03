"use client";
import Header from "./components/Header";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import CartHydrator from "./components/CartHydrator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="flex flex-col w-full bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <CartHydrator />
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
