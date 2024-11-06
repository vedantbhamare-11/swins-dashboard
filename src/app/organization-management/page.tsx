// ./src/app/organization-management/page.tsx
"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavLink from "@/components/NavLink";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import OrganizationTable from "@/components/OrganizationTable";
import AddOrganizationModal from "@/components/AddOrganizationModal";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";

const OrganizationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all-organizations");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const organizations = useSelector((state: RootState) => state.organizationManagement.organizations);

  // Function to get the heading text based on active tab
  const getHeadingText = () => {
    switch (activeTab) {
      case "all-organizations":
        return "All Organizations";
      case "post-publicly":
        return "Post Publicly";
      case "admin-approved":
        return "Admin Approved";
      default:
        return "All Organizations";
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const filteredOrganizations = organizations.filter((org) => {
    if (activeTab === "all-organizations") return true;
    if (activeTab === "post-publicly") return org.postType === "Post Publicly";
    if (activeTab === "admin-approved") return org.postType === "Admin Approved";
    return true;
  });

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#FDF9FF] p-2 rounded">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-2 sm:gap-4 flex-wrap">
                  <NavigationMenuItem>
                    <NavLink
                      href="#"
                      isActive={activeTab === "all-organizations"}
                      onClick={() => setActiveTab("all-organizations")}
                    >
                      All Organizations
                    </NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink
                      href="#"
                      isActive={activeTab === "post-publicly"}
                      onClick={() => setActiveTab("post-publicly")}
                    >
                      Post Publicly
                    </NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink
                      href="#"
                      isActive={activeTab === "admin-approved"}
                      onClick={() => setActiveTab("admin-approved")}
                    >
                      Admin Approved
                    </NavLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <button className="ml-4 p-2 bg-transparent hover:bg-gray-200 rounded-md">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl md:text-2xl font-bold">{getHeadingText()}</h1>
              <Button onClick={handleModalOpen} className="flex items-center gap-2 bg-[#1E1E1E] text-white p-2 rounded-md">
                <Plus className="w-4 h-4" />
                Add Organization
              </Button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Empowering Connections, Building Community</p>
            <CardContent>
              <OrganizationTable organizations={filteredOrganizations} />
            </CardContent>
          </Card>

          <AddOrganizationModal isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagement;
