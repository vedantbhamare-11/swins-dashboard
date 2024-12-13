"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

interface AccountSettingsProps {
  formData: {
    fullName: string;
    email: string;
    role: string;
    department: string;
    designation: string;
  };
  selectedImage: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveSettings: () => void;
}

const AdminAccountSettings: React.FC<AccountSettingsProps> = ({
  formData,
  selectedImage,
  handleInputChange,
  handleFileChange,
  handleSaveSettings,
}) => {
  const dispatch = useDispatch();

  // State to track validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    role: "",
    department: "",
    designation: "",
  });

  // Validation function
  const validateInputs = () => {
    const newErrors = {
      fullName: formData.fullName ? "" : "Full Name is required.",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
        ? ""
        : "Invalid email format.",
      role: formData.role ? "" : "Role is required.",
      department: formData.department ? "" : "Department is required.",
      designation: formData.designation ? "" : "Designation is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle save button click
  const handleSave = () => {
    if (validateInputs()) {
      handleSaveSettings();
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 my-4">
      <CardContent>
        <div className="my-4">
          <h2 className="text-xl font-bold">Account</h2>
          <p className="text-sm text-gray-600">Customize your profile details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-3 md:col-span-2">
            {/* Full Name Input */}
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Role Input */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                placeholder="Admin"
                value={formData.role}
                onChange={handleInputChange}
              />
              {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
            </div>

            {/* Department Input */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                placeholder="Marketing"
                value={formData.department}
                onChange={handleInputChange}
              />
              {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
            </div>

            {/* Designation Input */}
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                placeholder="Manager"
                value={formData.designation}
                onChange={handleInputChange}
              />
              {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <Label htmlFor="profile-pic-upload" className="mb-2 font-semibold text-gray-700">
              Profile Image
            </Label>
            <label
              htmlFor="logo-upload"
              className="border border-gray-300 rounded-md p-2 flex h-[335px] w-[100%] cursor-pointer"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="border-2 border-dashed border-[#E4E4E7] rounded-md w-full h-full flex items-center justify-center text-gray-500 space-x-2">
                  <span className="text-xs">Choose your image</span>
                </div>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="mt-6 w-full justify-center flex">
          <Button onClick={handleSave} className="px-6 py-2 rounded-md w-[30%]">
            Save Account Settings
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminAccountSettings;
