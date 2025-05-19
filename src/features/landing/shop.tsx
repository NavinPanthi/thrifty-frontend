import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "@/components/product/product-card";
import ProductSkeletonCard from "@/components/skeleton/product-skeleton";

import ProductSearchInput from "../user/shop/product-search-input";

import useGetUserProductsQuery from "@/services/user/products/use-get-products";

const UserProduct = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [searchParams] = useSearchParams({
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
  console.log(productsData, "de");
  if (isPending) {
    return <ProductSkeletonCard />;
  }
  return (
    <div className="relative gap-2 px-4 lg:px-28">
      <ProductSearchInput
        className="sticky top-28 flex flex-col items-center justify-between gap-3 rounded-xl bg-shade-light p-6 text-sm md:flex-row md:gap-1 xl:text-base"
        selectedCondition={selectedCondition}
        selectedCategory={selectedCategory}
        search={search}
        setSelectedCondition={setSelectedCondition}
        setSelectedCategory={setSelectedCategory}
        setSearch={setSearch}
      />
      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsData?.items?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      {productsData?.items.length === 0 ? (
        <p className="flex min-h-[50vh] items-center justify-center">
          No products found.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProduct;
