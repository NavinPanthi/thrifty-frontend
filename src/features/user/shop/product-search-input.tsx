import { ChangeEvent, Dispatch, SetStateAction } from "react";

import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

import FilterDropDown from "../../../components/product/filter-dropdown";

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
  { id: "brand_new", title: "Brand New" },
  { id: "like_new", title: "Like New" },
  { id: "very_good", title: "Very Good" },
  { id: "good", title: "Good" },
  { id: "acceptable", title: "Acceptable" },
  { id: "damaged", title: "Damaged" },
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
    <div className="sticky top-28 flex flex-col items-center justify-between gap-3 rounded-xl bg-shade-light p-6 text-sm md:flex-row md:gap-1 xl:text-base">
      <TextInput
        type="number"
        placeholder="Search products"
        containerClassName=" xs:w-[10%] sm:w-[30%] xl:w-[40%] 2xl:w-[50%] semi-2xl:w-[60%] "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2">
        <FilterDropDown
          selectedFilterData={selectedCondition}
          filterData={conditions}
          onChange={handleConditionChange}
          name="Condition"
          className="!w-[150%]"
        />

        <FilterDropDown
          selectedFilterData={selectedCategory}
          filterData={categories}
          onChange={handleCategoryChange}
          name="Categories"
          className="!w-[150%]"
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
