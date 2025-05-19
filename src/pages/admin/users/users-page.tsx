import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import UsersTable from "@/features/admin/users/users-table";
import Header from "@/components/header";
import Pagination from "@/components/pagination";

import useGetAllUsersQuery from "@/services/admin/users/use-get-all-users-query";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "20",
  });

  const { data: usersData, isPending } = useGetAllUsersQuery({
    searchParams,
  });

  const paginationInfo: IPagination = useMemo(
    () => ({
      totalItems: usersData?.totalItems,
      pages: usersData?.totalPages,
      size: usersData?.limit,
      currPage: usersData?.currPage,
      hasNext: usersData?.hasNextPage,
    }),
    [usersData]
  );
  if (isPending) {
    return <>Loading ...</>;
  }
  return (
    <>
      <Header title="All users" className="my-6" description="" />
      <div className="relative my-4 gap-2">
        <UsersTable usersData={usersData} />
      </div>
      <Pagination
        paginationInfo={paginationInfo}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export default UsersPage;
