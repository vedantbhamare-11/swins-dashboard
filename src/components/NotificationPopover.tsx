// components/NotificationPopover.tsx

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Assuming this is from SHADCN or similar library
import { Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Assuming Avatar is a component from your UI library
import { Separator } from "@/components/ui/separator"; // Assuming this is from your UI library or SHADCN

interface Notification {
  username: string;
  action: string;
  feedback: string;
  avatar: string;
}

interface NotificationPopoverProps {
  notifications: Notification[];
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({ notifications }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const truncateFeedback = (feedback: string) => {
    return feedback.length > 50 ? `${feedback.substring(0, 50)}...` : feedback;
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      {/* Popover Trigger */}
      <PopoverTrigger asChild>
        <button
          className="p-3 border rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={togglePopover}
        >
          <Bell className="text-gray-700" size={23} />
        </button>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent
        align="end"
        className="w-80 p-4 shadow-sm bg-white rounded-lg max-h-96 overflow-y-auto"
      >
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index}>
              {/* Notification Content */}
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={notification.avatar}
                    alt={notification.username}
                  />
                  <AvatarFallback>{notification.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    <span className="font-semibold">{notification.username}</span>{" "}
                    {notification.action}
                  </p>
                  {notification.feedback && (
                    <p className="text-sm text-gray-500 mt-1">
                      {truncateFeedback(notification.feedback)}
                    </p>
                  )}
                </div>
              </div>

              {/* Add separator between notifications */}
              {index < notifications.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
