import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Step2Props {
  adminName: string;
  setAdminName: (value: string) => void;
  adminEmail: string;
  setAdminEmail: (value: string) => void;
  jobTitle: string;
  setJobTitle: (value: string) => void;
  orgDescription: string;
  setOrgDescription: (value: string) => void;
  numEmployees: string;
  setNumEmployees: (value: string) => void;
  foundedDate: Date | undefined;
  setFoundedDate: (value: Date | undefined) => void;
  errors: {
    adminName: string;
    adminEmail: string;
    jobTitle: string;
    orgDescription: string;
    numEmployees: string;
    foundedDate: string;
  };
}

const Step2: React.FC<Step2Props> = ({
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  jobTitle,
  setJobTitle,
  orgDescription,
  setOrgDescription,
  numEmployees,
  setNumEmployees,
  foundedDate,
  setFoundedDate,
  errors,
}) => (
  <div className="flex gap-4 min-h-[300px]">
    <div className="w-1/2 space-y-6">
      <div>
        <Label htmlFor="adminName">Admin Name</Label>
        <Input
          id="adminName"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          placeholder="Enter admin name"
          className={errors.adminName ? "border-red-500" : ""}
        />
        {errors.adminName && <p className="text-red-500 text-xs mt-1">{errors.adminName}</p>}
      </div>
      <div>
        <Label htmlFor="adminEmail">Admin Email</Label>
        <Input
          id="adminEmail"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          placeholder="Enter admin email"
          className={errors.adminEmail ? "border-red-500" : ""}
        />
        {errors.adminEmail && <p className="text-red-500 text-xs mt-1">{errors.adminEmail}</p>}
      </div>
      <div>
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
          className={errors.jobTitle ? "border-red-500" : ""}
        />
        {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
      </div>
    </div>

    <div className="w-1/2 space-y-6">
      <div>
        <Label htmlFor="description">Organization Description</Label>
        <Input
          id="description"
          value={orgDescription}
          onChange={(e) => setOrgDescription(e.target.value)}
          placeholder="Enter organization description"
          className={errors.orgDescription ? "border-red-500" : ""}
        />
        {errors.orgDescription && <p className="text-red-500 text-xs mt-1">{errors.orgDescription}</p>}
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
        {errors.numEmployees && <p className="text-red-500 text-xs mt-1">{errors.numEmployees}</p>}
      </div>
      <div>
        <Label htmlFor="foundedDate">Founded Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`w-full justify-start text-left font-normal ${errors.foundedDate ? "border-red-500" : ""}`}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {foundedDate ? format(foundedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={foundedDate} onSelect={setFoundedDate} initialFocus />
          </PopoverContent>
        </Popover>
        {errors.foundedDate && <p className="text-red-500 text-xs mt-1">{errors.foundedDate}</p>}
      </div>
    </div>
  </div>
);

export default Step2;
