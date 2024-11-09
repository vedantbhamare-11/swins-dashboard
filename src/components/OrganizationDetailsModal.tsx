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
    }
  }, [selectedOrg]);

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
    if (numEmployees === "" || foundedDate === undefined) {
      setErrors({
        numEmployees: "Number of Employees is required",
        foundedDate: "Founded Date is required",
      });
      return;
    }

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
  };

  const handleDiscard = () => {
    setNumEmployees("");
    setFoundedDate(undefined);
    setSelectedImage(null);
    setOrgDescription("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="relative flex gap-8">
          <div className="w-1/2 space-y-4">
            <div>
              <Label htmlFor="orgName">Organisation Name</Label>
              <Input
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="orgType">Organisation Type</Label>
              <Input
                id="orgType"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="adminName">Admin Name</Label>
              <Input
                id="adminName"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/2 space-y-4">
            <div>
              <Label htmlFor="description">Organisation Description</Label>
              <Input
                id="description"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
              />
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
              {errors.selectedImage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.selectedImage}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="outline" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetailsModal;
