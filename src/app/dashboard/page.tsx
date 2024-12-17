"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Dashboard: React.FC = () => {
  useSelector((state: RootState) => state.dashboard);

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full ml-64 mt-20">
          <div className="flex gap-4 mt-4 mx-4 md:mx-10">
            {/* Updated Dashboard Cards */}
            <DashboardCard title="Total Organizations" description={22} />
            <DashboardCard title="Active Organizations" description={20} />
            <DashboardCard title="Feedback Received" description={1234} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
