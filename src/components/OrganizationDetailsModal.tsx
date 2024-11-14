import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Upload } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { updateOrganization } from "@/redux/slices/organizationManagementSlice";

interface OrganizationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrg: any;
}

const OrganizationDetailsModal: React.FC<OrganizationDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedOrg,
}) => {
  const dispatch = useDispatch();

  // State management with initial values from selectedOrg
  const [orgName, setOrgName] = useState<string>(selectedOrg?.name || "");
  const [orgType, setOrgType] = useState<string>(selectedOrg?.type || "");
  const [website, setWebsite] = useState<string>(selectedOrg?.website || "");
  const [address, setAddress] = useState<string>(selectedOrg?.address || "");
  const [adminName, setAdminName] = useState<string>(
    selectedOrg?.adminName || ""
  );
  const [email, setEmail] = useState<string>(selectedOrg?.email || "");
  const [jobTitle, setJobTitle] = useState<string>(selectedOrg?.jobTitle || "");
  const [numEmployees, setNumEmployees] = useState<number | string>(
    selectedOrg?.numEmployees || ""
  );
  const [foundedDate, setFoundedDate] = useState<Date | undefined>(
    selectedOrg?.foundedDate || undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    selectedOrg?.logo || null
  );
  const [orgDescription, setOrgDescription] = useState<string>(
    selectedOrg?.orgDescription || ""
  );
  const [errors, setErrors] = useState<any>({});

  // Update state when selectedOrg changes
  useEffect(() => {
    if (selectedOrg) {
      setOrgName(selectedOrg.name);
      setOrgType(selectedOrg.type);
      setWebsite(selectedOrg.website);
      setAddress(selectedOrg.address);
      setAdminName(selectedOrg.adminName);
      setEmail(selectedOrg.email);
      setJobTitle(selectedOrg.jobTitle);
      setNumEmployees(selectedOrg.numEmployees);
      setFoundedDate(selectedOrg.foundedDate);
      setSelectedImage(selectedOrg.logo);
      setOrgDescription(selectedOrg.orgDescription);
      setErrors({});
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

  // Handle logo file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle save action
  const handleSave = () => {
    if (validateInputs()) {
      // Dispatch the update action with the modified data
      dispatch(
        updateOrganization({
          ...selectedOrg,
          name: orgName,
          type: orgType,
          website,
          address,
          adminName,
          email,
          jobTitle,
          numEmployees,
          foundedDate,
          logo: selectedImage,
          orgDescription,
        })
      );
      onClose();
    }
  };

  const handleDiscard = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-auto">
        <div className="relative flex gap-8 h-auto">
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

            <div className="mt-4 w-full h-1/2">
              <Label
                htmlFor="logo-upload"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Logo
              </Label>
              <label
                htmlFor="logo-upload"
                className="border border-gray-300 rounded-md p-4 flex h-[90%] items-center justify-center cursor-pointer"
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
        </div>

        <DialogFooter className=" flex justify-between">
          <Button className="w-1/2" variant="outline" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button className="w-1/2" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetailsModal;
