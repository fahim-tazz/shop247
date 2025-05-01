import CategoricalFilter from "./components/CategoricalFilter";
import ProductCard from "./components/ProductCard";
import { Product } from "./types/product";

export default function Home() {
  const p: Product = {
    name: "Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro",
    description: "Latest iphone by apple.",
    id: 0,
    price: 1400,
    image: "An image of iphone",
  };

  return (
    <div className="flex-1 flex flex-row p-0 m-0 border-0 border-blue-800 py-0 bg-gray-100">
      <div className="flex-1 grid grid-cols-1 auto-rows-min py-2 px-2 border-r-[0px] border-r-gray-300">
        {/* <p>Categorical filter</p> */}
        <CategoricalFilter category="Product Category" />
        <CategoricalFilter category="Origin Country" />
      </div>
      <div className="flex-[5] grid grid-cols-5 gap-y-4 pl-4 pr-0 py-4 border-0 border-red-700">
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
        <ProductCard product={p}></ProductCard>
      </div>
    </div>
  );
}
