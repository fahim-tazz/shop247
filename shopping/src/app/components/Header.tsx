"use client";
import React, { useState } from "react";
import CartIcon from "@/assets/cart.svg";
import SearchIcon from "@/assets/magnify.svg";
import { useRouter } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDowns = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      submitSearch();
    }
  };

  const submitSearch = () => {
    if (searchQuery.length > 0) {
      console.log("Query submitted " + searchQuery);
    } else {
      console.log("Query is empty");
    }
  };

  const router = useRouter();

  return (
    <div className="w-full h-full border-b-[0.5px] border-b-gray-300 shadow-sm flex flex-row justify-between items-center p-4 gap-8 bg-white">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex-[1] border-0 border-green-500 h-full flex flex-row justify-center items-center text-2xl font-bold"
      >
        Shop.ping
      </div>
      <div className="flex-[7] border rounded-sm border-gray-400 h-full bg-white p-4 pr-0 flex flex-row justify-center items-center">
        <input
          className="flex-[1] border-0 border-blue-700 focus:outline-none"
          type="text"
          placeholder="What would you like to buy?"
          onKeyDown={handleKeyDowns}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="cursor-pointer transition-all duration-200 active:scale-94 active:text-gray-700 text-gray-400 p-2"
          onClick={submitSearch}
        >
          <SearchIcon className="h-[32px]" />
        </button>
      </div>
      <div className="flex-[2] h-full flex flex-row items-center justify-start pl-4">
        <CartIcon className="h-[52px] w-[52px] text-gray-600 hover:bg-gray-200 transition-all duration-200 rounded-[50%] p-2 pr-0 pl-0 active:scale-95 active:text-gray-700" />
      </div>
    </div>
  );
}
