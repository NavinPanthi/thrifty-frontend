import { enUS } from "date-fns/locale";
import { DateRangePicker, Range } from "react-date-range";

type CustomDateRangePickerType = {
  value: {
    startDate: Date;
    endDate: Date;
    key?: string;
  };
  onChange: (ranges: Range) => void;
};

function CustomDateRangePicker({ value, onChange }: CustomDateRangePickerType) {
  return (
    <DateRangePicker
      ranges={[value]}
      months={2}
      rangeColors={["#1890FF"]}
      direction="horizontal"
      className="w-full"
      locale={enUS}
      startDatePlaceholder="Start Date"
      endDatePlaceholder="End Date"
      showMonthAndYearPickers={true}
      staticRanges={[]}
      inputRanges={[]}
      dragSelectionEnabled={true}
      moveRangeOnFirstSelection={false}
      onChange={(ranges) => {
        onChange(ranges.selection);
      }}
    />
  );
}

export default CustomDateRangePicker;
