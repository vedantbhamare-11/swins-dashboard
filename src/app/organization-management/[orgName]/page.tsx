"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NavigationTabs from "@/components/NavigationTabs";
import UserTable from "@/components/UserTable";
import FeedbackTable from "@/components/FeedbackTable";
import LeaderboardTable from "@/components/LeaderboardTable";
import Header from "@/components/Header"; // Import Header component
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import AddUserModal from "@/components/AddUserModal"; // Import AddUserModal
import { Button } from "@/components/ui/button";
import FilterPopover from "@/components/FilterPopover"; // Import FilterPopover

const OrganizationDetailPage: React.FC = () => {
  const { orgName } = useParams(); // Capture the org name from the URL
  const organizations = useSelector(
    (state: RootState) => state.organizationManagement.organizations
  );

  const [activeTab, setActiveTab] = useState("user");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const [filters, setFilters] = useState<Record<string, boolean>>({
    active: true,
    inactive: true,
  });

  // Dummy labels for the filter popover
  const labels = [
    { label: "Active", name: "active" },
    { label: "Inactive", name: "inactive" },
  ];

  // Ensure orgName is a string (in case it's an array)
  const decodedOrgName = decodeURIComponent(
    Array.isArray(orgName) ? orgName[0] : orgName
  );

  // Find the selected organization from the list using the decoded orgName
  const selectedOrg = organizations.find((org) => org.name === decodedOrgName);

  // If the organization is not found, return an error
  if (!selectedOrg) {
    return <div>Organization not found</div>;
  }

  // Handle input change in the modal
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle adding a new user (this will just close the modal in this case)
  const handleAddUser = () => {
    // Reset form and close the modal
    setNewUser({ name: "", email: "", role: "User" });
    setShowModal(false);
  };

  // Handle filter change in the popover
  const handleFilterChange = (name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: !prevFilters[name],
    }));
  };

  const tabs = [
    { label: "User", value: "user" },
    { label: "Feedback", value: "feedback" },
    { label: "Leaderboard Management", value: "leaderboard" },
  ];

  // Function to get the tab content based on the active tab
  const getTabContent = () => {
    switch (activeTab) {
      case "user":
        return <UserTable users={selectedOrg.users} />;
      case "feedback":
        return (
          <FeedbackTable feedbacks={selectedOrg.feedbacks} searchQuery="" />
        );
      case "leaderboard":
        return <LeaderboardTable data={selectedOrg.leaderboard} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Header /> {/* Include the Header */}
      <div className="flex h-screen">
        <Sidebar /> {/* Include the Sidebar */}
        <div className="p-4 ml-72 mt-24 w-full relative  overflow-y-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col mb-4 space-y-2 md:space-y-0">
              <h2 className="text-2xl font-bold">{selectedOrg.name}</h2>
              <p className="text-sm text-gray-600">{selectedOrg.type}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Add User Button (Only in the User Tab) */}
              {activeTab === "user" && (
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-[#1E1E1E] text-white"
                >
                  Add User
                </Button>
              )}
              {/* Filter Popover (For all tabs: User, Feedback, and Leaderboard) */}
              {(activeTab === "user" || activeTab === "feedback" || activeTab === "leaderboard") && (
                <FilterPopover
                  labels={labels}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <NavigationTabs
              tabs={tabs}
              defaultActiveTab={activeTab}
              onTabChange={(tabValue) => setActiveTab(tabValue)}
            />
          </div>

          {/* Render the tab content (user table, feedback table, or leaderboard) */}
          {getTabContent()}

          {/* Show the Add User Modal */}
          {showModal && (
            <AddUserModal
              showModal={showModal}
              toggleModal={() => setShowModal(false)}
              newUser={newUser}
              handleInputChange={handleInputChange}
              handleAddUser={handleAddUser} // Simply close the modal
              resetUser={() =>
                setNewUser({ name: "", email: "", role: "User" })
              }
              userList={selectedOrg.users}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;
