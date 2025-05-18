import { ChangeEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/header";
import OrderTable from "@/components/order/order-table";
import Pagination from "@/components/pagination";
import SelectInput from "@/components/ui/select";

import { orderStatusOptions } from "@/utils/filter-data";

import useGetSellerOrdersQuery from "@/services/seller/order/use-get-orders-seller-query";

const SellerOrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "20",
  });

  const [orderStatus, setOrderStatus] = useState<string | undefined>("");

  const { data: ordersData, isPending } = useGetSellerOrdersQuery({
    searchParams,
    orderStatus,
  });
  const handleOrderStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value);
  };
  const paginationInfo: IPagination = useMemo(
    () => ({
      totalItems: ordersData?.totalItems,
      pages: ordersData?.totalPages,
      size: ordersData?.limit,
      currPage: ordersData?.currPage,
      hasNext: ordersData?.hasNextPage,
    }),
    [ordersData]
  );
  if (isPending) {
    return <>Loading ...</>;
  }
  return (
    <>
      <Header title="Your Orders" description="Manage your orders" />
      <div className="relative my-4 gap-2">
        <SelectInput
          title="Order Status"
          value={orderStatus ?? ""}
          onChange={handleOrderStatusChange}
          options={orderStatusOptions}
          inputClassName="!w-full items"
          className="flex min-w-[140px] items-center gap-3 rounded-full border-2 border-core-primary"
        />
        <OrderTable ordersData={ordersData} />
      </div>
      <Pagination
        paginationInfo={paginationInfo}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export default SellerOrdersPage;
