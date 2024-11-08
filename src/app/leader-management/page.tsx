"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "@/components/NavLink";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import LeaderboardTable from "@/components/LeaderboardTable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import { RootState } from "@/redux/store";

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

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <div className="flex h-screen">
        <Sidebar />

        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <NavigationMenu className="flex-1 bg-[#FDF9FF] p-2 rounded">
              <NavigationMenuList className="flex gap-2 sm:gap-4 flex-wrap">
                <NavLink
                  href="#"
                  isActive={activeTab === "weekly"}
                  onClick={() => setActiveTab("weekly")}
                >
                  Weekly
                </NavLink>
                <NavLink
                  href="#"
                  isActive={activeTab === "monthly"}
                  onClick={() => setActiveTab("monthly")}
                >
                  Monthly
                </NavLink>
                <NavLink
                  href="#"
                  isActive={activeTab === "annually"}
                  onClick={() => setActiveTab("annually")}
                >
                  Annually
                </NavLink>
              </NavigationMenuList>
            </NavigationMenu>

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
