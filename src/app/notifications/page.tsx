"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Button component
import { SlidersHorizontal } from "lucide-react"; // Filter icon
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card"; // Card components
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotificationTable from "@/components/NotificationTable"; // Import the new NotificationTable component

const Notifications: React.FC = () => {
  // Get notifications from the Redux store
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  // State to track read/unread status of notifications
  const [readNotifications, setReadNotifications] = useState<Set<number>>(new Set());

  const handleMarkAsRead = (index: number) => {
    const updatedReadNotifications = new Set(readNotifications);
    updatedReadNotifications.add(index); // Mark as read by adding index
    setReadNotifications(updatedReadNotifications);
  };

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 ml-72 mt-24 w-full relative  overflow-y-auto">
          {/* Single Card container for Notifications */}
          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <p className="text-sm text-gray-600">Manage your notifications</p>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 p-2 rounded-md"
                >
                  <SlidersHorizontal className="w-4 h-4" /> {/* Filter icon */}
                </Button>
              </div>

              {/* Shadcn Table for displaying notifications */}
              <NotificationTable
                notifications={notifications}
                readNotifications={readNotifications}
                handleMarkAsRead={handleMarkAsRead}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
