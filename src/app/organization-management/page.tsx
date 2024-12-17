// ./src/app/organization-management/page.tsx
"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import OrganizationCard from "@/components/OrganizationCard";
import AddOrganizationModal from "@/components/AddOrganizationModal";
import PostPreferenceDialog from "@/components/PostPreferenceDialog";
import OrganizationDetailsModal from "@/components/OrganizationDetailsModal";
import { updatePostPreference } from "@/redux/slices/organizationManagementSlice";
import NavigationTabs from "@/components/NavigationTabs";

const OrganizationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all-organizations");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostPreferenceDialogOpen, setIsPostPreferenceDialogOpen] =
    useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const organizations = useSelector(
    (state: RootState) => state.organizationManagement.organizations
  );

  const dispatch = useDispatch();

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

  const handlePostPreferenceOpen = (org: any) => {
    setSelectedOrg(org); // Set the selected organization for post preference
    setIsPostPreferenceDialogOpen(true); // Open the Post Preference Dialog
  };

  const handlePostPreferenceClose = () => setIsPostPreferenceDialogOpen(false);

  const handlePostPreferenceSave = (
    preference: "Admin Approved" | "Post Publicly"
  ) => {
    if (selectedOrg) {
      dispatch(
        updatePostPreference({
          organizationName: selectedOrg.name,
          postType: preference,
        })
      );
      setIsPostPreferenceDialogOpen(false);
    }
  };

  const handleShowDetails = (org: any) => {
    setSelectedOrg(org); // Set the selected organization for details
    setIsDetailsModalOpen(true); // Open the details modal
  };

  const handleDetailsModalClose = () => setIsDetailsModalOpen(false);

  const filteredOrganizations = organizations.filter((org) => {
    if (activeTab === "all-organizations") return true;
    if (activeTab === "post-publicly") return org.postType === "Post Publicly";
    if (activeTab === "admin-approved")
      return org.postType === "Admin Approved";
    return true;
  });

  // Tabs configuration
  const tabs = [
    { label: "All Organizations", value: "all-organizations" },
    { label: "Post Publicly", value: "post-publicly" },
    { label: "Admin Approved", value: "admin-approved" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 ml-72 mt-24 w-full relative  overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <NavigationTabs
              tabs={tabs}
              defaultActiveTab={activeTab}
              onTabChange={(tabValue) => setActiveTab(tabValue)}
            />
            <button className="ml-4 p-2 bg-transparent hover:bg-gray-200 rounded-md">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl md:text-2xl font-bold">
                  {getHeadingText()}
                </h1>
                <Button
                  onClick={handleModalOpen}
                  className="flex items-center gap-2 bg-[#1E1E1E] text-white p-2 rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Organization
                </Button>
              </div>
              <p className="text-gray-500 text-sm mb-4">
              List of Organizations to feedbacks
              </p>
              <div className="flex gap-4 grid grid-cols-3">
                {filteredOrganizations.map((org) => (
                  <OrganizationCard
                    key={org.name}
                    organization={org}
                    onShowDetails={() => handleShowDetails(org)}
                    onPostPreference={() => handlePostPreferenceOpen(org)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <AddOrganizationModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />

          {/* Post Preference Dialog */}
          <PostPreferenceDialog
            isOpen={isPostPreferenceDialogOpen}
            onClose={handlePostPreferenceClose}
            onSave={handlePostPreferenceSave}
          />

          {/* Organization Details Modal */}
          {selectedOrg && (
            <OrganizationDetailsModal
              isOpen={isDetailsModalOpen}
              onClose={handleDetailsModalClose}
              selectedOrg={selectedOrg} // Pass selectedOrg here
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagement;
