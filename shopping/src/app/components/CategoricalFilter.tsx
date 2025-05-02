"use client";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setCategoryFilter, setOriginFilter } from "@/redux/filterSlice";
import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  filterKey: string;
};

export default function CategoricalFilter({ title, filterKey }: Props) {
  const dispatch = useAppDispatch();

  const attributes = useAppSelector((state) =>
    filterKey === "category" ? state.filters.category : state.filters.origin
  );

  const setAttributes = (updated: Record<string, boolean>) => {
    if (filterKey === "category") {
      dispatch(setCategoryFilter(updated));
    } else {
      dispatch(setOriginFilter(updated));
    }
  };
  return (
    <div className=" border-b-[1px] border-gray-400 flex flex-col py-3 px-2 gap-1">
      <h3 className="text-md text-gray-600 font-semibold">{title}</h3>
      <div className="grid grid-cols-1 px-1 gap-1.5">
        {Object.entries(attributes)
          .slice(0, 5)
          .map(([name, isChecked]) => (
            <div className="flex flex-row items-center" key={name}>
              <input
                className="mr-2 accent-orange-600 scale-120 outline-0"
                type="checkbox"
                checked={isChecked}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    [name]: e.target.checked,
                  })
                }
              />
              <label className="text-sm font-semibold text-gray-700 truncate">
                {name}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
