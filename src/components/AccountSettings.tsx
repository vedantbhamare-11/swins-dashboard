"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { RootState } from "@/redux/store"; // Adjust this import to match your Redux store structure
import { useSelector } from "react-redux";


const AccountSettings: React.FC = () => {
  const organizations = useSelector((state: RootState) => state.organizationManagement.organizations);

  const [selectedOrg] = useState(organizations[0] || {});
  const [orgName, setOrgName] = useState<string>("");
  const [orgType, setOrgType] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [numEmployees, setNumEmployees] = useState<number | string>("");
  const [foundedDate, setFoundedDate] = useState<Date | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [orgDescription, setOrgDescription] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (selectedOrg) {
      setOrgName(selectedOrg.name || "");
      setOrgType(selectedOrg.type || "");
      setWebsite(selectedOrg.website || "");
      setAddress(selectedOrg.address || "");
      setAdminName(selectedOrg.adminName || "");
      setEmail(selectedOrg.email || "");
      setJobTitle(selectedOrg.jobTitle || "");
      setNumEmployees(selectedOrg.numEmployees || "");
      setFoundedDate(selectedOrg.foundedDate || undefined);
      setSelectedImage(selectedOrg.logo || null);
      setOrgDescription(selectedOrg.orgDescription || "");
    }
  }, [selectedOrg]);

  const validateInputs = () => {
    const newErrors: any = {};

    if (!orgName.trim()) newErrors.orgName = "Organization name is required";
    if (!orgType.trim()) newErrors.orgType = "Organization type is required";
    if (!website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(website)) {
      newErrors.website = "Invalid URL format";
    }
    if (!address.trim()) newErrors.address = "Address is required";
    if (!adminName.trim()) newErrors.adminName = "Admin name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!numEmployees) {
      newErrors.numEmployees = "Number of employees is required";
    } else if (isNaN(Number(numEmployees)) || Number(numEmployees) <= 0) {
      newErrors.numEmployees = "Enter a valid number of employees";
    }
    if (!foundedDate) newErrors.foundedDate = "Founded date is required";
    if (!orgDescription.trim())
      newErrors.orgDescription = "Organization description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      // Submit form logic
      console.log({
        orgName,
        orgType,
        website,
        address,
        adminName,
        email,
        jobTitle,
        numEmployees,
        foundedDate,
        selectedImage,
        orgDescription,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
        <p>Manage your organisation’s Profile</p>
      </CardHeader>
      <CardContent className="relative flex gap-8 h-auto mt-2">
                <div className="w-1/2 space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organisation Name</Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className={errors.orgName ? "border-red-500" : ""}
                    />
                    {errors.orgName && (
                      <p className="text-red-500 text-xs mt-1">{errors.orgName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="orgType">Organisation Type</Label>
                    <Input
                      id="orgType"
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className={errors.orgType ? "border-red-500" : ""}
                    />
                    {errors.orgType && (
                      <p className="text-red-500 text-xs mt-1">{errors.orgType}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className={errors.website ? "border-red-500" : ""}
                    />
                    {errors.website && (
                      <p className="text-red-500 text-xs mt-1">{errors.website}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="adminName">Admin Name</Label>
                    <Input
                      id="adminName"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className={errors.adminName ? "border-red-500" : ""}
                    />
                    {errors.adminName && (
                      <p className="text-red-500 text-xs mt-1">{errors.adminName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className={errors.jobTitle ? "border-red-500" : ""}
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                    )}
                  </div>
                </div>
      
                <div className="w-1/2 space-y-4">
                  <div>
                    <Label htmlFor="description">Organisation Description</Label>
                    <Input
                      id="description"
                      value={orgDescription}
                      onChange={(e) => setOrgDescription(e.target.value)}
                      className={errors.orgDescription ? "border-red-500" : ""}
                    />
                    {errors.orgDescription && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.orgDescription}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Input
                      id="employees"
                      type="number"
                      min="1"
                      value={numEmployees}
                      onChange={(e) => setNumEmployees(e.target.value)}
                      placeholder="Enter number of employees"
                      className={errors.numEmployees ? "border-red-500" : ""}
                    />
                    {errors.numEmployees && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.numEmployees}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="foundedDate">Founded Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            errors.foundedDate ? "border-red-500" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {foundedDate ? (
                            format(foundedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={foundedDate}
                          onSelect={setFoundedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.foundedDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.foundedDate}
                      </p>
                    )}
                  </div>
      
                  <div className="w-full h-1/2">
                    <Label
                      htmlFor="logo-upload"
                      className="block text-gray-700 text-sm mb-1"
                    >
                      Logo
                    </Label>
                    <label
                      htmlFor="logo-upload"
                      className="border border-gray-300 rounded-md p-2 flex h-[280px] w-full items-center justify-center cursor-pointer"
                    >
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Selected Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="border-2 border-dashed border-[#E4E4E7] rounded-md w-full h-full flex items-center justify-center text-gray-500 space-x-2">
                          <Upload className="w-5 h-5" />
                          <span className="text-xs">Choose your image</span>
                        </div>
                      )}
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button type="submit" className="w-1/3">Save Account Settings</Button>
              </CardFooter>
    </Card>
  );
};

export default AccountSettings;
