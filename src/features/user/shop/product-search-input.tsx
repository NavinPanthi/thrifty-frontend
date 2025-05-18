import { ChangeEvent } from "react";

import Button from "@/components/ui/button";
import SelectInput from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";

import { getUserData } from "@/utils/auth-storage";
import { checkAdmin } from "@/utils/check-admin";
import { checkSeller } from "@/utils/check-seller";
import { conditions, verifiedOptions } from "@/utils/filter-data";
import cn from "@/lib/classnames";

import FilterDropDown from "../../../components/product/filter-dropdown";

import { ProductSearchInputType } from "@/@types/props-types";

import useGetCategoriesQuery from "@/services/category/use-get-categories";

const ProductSearchInput = ({
  selectedCondition,
  selectedCategory,
  search,
  setSelectedCondition,
  setSelectedCategory,
  setSearch,
  className,
  verified,
  setVerified,
}: ProductSearchInputType) => {
  const { data: categories } = useGetCategoriesQuery();
  const userData = getUserData();
  const isShowVerification = checkAdmin(userData) || checkSeller(userData);

  const handleResetFiltersAndSearch = () => {
    setSelectedCondition([]);
    setSelectedCategory([]);
    setSearch("");
    setVerified(undefined);
  };

  const hasDataInFilter =
    selectedCategory.length > 0 ||
    selectedCondition.length > 0 ||
    search ||
    verified === false ||
    verified === true;

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
  const handleVerifiedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    if (val === "") {
      setVerified?.("");
    } else if (val === "true") {
      setVerified?.(true);
    } else if (val === "false") {
      setVerified?.(false);
    }
  };

  return (
    <div className={cn(className)}>
      <TextInput
        type="number"
        placeholder="Search products"
        containerClassName=" xs:w-[10%] sm:w-[30%] xl:w-[40%] 2xl:w-[50%] semi-2xl:w-[60%] "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2">
        {isShowVerification && (
          <SelectInput
            title="Verification"
            value={
              verified === true ? "true" : verified === false ? "false" : ""
            }
            onChange={handleVerifiedChange}
            options={verifiedOptions}
            inputClassName="!w-full items"
            className="flex min-w-[140px] items-center gap-3 rounded-full border-2 border-core-primary"
          />
        )}

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
