"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // Import Switch from shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle changes in password fields
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle the change of the Two-Factor Authentication switch
  const handleSwitchChange = (value: boolean) => {
    setIsTwoFactorEnabled(value);
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password should be at least 6 characters long";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Save settings button click
  const handleSaveSettings = () => {
    if (validate()) {
      alert(
        `Security Settings Updated! 
        \nTwo-Factor Authentication: ${
          isTwoFactorEnabled ? "Enabled" : "Disabled"
        }`
      );
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-2 my-4">
      <CardContent>
        <div className="my-4">
          <h2 className="text-xl font-bold">Security</h2>
          <p className="text-sm text-gray-600">Update your security settings</p>
        </div>

        <div className="mb-4">
          <label htmlFor="currentPassword" className="block font-semibold">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handlePasswordChange}
            className="p-2 border rounded-md w-full mt-2"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block font-semibold">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            className="p-2 border rounded-md w-full mt-2"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
            className="p-2 border rounded-md w-full mt-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div className=" justify-between items-center mb-4">
          <p className="font-semibold">Two-Factor Authentication</p>
          <div className="flex items-center gap-2 my-2">
            <Switch
              checked={isTwoFactorEnabled}
              onCheckedChange={handleSwitchChange}
            />
            <p className="text-sm font-semibold ">Enable 2FA</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleSaveSettings}
          className="px-6 py-2 rounded-md w-[30%]"
        >
          Update Security Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecuritySettings;
