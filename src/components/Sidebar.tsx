// ./src/components/Sidebar.tsx
"use client";

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
    { name: "Notifications", icon: <Bell />, path: "/notifications" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <aside className="bg-white text-gray-700 h-full w-[400px] p-5 flex flex-col border-r">
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
