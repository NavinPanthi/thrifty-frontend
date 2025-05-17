import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductSkeletonCard from "@/components/skeleton/product-skeleton";

import ProductSearchInput from "../user/shop/product-search-input";

import useGetUserProductsQuery from "@/services/user/products/use-get-products";



const Shop = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "20",
  });
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const { data: productsData, isPending } = useGetUserProductsQuery({
    selectedCondition,
    selectedCategory,
    search,
    searchParams,
  });

  if (isPending) {
    return ProductSkeletonCard;
  }
  return (
    <div className="gap-2 px-4 lg:px-28">
      <div className="bg-shade-light">
        <ProductSearchInput
          selectedCondition={selectedCondition}
          selectedCategory={selectedCategory}
          search={search}
          setSelectedCondition={setSelectedCondition}
          setSelectedCategory={setSelectedCategory}
          setSearch={setSearch}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsData.map((item, index) => (
          <div>{item.description}</div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
