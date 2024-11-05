// ./src/app/dashboard/page.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DashboardCard from "@/components/DashboardCard";
import DynamicLineChart from "@/components/DynamicLineChart";
import RecentReviews from "@/components/RecentReviews";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/NavLink";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Dashboard: React.FC = () => {
  const { cardsData, lineChartData, recentReviews } = useSelector((state: RootState) => state.dashboard);

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 mx-4 md:mx-10">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center mt-2 md:mt-0">
              <DatePickerWithRange className="ml-auto" />
              <Button className="ml-4">Download</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-4 md:mx-10">
            <DashboardCard title="Positive Review" description={cardsData.positiveReviews} footerText={cardsData.positiveFooter} />
            <DashboardCard title="Negative Review" description={cardsData.negativeReviews} footerText={cardsData.negativeFooter} />
            <DashboardCard title="Flagged Review" description={cardsData.flaggedReviews} footerText={cardsData.flaggedFooter} />
            <DashboardCard title="Escalated Review" description={cardsData.escalatedReviews} footerText={cardsData.escalatedFooter} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 mx-4 md:mx-10 h-auto">
            <div>
              <DynamicLineChart data={lineChartData} />
            </div>
            <div>
              <RecentReviews reviews={recentReviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
