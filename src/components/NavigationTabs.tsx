// ./src/components/NavigationTabs.tsx
"use client";

import React, { useState } from "react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import NavLink from "@/components/NavLink";

interface NavigationTabsProps {
  tabs: { label: string; value: string; }[]; // Define a list of tabs with a label and value
  defaultActiveTab?: string; // Default active tab
  onTabChange?: (value: string) => void; // Callback to handle tab change
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs,
  defaultActiveTab = tabs[0].value,
  onTabChange = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    onTabChange(tabValue);
  };

  return (
    <NavigationMenu className="bg-[#FDF9FF] p-2 rounded">
      <NavigationMenuList className="flex gap-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.value}
            href="#"
            isActive={activeTab === tab.value}
            onClick={() => handleTabClick(tab.value)}
            className="hover:text-[#FFFFFF] text-[#000000]"
          >
            {tab.label}
          </NavLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationTabs;
