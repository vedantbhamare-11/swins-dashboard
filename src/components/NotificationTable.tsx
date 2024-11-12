"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Button component
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Shadcn Table components

interface Notification {
  notification: string;
  brief: string;
  date: string;
  time: string;
}

interface NotificationTableProps {
  notifications: Notification[];
  readNotifications: Set<number>;
  handleMarkAsRead: (index: number) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  notifications,
  readNotifications,
  handleMarkAsRead,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Notification</TableHead>
          <TableHead>Brief</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications.map((notif, index) => (
          <TableRow
            key={index}
            className={readNotifications.has(index) ? "" : "bg-[#000000] bg-opacity-5"} // Add tint for unread notifications
          >
            <TableCell>{notif.notification}</TableCell>
            <TableCell>{notif.brief}</TableCell>
            <TableCell>{notif.date}</TableCell>
            <TableCell>{notif.time}</TableCell>
            <TableCell className="flex gap-2">
              {/* Conditionally render the 'Mark as Read' button */}
              <Button
                size="sm"
                variant="outline"
                className={`bg-[#D9FFCF] text-[#3EC91B] hover:bg-[#A3D6A1] hover:text-[#408230] text-[12px] transition-opacity duration-300 ease-in-out ${
                  readNotifications.has(index) ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleMarkAsRead(index)}
              >
                Mark as Read
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-[#FFD8D8] text-[#EF5050] hover:bg-[#F7B5B5] hover:text-[#933030] text-[12px]"
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NotificationTable;
