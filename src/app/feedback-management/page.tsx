"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FeedbackTable from "@/components/FeedbackTable"; 
import NavigationTabs from "@/components/NavigationTabs"; 

const FeedbackManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("accepted"); // Default tab is 'accepted'
  const [searchQuery, setSearchQuery] = useState("");
  const feedbacks = useSelector((state: RootState) => state.feedbackManagement.feedbacks);

  // Function to get the heading text based on active tab
  const getHeadingText = () => {
    switch (activeTab) {
      case "accepted":
        return "Accepted Feedbacks";
      case "flagged":
        return "Flagged Feedbacks";
      case "pending":
        return "Pending Feedbacks";
      default:
        return "Feedback Management";
    }
  };

  // Filter feedbacks based on active tab and search query (feedback text, sharedTo, sharedBy)
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesStatus =
      (activeTab === "accepted" && feedback.status === "Accepted") ||
      (activeTab === "flagged" && feedback.status === "Flagged") ||
      (activeTab === "pending" && feedback.status === "Pending");

    const matchesSearch =
      feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.sharedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.sharedBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Tabs configuration
  const tabs = [
    { label: "Accepted", value: "accepted" },
    { label: "Flagged", value: "flagged" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <NavigationTabs
              tabs={tabs}
              defaultActiveTab={activeTab}
              onTabChange={(tabValue) => setActiveTab(tabValue)}
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search Feedbacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded-sm placeholder:text-sm focus:outline-none"
              />
              <Button variant="outline" className="p-2 rounded-md">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <CardContent>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{getHeadingText()}</h2>
                <p className="text-sm text-gray-600">Stay updated with the latest employee insights</p>
              </div>

              <FeedbackTable feedbacks={filteredFeedbacks} searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
