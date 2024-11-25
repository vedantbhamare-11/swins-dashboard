"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo_dark_theme.png";
import { useRouter } from "next/navigation";

const OtpVerification: React.FC = () => {
  const router = useRouter();
  const correctOtp = "123456"; // Correct OTP for now
  const [otp, setOtp] = useState(Array(6).fill("")); // Array for 6 OTP boxes
  const [error, setError] = useState("");

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next box if input is entered
    if (value && index < otp.length - 1) {
      const nextElement = document.getElementById(`otp-${index + 1}`);
      if (nextElement) {
        (nextElement as HTMLInputElement).focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join(""); // Combine OTP array into a single string
    if (enteredOtp !== correctOtp) {
      setError("The OTP you entered is incorrect. Please try again.");
      return;
    }
    setError("");
    // Handle OTP verification logic here
    router.push("/dashboard"); // Redirect to the Dashboard on success
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Part: Black Background with Logo */}
      <div className="md:w-1/2 bg-black relative flex flex-col justify-between p-8">
        <Image
          src={Logo}
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

      {/* Right Part: OTP Verification Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-semibold mb-2 text-center">Enter the Code</h1>
          <p className="text-[#71717A] mb-6 text-center">
            We have just emailed you
          </p>

          {/* OTP Input Boxes */}
          <div className="flex justify-center mb-4">
            {otp.map((value, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-16 h-16 text-center text-lg border border-gray-300 rounded-md mx-1 placeholder:text-[#C3C3C3] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            ))}
          </div>

          {/* Helper Text */}
          <p className="text-sm text-[#71717A] mb-4">
            We've sent an email to your inbox with a one-time code. <br />
            It may take a few minutes to arrive.
          </p>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Verify Button */}
          <Button className="w-full mb-6" onClick={handleVerify}>
            Verify
          </Button>

          {/* Resend OTP Link */}
          <div className="text-center">
            <Link
              href="/signin"
              className="hover:underline text-[#000] font-semibold"
            >
              Resend OTP
            </Link>
          </div>
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

export default OtpVerification;
