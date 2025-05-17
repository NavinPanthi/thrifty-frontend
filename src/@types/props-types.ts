import { ChangeEvent } from "react";

export type FilterDropDownType = {
  name: string;
  selectedFilterData: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterData?: any;
  className?: string;
};
