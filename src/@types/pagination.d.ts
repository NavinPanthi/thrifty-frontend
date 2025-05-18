interface IPagination {
  totalItems?: number;
  pages?: number;
  limit?: number;
  currPage?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}
