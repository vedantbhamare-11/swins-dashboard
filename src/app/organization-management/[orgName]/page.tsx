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

const OrganizationDetailPage: React.FC = () => {
  const { orgName } = useParams(); // Capture the org name from the URL
  const organizations = useSelector(
    (state: RootState) => state.organizationManagement.organizations
  );

  const [activeTab, setActiveTab] = useState("user");

  // Ensure orgName is a string (in case it's an array)
  const decodedOrgName = decodeURIComponent(Array.isArray(orgName) ? orgName[0] : orgName);

  // Find the selected organization from the list using the decoded orgName
  const selectedOrg = organizations.find((org) => org.name === decodedOrgName);

  // If the organization is not found, return an error
  if (!selectedOrg) {
    return <div>Organization not found</div>;
  }

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
        return <FeedbackTable feedbacks={selectedOrg.feedbacks} searchQuery="" />;
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
        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          

          <div className="mb-6">
            <h2 className="text-2xl font-bold">{selectedOrg.name}</h2>
            <p className="text-sm text-gray-600">{selectedOrg.orgDescription}</p>
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
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;
