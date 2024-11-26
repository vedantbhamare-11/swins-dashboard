"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, CircleUser, Settings, LogOut } from "lucide-react"; // Import required icons
import Logo from "@/app/assets/logo_light_theme.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import NotificationPopover from "./NotificationPopover";


const notifications = [
  {
    username: "Coding Company",
    action: "has been added",
    feedback: "",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    username: "Madras Branding Company",
    action: "has been added",
    feedback: "",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    username: "Anto",
    action: "reviewed Lokesh’s design",
    feedback: "Your design Space Harpoon is good.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    username: "Sam",
    action: "reviewed Rahul’s design",
    feedback: "Your design looks awesome.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    username: "Rahul",
    action: "reviewed Adhi’s Video Edit",
    feedback: "Nice work on the transitions, looks great!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const Header: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  return (
    <header className="flex items-end justify-between p-4 bg-white border-b">
      {/* Logo and Search Bar */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Image src={Logo} alt="Company Logo" width={150} height={50} />

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search..."
          className="w-60 p-2 border ml-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Right Side Icons and Admin Info */}
      <div className="flex items-center gap-4 mr-2">
        {/* Notification Bell Icon */}
        <NotificationPopover notifications={notifications} />


        {/* Avatar with Admin Info */}
        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild >
            <button
              onClick={togglePopover}
              className="flex items-center  border rounded-sm p-2 gap-2 shadow-sm focus:outline-none"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/100000000?v=4"
                  alt="User Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm font-semibold">TMBC HR Admin</div>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-2 shadow-lg bg-white rounded-lg">
            {/* Name and Email */}
            <div className="mb-">
              <h1 className="text-lg font-semibold">TMBC HR</h1>
              <p className="text-sm text-[#ABABAB]">hr@tmbc.in</p>
            </div>
            {/* Options */}
            <div className="space-y-2">
              <button className="flex items-center w-full p-2 text-sm font-medium  rounded-md hover:bg-gray-100">
                <CircleUser className="w-5 h-5 mr-2" />
                Profile
              </button>
              <button className="flex items-center w-full p-2 text-sm font-medium  rounded-md hover:bg-gray-100">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </button>
              <button className="flex items-center w-full p-2 text-sm font-medium  rounded-md hover:bg-gray-100">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
