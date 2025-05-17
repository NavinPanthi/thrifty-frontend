import { ChangeEvent, Dispatch, SetStateAction } from "react";

import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

import FilterDropDown from "../filter-dropdown";

import useGetCategoriesQuery from "@/services/category/use-get-categories";

interface ProductSearchInputType {
  selectedCondition: string[];
  selectedCategory: string[];
  search: string | undefined;
  setSelectedCondition: Dispatch<SetStateAction<string[]>>;
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}
export const conditions = [
  { id: "brand_new", name: "Brand New" },
  { id: "like_new", name: "Like New" },
  { id: "very_good", name: "Very Good" },
  { id: "good", name: "Good" },
  { id: "acceptable", name: "Acceptable" },
  { id: "damaged", name: "Damaged" },
];

const ProductSearchInput = ({
  selectedCondition,
  selectedCategory,
  search,
  setSelectedCondition,
  setSelectedCategory,
  setSearch,
}: ProductSearchInputType) => {
  const { data: categories } = useGetCategoriesQuery();

  const handleResetFiltersAndSearch = () => {
    setSelectedCondition([]);
    setSelectedCategory([]);
    setSearch("");
  };

  const hasDataInFilter =
    selectedCategory.length > 0 || selectedCondition.length > 0 || search;

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedCategory((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };
  const handleConditionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedCondition((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  return (
    <div className="flex items-center justify-between gap-1 rounded-xl bg-shade-light p-6 text-sm xl:text-base">
      <TextInput
        type="number"
        placeholder="Search Report ID"
        containerClassName=" xs:w-[10%] sm:w-[30%] xl:w-[40%] 2xl:w-[50%] semi-2xl:w-[60%]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2">
        <FilterDropDown
          selectedFilterData={selectedCondition}
          filterData={conditions}
          onChange={handleConditionChange}
          name="Site Engineer"
          className="!w-[150%]"
        />

        <FilterDropDown
          selectedFilterData={selectedCategory}
          filterData={categories}
          onChange={handleCategoryChange}
          name="Projects"
          className="!w-[200%]"
        />

        <Button
          onClick={handleResetFiltersAndSearch}
          disabled={!hasDataInFilter}
          variant={hasDataInFilter ? "danger-outline" : "tertiary"}
          className="border-neutral-500"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ProductSearchInput;
