import React from "react";
import CategoricalFilter from "./CategoricalFilter";

type Props = {};

export default function FilterBar({}: Props) {
  return (
    <div className="flex-1 grid grid-cols-1 auto-rows-min py-2 px-2 border-r-[0px] border-r-gray-300">
      <CategoricalFilter title="Product Category" filterKey="category" />
      <CategoricalFilter title="Origin Country" filterKey="origin" />
    </div>
  );
}
