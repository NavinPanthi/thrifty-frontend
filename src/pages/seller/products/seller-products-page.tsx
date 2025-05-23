import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RegisterProductDrawer from "@/features/seller/product/register-product-modal";
import ProductSearchInput from "@/features/user/shop/product-search-input";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import ProductTable from "@/components/product/product-table";
import ProductSkeletonCard from "@/components/skeleton/product-skeleton";

import useGetSellerProductsQuery from "@/services/seller/product/use-get-all-products-seller-query";

const SellerProductsPage = () => {
  const [search, setSearch] = useState<string | undefined>("");
  const [searchParams, setSearchParams] = useSearchParams({
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
  const paginationInfo: IPagination = useMemo(
    () => ({
      totalItems: productsData?.totalItems,
      pages: productsData?.totalPages,
      size: productsData?.limit,
      currPage: productsData?.currPage,
      hasNext: productsData?.hasNextPage,
    }),
    [productsData]
  );

  const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);
  if (isPending) {
    return <ProductSkeletonCard />;
  }
  return (
    <>
      <Header
        title="Your Products"
        description="Manage your products"
        ActionComponent=<p>Add Product</p>
        actionCallback={() => {
          setIsRegisterDrawerOpen(true);
        }}
      />
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
        <ProductTable productsData={productsData} />
        <Pagination
          paginationInfo={paginationInfo}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <RegisterProductDrawer
        isOpen={isRegisterDrawerOpen}
        toggleDrawer={() => setIsRegisterDrawerOpen(!isRegisterDrawerOpen)}
      />
    </>
  );
};

export default SellerProductsPage;
