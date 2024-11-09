// ./src/app/user-management/page.tsx
"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import NavLink from "@/components/NavLink";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, SlidersHorizontal } from "lucide-react"; // Import the filter icon
import AddUserModal from "@/components/AddUserModal";
import UserTable from "@/components/UserTable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { addUser } from "@/redux/slices/userManagementSlice";
import type { User } from "@/redux/slices/userManagementSlice";

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all-members");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    reportedTo: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userManagement.users);

  const toggleModal = () => setShowModal(!showModal);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    const newUserEntry: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as "User" | "Admin", // Type assertion here
      reportedTo: newUser.reportedTo || "",
      lastActive: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Active",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    };

    dispatch(addUser(newUserEntry));
    setShowModal(false);
  };

  const resetUser = () =>
    setNewUser({ name: "", email: "", role: "User", reportedTo: "" });

  const filteredUsers = users.filter((user) => {
    const matchesRole =
      activeTab === "all-members" ||
      (activeTab === "employee" ? user.role === "User" : user.role === "Admin");
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 md:p-6 w-full relative bg-[#F8F8F8] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <h1 className="text-xl md:text-2xl font-bold">User Management</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-1">
              <Input
                type="text"
                placeholder="Search Employees"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 w-full sm:w-60"
              />
              <Button variant={"outline"} className="flex w-10 items-center gap-2 p-2 rounded-md">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-md rounded-lg p-4 mb-4">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <NavigationMenu className="bg-[#FDF9FF] p-2 rounded">
                  <NavigationMenuList className="flex gap-2 sm:gap-4 flex-wrap">
                    <NavLink
                      href="#"
                      isActive={activeTab === "all-members"}
                      onClick={() => setActiveTab("all-members")}
                    >
                      All Members
                    </NavLink>
                    <NavLink
                      href="#"
                      isActive={activeTab === "employee"}
                      onClick={() => setActiveTab("employee")}
                    >
                      Employee
                    </NavLink>
                    <NavLink
                      href="#"
                      isActive={activeTab === "admin"}
                      onClick={() => setActiveTab("admin")}
                    >
                      Admin
                    </NavLink>
                  </NavigationMenuList>
                </NavigationMenu>
                <Button
                  onClick={toggleModal}
                  className="flex items-center gap-2 bg-[#1E1E1E] text-white p-2 rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </Button>
              </div>

              <div className="overflow-x-auto">
                <UserTable users={filteredUsers} />
              </div>
            </CardContent>
          </Card>

          <AddUserModal
            showModal={showModal}
            toggleModal={toggleModal}
            newUser={newUser}
            handleInputChange={handleInputChange}
            handleAddUser={handleAddUser}
            resetUser={resetUser}
            userList={users}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
