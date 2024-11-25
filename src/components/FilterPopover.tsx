"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface FilterPopoverProps {
  labels: { label: string; name: string }[];
  filters: Record<string, boolean>;
  onFilterChange: (name: string) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  labels,
  filters,
  onFilterChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex w-10 items-center gap-2 p-2 rounded-md"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="w-56 p-4 shadow-lg bg-white rounded-lg"
      >
        <div className="space-y-3">
          {labels.map(({ label, name }, index) => (
            <React.Fragment key={name}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={name}
                  checked={filters[name]}
                  onCheckedChange={() => onFilterChange(name)}
                />
                <Label htmlFor={name} className="text-sm">
                  {label}
                </Label>
              </div>
              {index !== labels.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
