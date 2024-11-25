'use client'; 

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo_dark_theme.png"; 
import { useRouter } from 'next/navigation';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      // Redirect to the reset password page
      router.push('/reset-password');
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

      {/* Right Part: Sign In Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        {/* Sign In Form */}
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
          <p className="text-[#71717A] mb-6 text-center">
            Good Morning, Welcome Back!
          </p>

          {/* Validation Error Message */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Input Fields */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]"
            />
          </div>

          {/* Sign In Button */}
          <Button className="w-full mb-6" onClick={handleSubmit}>
            Submit
          </Button>

          {/* Signup Link */}
          <p className="text-sm text-[#A8A8A8] text-center">New User?{' '}
            <Link href="/signup2" className="text-[#000]">Register Here</Link>
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

export default ForgotPassword;
