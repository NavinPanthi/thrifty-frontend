import { Fragment } from "react/jsx-runtime";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cn from "classnames";

import TextInput from "@/components/ui/text-input";

function FilterDropDown(props: any) {
  const { selectedFilterData, filterData, onChange, name, className } = props;
  console.log(filterData);
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="div"
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full border-2 border-core-primary px-4 py-[10px]",
          {
            "bg-core-primary-light":
              selectedFilterData && selectedFilterData.length > 0,
          }
        )}
      >
        <p className="body-large-semibold text-nowrap text-core-primary">
          {name}
        </p>

        {selectedFilterData && selectedFilterData.length > 0 && (
          <p className="body-small-medium flex h-6 w-6 items-center justify-center rounded-full bg-core-primary text-center text-white">
            {selectedFilterData.length}
          </p>
        )}

        <ChevronDownIcon
          className="shrink-0 text-core-primary"
          height={16}
          width={16}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute right-0 z-50 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black/5 focus:outline-none",
            className
          )}
        >
          <div className="bar flex max-h-[300px] select-none flex-col gap-3 overflow-y-auto px-4 py-2">
            {filterData?.map((item: any) => (
              <div className="body-large flex items-center gap-3" key={item.id}>
                <TextInput
                  checked={selectedFilterData.includes(String(item.id))}
                  onChange={onChange}
                  value={item.id}
                  type="checkbox"
                  inputClassName="cursor-pointer"
                />
                {item.title}
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default FilterDropDown;
