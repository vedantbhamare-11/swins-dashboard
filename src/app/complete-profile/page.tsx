"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Logo from "@/app/assets/logo_light_theme.png";
import ProfileForm from "@/components/ProfileForm";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

const CompleteProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [reportingManager, setReportingManager] = useState<string | undefined>(
    undefined
  );
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const users = useSelector((state: RootState) => state.userManagement.users);
  const leaderboard = useSelector((state: RootState) => state.leaderboard);

  const departments = Array.from(
    new Set([
      ...leaderboard.weekly.map((leader) => leader.department),
      ...leaderboard.monthly.map((leader) => leader.department),
      ...leaderboard.annually.map((leader) => leader.department),
    ])
  );

  const router = useRouter();

  const handleImageUpload = (file: File | null) => {
    if (file) setProfileImage(file);
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!reportingManager) newErrors.reportingManager = "Reporting Manager is required.";
    if (!designation.trim()) newErrors.designation = "Designation is required.";
    if (!department) newErrors.department = "Department is required.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!profileImage) newErrors.profileImage = "Profile image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (validateInputs()) {
      setIsModalOpen(true); // Open success modal
    }
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      {/* Logo */}
      <div className="w-full flex justify-start mb-8">
        <Image src={Logo} alt="Small Wins Logo" width={170} height={50} />
      </div>

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-gray-600 mt-2">Build a profile that represents you!</p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl flex">
        {/* Left Section: Input Fields */}
        <ProfileForm
          fullName={fullName}
          reportingManager={reportingManager}
          designation={designation}
          department={department}
          dateOfBirth={dateOfBirth}
          errors={errors}
          users={users}
          departments={departments}
          setFullName={setFullName}
          setReportingManager={setReportingManager}
          setDesignation={setDesignation}
          setDepartment={setDepartment}
          setDateOfBirth={setDateOfBirth}
        />

        {/* Right Section: Upload Image */}
        <div className="w-[40%]">
          <ProfileImageUpload
            profileImage={profileImage}
            handleImageUpload={handleImageUpload}
          />
          {errors.profileImage && (
            <p className="text-red-600 text-sm text-center mt-2">
              {errors.profileImage}
            </p>
          )}
        </div>
      </div>

      {/* Save Profile Button */}
      <Button className="mt-8 w-[30%] h-12" onClick={handleSaveProfile}>
        Save Profile
      </Button>

      {/* Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex flex-col items-center justify-center p-8 space-y-6">
          <div className="w-15 h-15 p-2 rounded-full bg-black flex items-center justify-center">
            <Check size={40} color="white" />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            Your Profile Has <br /> Been Set Up
          </h2>
          <Button className="w-full" onClick={handleContinue}>
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompleteProfile;
