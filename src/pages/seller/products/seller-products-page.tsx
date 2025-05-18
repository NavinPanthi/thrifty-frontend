import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductSearchInput from "@/features/user/shop/product-search-input";
import Header from "@/components/header";
import ProductCard from "@/components/product/product-card";
import ProductSkeletonCard from "@/components/skeleton/product-skeleton";

import useGetSellerProductsQuery from "@/services/seller/product/use-get-all-products-seller-query";

const SellerProductsPage = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [searchParams] = useSearchParams({
    page: "1",
    size: "20",
  });
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [verified, setVerified] = useState<string | undefined | boolean>();
  const { data: productsData, isPending } = useGetSellerProductsQuery({
    selectedCondition,
    selectedCategory,
    search,
    searchParams,
    verified,
  });

  if (isPending) {
    return <ProductSkeletonCard />;
  }
  return (
    <>
      <Header title="Your Products" description="Manage your products" />
      <div className="relative mt-4 gap-2">
        <ProductSearchInput
          className="flex flex-col items-center justify-between gap-3 rounded-xl bg-shade-light p-6 text-sm md:flex-row md:gap-1 xl:text-base"
          selectedCondition={selectedCondition}
          selectedCategory={selectedCategory}
          search={search}
          setSelectedCondition={setSelectedCondition}
          setSelectedCategory={setSelectedCategory}
          setSearch={setSearch}
          verified={verified}
          setVerified={setVerified}
        />
        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsData?.items?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SellerProductsPage;
