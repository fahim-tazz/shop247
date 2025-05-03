"use client";
import React, { useState } from "react";
import CartIcon from "@/assets/cart.svg";
import SearchIcon from "@/assets/magnify.svg";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setLastSearchQuery } from "@/redux/filterSlice";

type Props = {};

export default function Header({}: Props) {
  const lastSearchQuery = useAppSelector(
    (state) => state.filters.lastSearchQuery
  );
  const [searchQuery, setSearchQuery] = useState(
    lastSearchQuery ? lastSearchQuery : ""
  );

  const dispatch = useAppDispatch();

  const handleKeyDowns = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      submitSearch();
    }
  };

  const submitSearch = () => {
    if (searchQuery && searchQuery.length > 0) {
      console.log("Query submitted " + searchQuery);
      dispatch(setLastSearchQuery(searchQuery));
    } else {
      console.log("Query is empty");
      dispatch(setLastSearchQuery(null));
    }
  };

  const router = useRouter();

  return (
    <div className="w-full border-b-[0.01rem] border-b-gray-300 shadow-sm flex flex-row justify-between items-center px-4 py-3 gap-8 bg-white">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex-[1]  h-full flex flex-row justify-center items-center text-2xl font-bold"
      >
        Shop.ping
      </div>
      <div className="flex-[7] border-[0.05rem] rounded-sm border-gray-400 h-full bg-white px-4 py-0 pr-0 flex flex-row justify-center items-center">
        <input
          className="flex-[1] focus:outline-none text-lg"
          type="text"
          placeholder="What would you like to buy?"
          onKeyDown={handleKeyDowns}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="cursor-pointer transition-all duration-200 active:scale-94 active:text-gray-700 text-gray-400 p-2"
          onClick={submitSearch}
        >
          <SearchIcon className="h-[1.5rem]" />
        </button>
      </div>
      <div className="flex-[2] h-full flex flex-row items-center justify-start pl-4">
        <CartIcon
          onClick={() => router.push("/cart")}
          className="h-[3.25rem] w-[3.25rem] text-gray-600 hover:bg-gray-200 transition-all duration-200 rounded-[50%] p-2 pr-0 pl-0 active:scale-95 active:text-gray-700"
        />
      </div>
    </div>
  );
}
