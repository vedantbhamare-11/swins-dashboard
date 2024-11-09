// ./src/components/OrganizationActionsPopover.tsx
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ListCollapse, Eye, Pause, Trash2, MoreVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OrganizationActionsPopoverProps {
  onShowDetails: () => void;
  onPostPreference: () => void;
  onSuspend: () => void;
}

const OrganizationActionsPopover: React.FC<OrganizationActionsPopoverProps> = ({
  onShowDetails,
  onPostPreference,
  onSuspend,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <MoreVertical size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <button
          onClick={onShowDetails}
          className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md text-sm"
        >
          <ListCollapse size={16} />
          Show Details
        </button>
        <Separator className="my-2" />
        <button
          onClick={onPostPreference}
          className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md text-sm"
        >
          <Eye size={16} />
          Post Preference
        </button>
        <Separator className="my-2" />
        <button
          onClick={onSuspend}
          className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md text-sm"
        >
          <Pause size={16} />
          Suspend
        </button>
        <Separator className="my-2" />
        <button className="flex items-center gap-2 w-full p-2 text-[#EF5050] hover:bg-gray-100 rounded-md text-sm">
          <Trash2 size={16} />
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationActionsPopover;
