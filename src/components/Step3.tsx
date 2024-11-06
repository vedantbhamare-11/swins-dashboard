import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Earth } from "lucide-react";

interface Step3Props {
  handleSubmit: () => void;
}

const Step3: React.FC<Step3Props> = ({ handleSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<"public" | "admin" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (option: "public" | "admin") => {
    setSelectedOption(option);
    setError(null); 
  };

  const handleAddOrganization = () => {
    if (!selectedOption) {
      setError("Please select an option before proceeding.");
      return;
    }
    handleSubmit(); 
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered Card Container */}
      <div className="flex gap-4 mb-6 min-h-[300px] justify-center">
        {/* Public Post Card */}
        <div
          onClick={() => handleOptionSelect("public")}
          className={`w-[200px] h-[200px] bg-[#FAFAFA] p-4 mt-10 rounded-md text-center cursor-pointer flex flex-col justify-center ${
            selectedOption === "public" ? "border border-[#CBCACA]" : ""
          }`}
        >
          <Earth className="mx-auto mb-2" size={24} />
          <h3 className="font-bold">Post Publicly</h3>
          <p className="text-sm text-gray-600">
            "Post Publicly" shares updates instantly for broad visibility and engagement.
          </p>
        </div>

        {/* Admin Approval Card */}
        <div
          onClick={() => handleOptionSelect("admin")}
          className={`w-[200px] h-[200px] bg-[#FAFAFA] p-4 mt-10 rounded-md text-center cursor-pointer flex flex-col justify-center ${
            selectedOption === "admin" ? "border border-[#CBCACA]" : ""
          }`}
        >
          <ShieldCheck className="mx-auto mb-2" size={24} />
          <h3 className="font-bold">Admin Approved</h3>
          <p className="text-sm text-gray-600">
            "Admin Approval" submits posts for review before publishing.
          </p>
        </div>
      </div>

      {/* Display Error Message if Validation Fails */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="text-center w-full">
        <Button onClick={handleAddOrganization} className="w-[60%] max-w-xs mx-auto">
          Add Organization
        </Button>
      </div>
    </div>
  );
};

export default Step3;
