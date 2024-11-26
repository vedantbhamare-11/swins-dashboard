"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Logo from "@/app/assets/logo_light_theme.png";
import { CloudUpload, File, Folder, CalendarIcon, Monitor } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";

const CompleteProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [reportingManager, setReportingManager] = useState<string | undefined>(
    undefined
  );
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    console.log("Save Changes");
    setIsDialogOpen(false);
  };

  const handleSaveProfile = () => {
    if (validateInputs()) {
      console.log("Profile saved successfully!");

      router.push("/dashboard");
    }
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
        <p className="text-gray-600 mt-2">
          Build a profile that represents you!
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl flex">
        {/* Left Section: Input Fields */}
        <div className="w-[60%] p-6">
          <form className="grid grid-cols-1 gap-6 space-y-1">
            <div>
              <Input
                placeholder="Full Name"
                className="w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Reporting Manager Dropdown */}
            <div>
              <Select
                onValueChange={setReportingManager}
                value={reportingManager}
              >
                <SelectTrigger
                  className={`w-full ${
                    reportingManager ? "text-black" : "text-gray-500"
                  }`}
                >
                  <SelectValue placeholder="Your Reporting Manager" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reportingManager && (
                <p className="text-red-600 text-sm">{errors.reportingManager}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Designation"
                className="w-full"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              {errors.designation && (
                <p className="text-red-600 text-sm">{errors.designation}</p>
              )}
            </div>

            {/* Department Dropdown */}
            <div>
              <Select onValueChange={setDepartment} value={department}>
                <SelectTrigger
                  className={`w-full ${
                    department ? "text-black" : "text-gray-500"
                  }`}
                >
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-red-600 text-sm">{errors.department}</p>
              )}
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal `}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {dateOfBirth ? (
                      format(dateOfBirth, "PPP")
                    ) : (
                      <span className="text-gray-500">Your Date of Birth</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={(day) => setDateOfBirth(day)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm">{errors.dateOfBirth}</p>
              )}
            </div>
          </form>
        </div>

        {/* Right Section: Upload Image */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="w-[40%] h-[20rem] p-4 mt-6 flex rounded-md flex-col border border-dashed border-gray-300  items-center cursor-pointer">
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <Image
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Preview"
                    width={160}
                    height={160}
                    className="w-auto h-[20rem]  rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <CloudUpload size={40} className="" />
                    <p className="text-gray-600 mt-4">
                      Upload your profile picture
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className="text-center mb-4">
              <h2 className="text-xl text-center font-semibold">Choose Image</h2>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => document.getElementById("upload-computer")?.click()}
                className="p-4 border rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                <Monitor size={40} />
                <p className="mt-2">Upload from Computer</p>
                <input
                  id="upload-computer"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageUpload(e.target.files?.[0] || null)
                  }
                />
              </div>
              <div className="p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                <Folder size={40} />
                <p className="mt-2">Choose from Library</p>
              </div>
            </div>
            <Button className="w-full" onClick={handleSaveChanges}>
              Done
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Button className="mt-8 w-full max-w-4xl h-12" onClick={handleSaveProfile}>
        Save Profile
      </Button>
    </div>
  );
};

export default CompleteProfile;
