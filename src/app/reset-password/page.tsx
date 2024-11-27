'use client'; 

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo_dark_theme.png"; 
import { Eye, EyeOff } from "lucide-react"; 
import { useRouter } from 'next/navigation';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter(); 

  const validatePasswords = () => {
    const passwordRules =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let isValid = true;

    // Validate New Password
    if (!newPassword) {
      setNewPasswordError("New password is required.");
      isValid = false;
    } else if (!passwordRules.test(newPassword)) {
      setNewPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    // Validate Confirm Password
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validatePasswords()) {
      // Add your password reset logic here (e.g., API call)
      
      // On success, redirect to the dashboard
      router.push('/signin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Part: Black Background with Logo */}
      <div className="md:w-1/2 bg-black relative flex flex-col justify-between p-8">
        {/* Logo */}
        <Image
          src={LogoDark}
          alt="Small Wins Logo"
          width={170}
          height={50}
          className="mb-4"
        />

        <div className="hidden md:block text-white absolute bottom-4 left-8 right-8">
          <p className="italic">
            “This Library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 text-right">— Sofia Davis</p>
        </div>
      </div>

      {/* Right Part: Reset Password Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>

          {/* New Password Field */}
          <div className="mb-4 relative">
            <Input
              type={showNewPassword ? "text" : "password"} 
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]" 
            />
            {/* Eye Icon for Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]" 
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
            {newPasswordError && <p className="text-red-600 text-sm mt-1">{newPasswordError}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]" 
            />
            {/* Eye Icon for Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {confirmPasswordError && <p className="text-red-600 text-sm mt-1">{confirmPasswordError}</p>}
          </div>

          {/* Submit Button */}
          <Button className="w-full mb-6" onClick={handleSubmit}>
            Submit
          </Button>

          {/* Signup Link */}
          <p className="text-sm text-[#A8A8A8] text-center">New User?{' '}
            <Link href="/signup2" className="hover:underline font-semibold text-[#000]">Register Here</Link>
          </p>
        </div>
      </div>

      {/* Footer for the Quote on small screens */}
      <div className="block md:hidden text-white bg-black p-4 text-center mt-auto">
        <p className="italic">
          “This Library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
        </p>
        <p className="mt-2">— Sofia Davis</p>
      </div>
    </div>
  );
};

export default ResetPassword;
