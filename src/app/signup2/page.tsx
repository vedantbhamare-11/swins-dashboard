"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo_dark_theme.png";
import { useRouter } from "next/navigation";

const SignUp2: React.FC = () => {
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleCreateAccount = () => {
    // Add your account creation logic here (e.g., API call for registration)
    router.push("/dashboard"); // Redirect to the Dashboard page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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

      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        <div className="absolute top-4 right-4">
          <Link href="/signin" className="hover:underline">
            Login
          </Link>
        </div>

        <div className="w-full md:w-[60%] mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Create an account
          </h1>
          <p className="text-[#71717A] mb-6 text-center">
            Fill in your details to create your account
          </p>

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

          <Button className="w-full mb-6" onClick={handleCreateAccount}>
            Create Account
          </Button>

          <p className="text-sm text-[#71717A] text-center mx-10">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

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