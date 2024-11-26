'use client'; 

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo_dark_theme.png"; import { Eye, EyeOff } from "lucide-react"; 
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter(); 

  const handleSignIn = () => {
    // Add your sign-in logic here (e.g., API call for authentication)
    
    // On successful authentication, redirect to the dashboard
    router.push('/dashboard'); // Redirect to the dashboard page
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
        {/* Sign Up Link in the top-right corner */}
        <div className="absolute top-4 right-4">
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </div>

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
              className="w-full placeholder:text-[#C3C3C3]" // Set placeholder color
            />
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full placeholder:text-[#C3C3C3]" // Set placeholder color
            />
            {/* Eye Icon for Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]" // Set icon color
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Sign In Button */}
          <Button className="w-full mb-6" onClick={handleSignIn}>
            Sign In
          </Button>

          {/* Forgot Password Link */}
          <p className="text-sm text-[#71717A] text-center">
            <Link href="/forgot-password" className="underline">Forgot Password?</Link>
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
