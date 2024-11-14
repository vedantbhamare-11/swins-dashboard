"use client";

import * as React from "react";
import { DayPicker, CaptionProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i); // Generate 100 years before current year, inclusive of the current year
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={new Date(selectedYear, selectedMonth)}
      onMonthChange={(date) => {
        setSelectedMonth(date.getMonth());
        setSelectedYear(date.getFullYear());
      }}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between items-center pt-1 relative",
        caption_label: "flex items-center gap-2",
        nav: "hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      components={{
        Caption: (props: CaptionProps) => (
          <div className="flex items-center justify-between">
            <select
              value={props.displayMonth.getMonth()}
              onChange={handleMonthChange}
              className="rounded-md border-gray-300 text-sm h-8"
            >
              {months.map((month, index) => (
                <option key={month} value={index} className="text-sm">
                  {month}
                </option>
              ))}
            </select>
            <select
              value={props.displayMonth.getFullYear()}
              onChange={handleYearChange}
              className="rounded-md border-gray-300 text-sm h-8"
            >
              {years.map((year) => (
                <option key={year} value={year} className="text-sm h-20">
                  {year}
                </option>
              ))}
            </select>
          </div>
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
