'use client'; // Ensure this is a client-side component

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import Logo from "@/app/assets/logo_dark_theme.png"; // Importing the image from the src folder
import { useRouter } from 'next/navigation'; // Import useRouter

const SignUp2: React.FC = () => {
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orgType, setOrgType] = useState("");

  const router = useRouter(); // Initialize the useRouter hook

  const handleCreateAccount = () => {
    // Add your account creation logic here (e.g., API call for registration)
    // After successful account creation, redirect to Dashboard
    router.push('/dashboard'); // Redirect to the Dashboard page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Part: Black Background with Logo */}
      <div className="md:w-1/2 bg-black relative flex flex-col justify-between p-8">
        {/* Logo */}
        <Image
          src={Logo}
          alt="Small Wins Logo"
          width={170}
          height={50}
          className="mb-4"
        />
        
        {/* Quote at the bottom (Visible on large screens) */}
        <div className="hidden md:block text-white absolute bottom-4 left-8 right-8">
          <p className="italic">
            “This Library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 text-right">— Sofia Davis</p>
        </div>
      </div>

      {/* Right Part: Sign Up Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        {/* Login Link in the top-right corner */}
        <div className="absolute top-4 right-4">
          <Link href="/signin" className="hover:underline">
            Login
          </Link>
        </div>

        {/* Sign Up Form */}
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2 text-center">Create an account</h1>
          <p className="text-[#71717A] mb-6 text-center">
            Fill in your details to create your account
          </p>

          {/* Input Fields */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter your Organisation Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>
          <div className="mb-4">
            <Input
              type="url"
              placeholder="Enter your company website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>

          {/* Select Component for Organization Type */}
          <div className="mb-4">
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className={`w-full border border-gray-300 rounded-md p-2 placeholder:text-[#C3C3C3] ${orgType ? 'text-black' : 'text-[#C3C3C3]'}`}
            >
              <option value="" disabled hidden>
                Type of Organisation
              </option>
              <option value="non-profit">Non-Profit</option>
              <option value="startup">Startup</option>
              <option value="corporate">Corporate</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          {/* Create Account Button */}
          <Button className="w-full mb-6" onClick={handleCreateAccount}>
            Create Account
          </Button>

          {/* Terms and Privacy */}
          <p className="text-sm text-[#71717A] text-center mx-10">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline">Terms of Service</Link> and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Footer for the Quote on small screens */}
      <div className="block md:hidden text-white bg-black p-4 text-center">
        <p className="italic">
          “This Library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
        </p>
        <p className="mt-2">— Sofia Davis</p>
      </div>
    </div>
  );
};

export default SignUp2;
