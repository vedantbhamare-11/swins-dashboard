"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, UserPlus } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin" | "Organization Admin";
}

interface AddUserModalProps {
  showModal: boolean;
  toggleModal: () => void;
  newUser: { name: string; email: string; role: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleAddUser: () => void;
  resetUser: () => void;
  userList: User[];
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  showModal,
  toggleModal,
  newUser,
  handleInputChange,
  handleAddUser,
  resetUser,
  userList,
}) => {
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateInputs = () => {
    const nameError = !newUser.name.trim() ? "Name is required" : "";
    const emailError = !newUser.email.trim()
      ? "Email is required"
      : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.email)
      ? ""
      : "Enter a valid email address";

    setErrors({ name: nameError, email: emailError });
    return !nameError && !emailError;
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (validateInputs()) {
      handleAddUser();
      resetUser();
      setHasSubmitted(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <Card className="bg-white rounded-lg w-[400px] max-w-md p-6 relative flex flex-col justify-between">
        <button onClick={toggleModal} className="absolute top-4 right-4">
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

        <div className="space-y-6 flex-grow">
          <div>
            <Label className="block text-sm font-bold mb-1 ml-1">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            {hasSubmitted && errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-bold mb-1 ml-1">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            {hasSubmitted && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-bold mb-1 ml-1">Role</Label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-[#1E1E1E] text-white w-full p-2 rounded-md mt-4"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </Card>
    </div>
  );
};

export default AddUserModal;
