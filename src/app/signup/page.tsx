'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image"; 
import Logo from "@/app/assets/logo_dark_theme.png"; 
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {

const router = useRouter(); 

  const handleCreateAccount = () => {
    // Add your sign-in logic here (e.g., API call for authentication)
    
    // On successful authentication, redirect to the dashboard
    router.push('/signup2'); // Redirect to the dashboard page
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
          className="mb-4" // Add some margin below the logo
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
            Enter your email to create your account
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              className="w-full"
            />
          </div>

          {/* Create Account Button */}
          <Button className="w-full mb-6" onClick={handleCreateAccount}>
            Create Account
          </Button>

          {/* Separator with Text */}
          <div className="my-4 flex items-center">
            <Separator className="flex-grow w-1" />
            <span className="px-2 text-sm text-gray-500">OR CONTINUE WITH</span>
            <Separator className="flex-grow w-1" />
          </div>

          {/* GitHub Button */}
          <Button variant="outline" className="w-full mb-6">
            <Github className="mr-2" /> GitHub
          </Button>

          {/* Terms and Privacy */}
          <p className="text-sm text-[#71717A] text-center mx-10">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline">Terms of Service</Link> and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>.
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
