import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type FilterDropDownType = {
  name: string;
  selectedFilterData: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterData?: any;
  className?: string;
};

export interface ProductSearchInputType {
  selectedCondition: string[];
  selectedCategory: string[];
  search: string | undefined;
  setSelectedCondition: Dispatch<SetStateAction<string[]>>;
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  className: string;
  verified?: boolean | string;
  setVerified?: Dispatch<SetStateAction<boolean | undefined | "">>;
}
