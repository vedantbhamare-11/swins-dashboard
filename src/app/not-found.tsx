"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-white">
      {/* Large 404 Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 text-gray-400 tracking-widest font-bold text-[15rem] sm:text-[25rem] select-none">
        404
      </div>

      {/* Foreground Content */}
      <div className="z-10 text-center">
        {/* Heading */}
        <h1 className="text-5xl font-bold mb-6 ">Page Not Found</h1>

        {/* Subheading */}
        <p className=" mb-8 text-lg">
          The page you're looking for doesn't exist. Maybe it's on vacation, <br /> or it just moved. Let's get you back on track!
        </p>

        {/* Button */}
        <Button onClick={handleGoHome} className="px-8 py-4 w-1/2">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
