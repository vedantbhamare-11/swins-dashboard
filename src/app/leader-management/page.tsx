"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeaderboardTable from "@/components/LeaderboardTable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import { RootState } from "@/redux/store";
import NavigationTabs from "@/components/NavigationTabs";

const LeaderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const leaderboardData = useSelector((state: RootState) => {
    if (activeTab === "weekly") return state.leaderboard.weekly;
    if (activeTab === "monthly") return state.leaderboard.monthly;
    return state.leaderboard.annually;
  });

  useEffect(() => {
    setLoading(false); // Here we simulate loading, replace with real fetch if needed
  }, [activeTab, leaderboardData]);

  const getHeadingText = () => {
    switch (activeTab) {
      case "weekly":
        return "Top Performers of the Week";
      case "monthly":
        return "Top Performers of the Month";
      case "annually":
        return "Top Performers of the Year";
      default:
        return "Top Performers";
    }
  };

  // Tabs configuration
  const tabs = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Annually", value: "annually" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <NavigationTabs
              tabs={tabs}
              defaultActiveTab={activeTab}
              onTabChange={(tabValue) => setActiveTab(tabValue)}
            />
            <button className="ml-4 p-2 border border-gray-300 bg-transparent hover:bg-gray-200 rounded-md">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h1 className="text-xl md:text-2xl font-bold">{getHeadingText()}</h1>
            <p className="text-gray-500 text-sm">
              Recognizing Excellence: Meet this {activeTab}'s top contributors making a difference!
            </p>

            <div className="mt-6 overflow-x-auto">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <LeaderboardTable data={leaderboardData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderManagement;
