// ./src/components/Header.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react"; // Import bell icon
import Logo from "@/app/assets/logo_light_theme.png";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
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

      {/* Right Side Icons and Select Component */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Icon in a Card/Box */}
        <div className="p-2 border rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
          <Bell className="text-gray-700" size={20} />
        </div>

        {/* Avatar and Select Component */}
        <Select>
          <SelectTrigger className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/100000000?v=4"
                alt="User Avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <SelectValue placeholder="TMBC HR Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ABC Solutions HR Admin">
              ABC Solutions HR Admin
            </SelectItem>
            <SelectItem value="XYZ Tech HR Admin">XYZ Tech HR Admin</SelectItem>
            <SelectItem value="TMBC HR Admin">TMBC HR Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;
