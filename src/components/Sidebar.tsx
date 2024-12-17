// ./src/components/Sidebar.tsx
"use client";
import Image from "next/image";
import Logo from "@/app/assets/logo_light_theme.png";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FileText, Bell, Settings, Crown, Building2 } from "lucide-react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", 
      icon: <Home />, 
      path: "/dashboard" },
    { name: "User Management", 
      icon: <Users />, 
      path: "/user-management" },
    {
      name: "Feedback Management",
      icon: <FileText />,
      path: "/feedback-management",
    },
    {
      name: "Leaderboard Management",
      icon: <Crown />,
      path: "/leader-management",
    },
    {
      name: "Organization Management",
      icon: <Building2 />,
      path: "/organization-management",
    },
    { name: "Notifications", 
      icon: <Bell />, 
      path: "/notifications" 
    },
    { name: "Settings", 
      icon: <Settings />, 
      path: "/settings" 
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50  h-full border-r border-gray-200 p-4 flex flex-col border-r">
      <div className="flex ml-2 items-center mt-2 mb-12 gap-4">
        {/* Logo */}
        <Image src={Logo} alt="Company Logo" width={150} height={50} />

        {/* Search Bar */}
        {/* <Input
          type="text"
          placeholder="Search..."
          className="w-60 p-2 border ml-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        /> */}
      </div>
      <nav className="flex flex-col gap-4">
        {navLinks.map((link, index) => (
          <Link key={index} href={link.path} legacyBehavior>
            <a
              className={`flex items-center gap-4 p-2 rounded-md transition-colors duration-150 ${
                pathname === link.path
                  ? "bg-black text-white"
                  : "text-gray-700"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
