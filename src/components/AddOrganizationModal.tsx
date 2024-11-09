"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addOrganization } from "@/redux/slices/organizationManagementSlice";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/Stepper";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);

  // State for each step
  const [orgName, setOrgName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [orgType, setOrgType] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [numEmployees, setNumEmployees] = useState("");
  const [foundedDate, setFoundedDate] = useState<Date | undefined>(undefined);
  const [postType, setPostType] = useState<"Admin Approved" | "Post Publicly">("Post Publicly");

  // State to hold validation errors for each step
  const [errors, setErrors] = useState({
    orgName: "",
    orgType: "",
    website: "",
    address: "",
    selectedImage: "",
    adminName: "",
    adminEmail: "",
    jobTitle: "",
    orgDescription: "",
    numEmployees: "",
    foundedDate: ""
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const resetForm = () => {
    setCurrentStep(1);
    setOrgName("");
    setUsername("");
    setEmail("");
    setOrgType("");
    setWebsite("");
    setAddress("");
    setSelectedImage(null);
    setAdminName("");
    setAdminEmail("");
    setJobTitle("");
    setOrgDescription("");
    setNumEmployees("");
    setFoundedDate(undefined);
    setPostType("Post Publicly");
    setErrors({
      orgName: "",
      orgType: "",
      website: "",
      address: "",
      selectedImage: "",
      adminName: "",
      adminEmail: "",
      jobTitle: "",
      orgDescription: "",
      numEmployees: "",
      foundedDate: ""
    });
  };

  const validateStep1 = () => {
    const newErrors = {
      orgName: orgName ? "" : "Organization name is required.",
      orgType: orgType ? "" : "Organization type is required.",
      website: website.match(/^https?:\/\/\S+\.\S+/) ? "" : "Please enter a valid URL.",
      address: address ? "" : "Address is required.",
      selectedImage: selectedImage ? "" : "Logo image is required.",
      adminName: errors.adminName,
      adminEmail: errors.adminEmail,
      jobTitle: errors.jobTitle,
      orgDescription: errors.orgDescription,
      numEmployees: errors.numEmployees,
      foundedDate: errors.foundedDate
    };
    setErrors(newErrors);
    return !Object.values(newErrors).slice(0, 5).some((error) => error !== "");
  };

  const validateStep2 = () => {
    const newErrors = {
      ...errors,
      adminName: adminName ? "" : "Admin name is required.",
      adminEmail: adminEmail.match(/^\S+@\S+\.\S+$/) ? "" : "Please enter a valid email.",
      jobTitle: jobTitle ? "" : "Job title is required.",
      orgDescription: orgDescription ? "" : "Organization description is required.",
      numEmployees: numEmployees && !isNaN(Number(numEmployees)) ? "" : "Enter a valid number of employees.",
      foundedDate: foundedDate ? "" : "Founded date is required."
    };
    setErrors(newErrors);
    return !Object.values(newErrors).slice(5).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    } else {
      // Dispatch the addOrganization action with all the required fields
      dispatch(
        addOrganization({
          name: orgName,
          username: adminName, // admin name from step 2
          email: adminEmail, // admin email from step 2
          type: orgType,
          website,
          address, // address from step 1
          adminName, // admin name from step 2
          jobTitle, // job title from step 2
          orgDescription, // organization description from step 2
          numEmployees, // number of employees from step 2
          foundedDate, // founded date from step 2
          logo: selectedImage, // logo from step 1
          postType,
          adminEmail: ""
        })
      );
      onClose();
      resetForm(); 
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative mx-auto p-6 bg-white rounded-lg shadow-lg w-full max-w-[800px]">
        <button onClick={() => { onClose(); resetForm(); }} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">Add Organization</h2>
          <p className="text-gray-500 text-sm">Enter Organization details to sign up</p>
        </div>

        <Stepper currentStep={currentStep} />

        {currentStep === 1 ? (
          <Step1
            orgName={orgName}
            setOrgName={setOrgName}
            orgType={orgType}
            setOrgType={setOrgType}
            website={website}
            setWebsite={setWebsite}
            address={address}
            setAddress={setAddress}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            errors={errors}
          />
        ) : currentStep === 2 ? (
          <Step2
            adminName={adminName}
            setAdminName={setAdminName}
            adminEmail={adminEmail}
            setAdminEmail={setAdminEmail}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            orgDescription={orgDescription}
            setOrgDescription={setOrgDescription}
            numEmployees={numEmployees}
            setNumEmployees={setNumEmployees}
            foundedDate={foundedDate}
            setFoundedDate={setFoundedDate}
            errors={errors}
          />
        ) : (
          <Step3 handleSubmit={handleSubmit} />
        )}

        {currentStep < 3 && (
          <div className="mt-6 text-center">
            <Button onClick={handleSubmit} className="w-[50%]">
              {currentStep < 2 ? "Continue" : "Add Organization"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOrganizationModal;
