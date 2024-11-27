'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo_dark_theme.png";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>(""); // General error message
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({}); // Field-specific errors
  const router = useRouter();

  const validateInputs = () => {
    const newFieldErrors: Record<string, string> = {};

    // Check if email is entered
    if (!email.trim()) {
      newFieldErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Validate email format
      newFieldErrors.email = "Please enter a valid email address.";
    }

    // Check if password is entered
    if (!password.trim()) {
      newFieldErrors.password = "Password is required.";
    } else if (password.length < 6) {
      // Validate password length
      newFieldErrors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(newFieldErrors);

    // Return true if no field errors
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validateInputs()) return; // Stop if validation fails

    // Clear errors and proceed
    setError("");
    console.log("Sign-in successful!");

    // Redirect to the dashboard on successful authentication
    router.push('/dashboard');
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

      {/* Right Part: Sign In Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        {/* Sign In Form */}
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2 text-center">Log In</h1>
          <p className="text-[#71717A] mb-6 text-center">
            Good Morning, Welcome Back!
          </p>

          {/* Input Fields */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full placeholder:text-[#C3C3C3] ${
                fieldErrors.email ? "border-red-500" : ""
              }`} // Add border color for errors
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>
          <div className="mb-1 relative">
            <Input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full placeholder:text-[#C3C3C3] ${
                fieldErrors.password ? "border-red-500" : ""
              }`} // Add border color for errors
            />
            {/* Eye Icon for Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]" // Set icon color
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {fieldErrors.password && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
            )}
          </div>
          {/* Forgot Password Link */}
          <div className="text-right mb-4">
            <Link href="/forgot-password" className="text-sm text-[#71717A]">
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* Sign In Button */}
          <Button className="w-full mb-4" onClick={handleSignIn}>
            Sign In
          </Button>

          {/* New User Register Link */}
          <p className="text-sm text-[#71717A] text-center">
            New User?{' '}
            <Link href="/signup" className="hover:underline text-[#000] font-semibold">
              Register Here
            </Link>
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

export default SignIn;
