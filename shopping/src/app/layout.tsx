"use client";
import Header from "./components/Header";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="flex flex-col w-full h-[80px] bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} limit={1} />
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
