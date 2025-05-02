import CategoricalFilter from "./components/CategoricalFilter";
import ProductCard from "./components/ProductCard";
import { Product } from "./types/product";

export default function Home() {
  const p1: Product = {
    name: "Iphone 14 Pro ",
    // name: "Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro",
    description: "Latest iphone by apple.",
    id: 0,
    price: 1400,
    image: "An image of iphone",
  };
  const p2: Product = {
    // name: "Iphone 14 Pro ",
    name: "Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro",
    description: "Latest iphone by apple.",
    id: 0,
    price: 1400,
    image: "An image of iphone",
  };

  return (
    <div className="flex-1 flex flex-row p-0 m-0 border-0 border-blue-800 py-0">
      <div className="flex-1 grid grid-cols-1 auto-rows-min py-2 px-2 border-r-[0px] border-r-gray-300">
        {/* <p>Categorical filter</p> */}
        <CategoricalFilter category="Product Category" />
        <CategoricalFilter category="Origin Country" />
      </div>
      <div className="flex-[5] grid [grid-template-columns:repeat(auto-fill,_minmax(180px,_1fr))] auto-rows-[280px] gap-y-4 pl-4 pr-0 py-4 border-0 border-red-700">
        <ProductCard product={p1}></ProductCard>
        <ProductCard product={p1}></ProductCard>
        <ProductCard product={p1}></ProductCard>
        <ProductCard product={p2}></ProductCard>
        <ProductCard product={p1}></ProductCard>
        <ProductCard product={p1}></ProductCard>
      </div>
    </div>
  );
}
