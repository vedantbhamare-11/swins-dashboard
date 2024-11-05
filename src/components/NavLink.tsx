"use client";
import React from 'react';
import Link from 'next/link';
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean; // New prop to determine if the link is active
  onClick: () => void; // Function to call when the link is clicked
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={`text-sm font-medium p-2 rounded ${
            isActive
              ? 'bg-[#09090B] text-[#FFFFFF]'
              : 'hover:bg-[#09090B] hover:text-[#FFFFFF]'
          } 
          md:text-sm md:p-2 sm:text-xs sm:p-1`} // Adjust text size and padding for small screens
          onClick={onClick} // Call the onClick function
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NavLink;
