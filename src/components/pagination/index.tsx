import { Dispatch, SetStateAction, useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import cn from "classnames";

import { scrollToTop } from "@/utils/scroll-to-top";

import SelectInput from "../ui/select";

interface Pagination {
  totalItems?: number;
  pages?: number;
  size?: number;
  currPage?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginationState {
  page: number;
  sizes: number;
}

type WithSearchParams = {
  paginationViaParams?: true;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  paginationState?: never;
  setPaginationState?: never;
};

// Props structure when pagination is managed using React state
type WithStatePagination = {
  paginationViaParams: false;
  paginationState: PaginationState;
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  searchParams?: never;
  setSearchParams?: never;
};

// Main props type: Either uses searchParams-based or state-based pagination
type PaginationProps = {
  className?: string;
  isScrollTopDisabled?: boolean;
  paginationInfo?: Pagination;
} & (WithSearchParams | WithStatePagination);

function Pagination(props: PaginationProps) {
  const {
    className,
    searchParams,
    setSearchParams,
    paginationInfo,
    isScrollTopDisabled = false,
    // if true then pagination is track by the search params
    paginationViaParams = true,
    // pagination is track by the state instead of the search params
    paginationState,
    setPaginationState,
  } = props;

  // pagination data from backend
  const totalPages = paginationInfo && paginationInfo?.pages;
  const totalItems = paginationInfo && paginationInfo.totalItems;
  const hasNext = paginationInfo && paginationInfo.hasNext;

  let currentPage;
  let size;

  if (paginationViaParams) {
    currentPage = parseInt(searchParams?.get("page") || "1");
    size = parseInt(searchParams?.get("size") || "20");
  } else {
    currentPage = paginationState?.page ?? 1;
    size = paginationState?.sizes ?? 20;
  }

  const searchQueryParams = new URLSearchParams(searchParams);

  useEffect(() => {
    if (isScrollTopDisabled) return;

    scrollToTop();
  }, [currentPage, size, isScrollTopDisabled]);

  // Handler for changing items per page (size)
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value) * 10;

    if (paginationViaParams) {
      searchQueryParams.set("page", "1");
      searchQueryParams.set("size", newLimit.toString());
      setSearchParams?.(searchQueryParams);
    } else {
      setPaginationState?.({ page: 1, sizes: newLimit });
    }
  };

  // Handler for changing current page
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = parseInt(e.target.value);

    if (paginationViaParams) {
      searchQueryParams.set("page", newPage.toString());
      setSearchParams?.(searchQueryParams);
    } else {
      setPaginationState?.((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Navigate to a specific page
  const goToPage = (page: number) => {
    if (paginationViaParams) {
      searchQueryParams.set("page", page.toString());
      setSearchParams?.(searchQueryParams);
    } else {
      setPaginationState?.((prev) => ({ ...prev, page }));
    }
  };

  // Generate size options (10, 20, 30, 40, 50)
  const limitOptions = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    value: String(idx + 1),
    name: `${(idx + 1) * 10}`,
  }));

  // Generate page options (1, 2, ..., totalPages)
  const pageOptions = Array.from({ length: Number(totalPages) }).map(
    (_, idx) => ({
      id: idx + 1,
      value: String(idx + 1),
      name: `${idx + 1}`,
    })
  );

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <p className="text-state-600 text-sm">Items per page : </p>

        <SelectInput
          value={size / 10}
          onChange={handleLimitChange}
          inputClassName="input w-[80px] cursor-pointer"
          options={limitOptions}
        />
        <p className="body-default-semibold text-neutral-800">
          {(currentPage - 1) * size + 1} -
          {hasNext
            ? currentPage * size
            : totalItems && Math.min(currentPage * size, totalItems)}{" "}
          of {totalItems} items
        </p>
      </div>

      <div className="flex items-center gap-4">
        <SelectInput
          value={currentPage}
          onChange={handlePageChange}
          inputClassName="input w-[80px] cursor-pointer"
          options={pageOptions}
        />

        <p className="text-state-600 text-sm"> of {totalPages} page</p>

        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn("rounded-full bg-neutral-100 p-2 text-center", {
              "cursor-not-allowed bg-neutral-100": currentPage === 1,
            })}
          >
            <ChevronLeftIcon
              className={cn("h-5 w-5", {
                "text-state-300": currentPage === 1,
              })}
            />
          </button>

          <button
            onClick={() => {
              goToPage(currentPage + 1);
            }}
            disabled={currentPage >= Number(totalPages)}
            className={cn("rounded-full bg-neutral-100 p-2 text-center", {
              "bg-neutral-100": currentPage >= Number(totalPages),
            })}
          >
            <ChevronRightIcon
              height={20}
              width={20}
              className={cn("", {
                "cursor-not-allowed bg-neutral-100":
                  currentPage >= Number(totalPages),
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
