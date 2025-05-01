"use client";
import React, { useEffect, useState } from "react";

type Props = {
  category: string;
};

export default function CategoricalFilter({ category }: Props) {
  const [attributes, setAttributes] = useState<
    Record<
      "Kitchen" | "Furniture" | "Electronics" | "Car" | "Food" | "Toys",
      boolean
    >
  >({
    Kitchen: true,
    Furniture: true,
    Electronics: true,
    Car: true,
    Food: true,
    Toys: true,
  });

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  return (
    <div className=" border-b-[1px] border-gray-400 flex flex-col py-3 px-2 gap-1">
      <h3 className="text-md text-gray-600 font-semibold">{category}</h3>
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
                  setAttributes((prev) => ({
                    ...prev,
                    [name]: e.target.checked,
                  }))
                }
              />
              <label className="text-sm truncate">{name}</label>
            </div>
          ))}
      </div>
    </div>
  );
}
