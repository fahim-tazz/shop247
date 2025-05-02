"use client";
import Header from "./components/Header";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="flex flex-col w-full h-[80px] bg-gray-100">
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
