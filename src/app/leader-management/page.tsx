"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeaderboardTable from "@/components/LeaderboardTable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/redux/store";
import NavigationTabs from "@/components/NavigationTabs";
import { Card, CardContent } from "@/components/ui/card";
import FilterPopover from "@/components/FilterPopover";

const LeaderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const leaderboardData = useSelector((state: RootState) => {
    if (activeTab === "weekly") return state.leaderboard.weekly;
    if (activeTab === "monthly") return state.leaderboard.monthly;
    return state.leaderboard.annually;
  });

  // Fetch unique departments dynamically
  const departmentNames = Array.from(
    new Set(leaderboardData.map((leader) => leader.department))
  );

  useEffect(() => {
    setLoading(false); // Simulate loading
    // Initialize filters based on departments
    const initialFilters: Record<string, boolean> = {};
    departmentNames.forEach((dept) => {
      initialFilters[dept] = false;
    });
    setFilters(initialFilters);
  }, [activeTab, leaderboardData]);

  const handleFilterChange = (department: string) => {
    setFilters((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

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

  const filteredData = leaderboardData.filter((leader) => {
    const selectedDepartments = Object.keys(filters).filter(
      (key) => filters[key]
    );
    if (selectedDepartments.length === 0) return true; // No filters applied
    return selectedDepartments.includes(leader.department);
  });

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
        <div className="p-4 ml-72 mt-24 w-full relative  overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <NavigationTabs
              tabs={tabs}
              defaultActiveTab={activeTab}
              onTabChange={(tabValue) => setActiveTab(tabValue)}
            />
            <FilterPopover
              labels={departmentNames.map((dept) => ({
                label: dept,
                name: dept,
              }))}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <CardContent>
              <h1 className="text-xl md:text-2xl font-bold">{getHeadingText()}</h1>
              <p className="text-gray-500 text-sm">
                Recognizing Excellence: Meet this {activeTab}'s top contributors making a difference!
              </p>

              <div className="mt-6 overflow-x-auto">
                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  <LeaderboardTable data={filteredData} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderManagement;
