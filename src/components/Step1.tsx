import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface Step1Props {
  orgName: string;
  setOrgName: (value: string) => void;
  orgType: string;
  setOrgType: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
  errors: {
    orgName: string;
    orgType: string;
    website: string;
    address: string;
    selectedImage: string;
  };
}

const Step1: React.FC<Step1Props> = ({
  orgName,
  setOrgName,
  orgType,
  setOrgType,
  website,
  setWebsite,
  address,
  setAddress,
  selectedImage,
  setSelectedImage,
  errors,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 min-h-[300px]">
      <div className="w-3/5 space-y-4">
        <div>
          <Label htmlFor="orgName">Organization Name</Label>
          <Input
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter organization name"
            className={errors.orgName ? "border-red-500" : ""}
          />
          {errors.orgName && <p className="text-red-500 text-xs mt-1">{errors.orgName}</p>}
        </div>
        <div>
          <Label htmlFor="orgType">Organization Type</Label>
          <Input
            id="orgType"
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
            placeholder="Enter organization type"
            className={errors.orgType ? "border-red-500" : ""}
          />
          {errors.orgType && <p className="text-red-500 text-xs mt-1">{errors.orgType}</p>}
        </div>
        <div>
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter website URL"
            className={errors.website ? "border-red-500" : ""}
          />
          {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter organization address"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
      </div>

      <div className="w-2/5">
        <Label htmlFor="logo-upload" className="block text-gray-700 text-sm  mb-1">Logo</Label>
        <label htmlFor="logo-upload" className="border border-gray-300 rounded-md p-2 flex h-[90%] items-center justify-center cursor-pointer">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected Logo" className="w-[250px] h-[250px] object-contain" />
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
        {errors.selectedImage && <p className="text-red-500 text-xs mt-1">{errors.selectedImage}</p>}
      </div>
    </div>
  );
};

export default Step1;
