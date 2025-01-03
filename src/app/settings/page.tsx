"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { updateAdminDetail, updateProfilePic } from "@/redux/slices/adminDetailsSlice";
import AccountSettings from "@/components/AccountSettings";
import NavigationTabs from "@/components/NavigationTabs"; 
import NotificationSettings from "@/components/NotificationSettings";
import SecuritySettings from "@/components/SecuritySettings";
import AppearanceSettings from "@/components/AppearanceSettings";
import AdminAccountSettings from "@/components/AdminAccountSettings";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  // Get the admin details from the Redux store
  const { fullName, email, role, timeZone, profilePic, department, designation } = useSelector(
    (state: RootState) => state.adminDetails
  );
  const dispatch = useDispatch();

  // Local state for form inputs (auto-fill from Redux)
  const [formData, setFormData] = useState({
    fullName,
    email,
    role,
    timeZone,
    department, // Include department
    designation, // Include designation
  });

  // Auto-fill form data on component mount
  useEffect(() => {
    setFormData({
      fullName,
      email,
      role,
      timeZone,
      department, // Include department
      designation, // Include designation
    });
  }, [fullName, email, role, timeZone, department, designation]);

  // Handle input change for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(updateAdminDetail({ key: name as keyof typeof formData, value }));
  };

  // Handle select changes for time zone
  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      timeZone: value,
    }));
    dispatch(updateAdminDetail({ key: "timeZone", value }));
  };

  // Handle file change for profile picture upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateProfilePic(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save button click
  const handleSaveSettings = () => {
    console.log("Settings Saved", formData);
  };

  const tabs = [
    { label: "Account", value: "account" },
    { label: "Notification", value: "notification" },
    { label: "Security", value: "security" },
    { label: "Appearance", value: "appearance" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 ml-72 mt-24 w-full relative  overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-gray-600">Manage your settings here</p>
          </div>

          <NavigationTabs
            tabs={tabs}
            defaultActiveTab={activeTab}
            onTabChange={setActiveTab}
          />
          {activeTab === "account" && (
            <>
            <div className="mt-4">
             <AccountSettings />
            </div>

              {/* New Component added below */}
              {/* Hidden by default */}
              {/* <AdminAccountSettings
                formData={formData}
                selectedImage={profilePic}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                handleSaveSettings={handleSaveSettings}
              /> */}
            </>
          )}
          {activeTab === "notification" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
