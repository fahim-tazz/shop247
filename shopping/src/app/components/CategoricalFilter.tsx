"use client";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setCategoryFilter, setOriginFilter } from "@/redux/filterSlice";
import React from "react";

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
    <div className=" border-b-[0.07rem] border-gray-400 flex flex-col py-5 px-2 gap-1">
      <h3 className="text-lg text-gray-600 font-semibold mb-[0.5rem]">
        {title}
      </h3>
      <div className="grid grid-cols-1 px-1 gap-2">
        {Object.entries(attributes)
          .slice(0, 5)
          .map(([name, isChecked]) => (
            <div className="flex items-center" key={name}>
              <input
                id={`filter-${filterKey}-${name}`}
                type="checkbox"
                className="peer hidden"
                checked={isChecked}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    [name]: e.target.checked,
                  })
                }
              />
              <label
                htmlFor={`filter-${filterKey}-${name}`}
                className="flex items-center bg-gray-200 gap-2 px-2 py-1 border-[0.06rem] border-gray-300 rounded-md text-md font-semibold text-gray-700 cursor-pointer peer-checked:bg-orange-100 peer-checked:border-orange-600"
              >
                <span className="truncate">{name}</span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
