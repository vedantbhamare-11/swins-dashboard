// src/components/Header.tsx
import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path using usePathname

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Function to check if the current path is active
  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex items-center justify-between p-4 border-b-2 relative">
      {/* Left Side: Select Component */}
      <div className="flex items-center gap-4">
        {/* Select Component */}
        <Select>
          <SelectTrigger className="w-[150px] md:w-[200px]">
            <Avatar className="w-7 h-7">
              <AvatarImage src="https://avatars.githubusercontent.com/u/100000000?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <SelectValue placeholder="TMBC HR Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ABC Solutions HR Admin">ABC Solutions HR Admin</SelectItem>
            <SelectItem value="XYZ tech HR Admin">XYZ tech HR Admin</SelectItem>
            <SelectItem value="TMBC HR Admin">TMBC HR Admin</SelectItem>
          </SelectContent>
        </Select>

        {/* Navigation Menu for Larger Screens */}
        <nav className="hidden md:flex gap-4">
          <Link href="/" legacyBehavior passHref>
            <a className={`text-sm font-medium ${isActive("/dashboard") ? "text-black" : "text-[#71717A]"}`}>
              Review
            </a>
          </Link>
          <Link href="/leaderboard" legacyBehavior passHref>
            <a className={`text-sm font-medium ${isActive("/") ? "text-black" : "text-[#71717A]"}`}>
              Leaderboard
            </a>
          </Link>
          <Link href="/reports" legacyBehavior passHref>
            <a className={`text-sm font-medium ${isActive("/") ? "text-black" : "text-[#71717A]"}`}>
              Report & Analytics
            </a>
          </Link>
          <Link href="/employee-management" legacyBehavior passHref>
            <a className={`text-sm font-medium ${isActive("/") ? "text-black" : "text-[#71717A]"}`}>
              Employee Management
            </a>
          </Link>
        </nav>

        {/* Search Bar for Small Screens */}
        <div className="md:hidden">
          <Input type="text" placeholder="Search Your Employee" className="w-[170px]" />
        </div>
      </div>

      {/* Right Side (Search Bar + Avatar for large screens, Hamburger Menu for small screens) */}
      <div className="flex items-center gap-4">
        {/* Search Bar for Larger Screens */}
        <div className="hidden md:block">
          <Input type="text" placeholder="Search Your Employee" className="w-[300px]" />
        </div>

        {/* Avatar for Larger Screens */}
        <Avatar className="w-8 h-8 hidden md:block">
          <AvatarImage src="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none" onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hamburger Menu Content for Small Screens */}
      {isMenuOpen && (
        <nav className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col p-6 space-y-4 text-white">
          <button className="self-end text-white text-lg mb-4" onClick={toggleMenu}>
            Close
          </button>
          <Link href="/" legacyBehavior passHref>
            <a className={` text-l font-medium ${isActive("/dashboard") ? "text-white" : "text-[#71717A]"}`}>
              Review
            </a>
          </Link>
          <Link href="/leaderboard" legacyBehavior passHref>
            <a className={`text-l font-medium ${isActive("/") ? "text-white" : "text-[#71717A]"}`}>
              Leaderboard
            </a>
          </Link>
          <Link href="/reports" legacyBehavior passHref>
            <a className={`text-l font-medium ${isActive("/") ? "text-white" : "text-[#71717A]"}`}>
              Report & Analytics
            </a>
          </Link>
          <Link href="/employee-management" legacyBehavior passHref>
            <a className={`text-l font-medium ${isActive("/") ? "text-white" : "text-[#71717A]"}`}>
              Employee Management
            </a>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
