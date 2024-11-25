"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo_dark_theme.png";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(in)$/; // Validate generic email ending with ".in"
    if (!email.endsWith("@tmbc.in") || !emailRegex.test(email)) {
      setError("The email you entered is incorrect. Please try again.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      // Pass the email as a query parameter to the SignUp2 page
      router.push(`/signup2?email=${encodeURIComponent(email)}`);
    }
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

        {/* Quote at the bottom for larger screens */}
        <div className="text-white hidden md:block absolute bottom-4 left-8 right-8">
          <p className="italic">
            “This Library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 text-right text-xs">— Sofia Davis</p>
        </div>
      </div>

      {/* Right Part: Sign Up Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        {/* Sign Up Form */}
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl mb-8 text-center">
            Enter Your Organization Email
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              placeholder="Enter your Organization Email"
              className={`w-full placeholder:text-[##0F0F0F33] mb-1 ${
                error ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <Button className="w-full mb-2" onClick={handleSubmit}>
            Submit
          </Button>

          <p className="text-sm text-[#A8A8A8] text-center mx-10">
            Already Have an Account?{" "}
            <Link
              href="/signin"
              className="hover:underline text-[#000] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Quote for smaller screens */}
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

export default SignUp;
