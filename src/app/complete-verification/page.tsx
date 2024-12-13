"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo_dark_theme.png";

const CompleteVerification: React.FC = () => {
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

      {/* Right Part: Success Message */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8 relative">
        <div className="text-center">
          {/* Tick Icon */}
          <Check size={60} className=" bg-black p-3 text-white rounded-full mx-auto mb-4" />

          {/* Success Message */}
          <h1 className="text-3xl    mb-2">
            Your Have Been <br /> Successfully Registered
          </h1>

          {/* Continue Button */}
          <Link href="/complete-profile">
            <Button className="mt-6 w-full md:w-[60%] mx-auto">
              Continue
            </Button>
          </Link>
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

export default CompleteVerification;
