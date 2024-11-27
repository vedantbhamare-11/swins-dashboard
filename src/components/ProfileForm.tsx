import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface ProfileFormProps {
    fullName: string;
    reportingManager: string | undefined;
    designation: string;
    department: string | undefined;
    dateOfBirth: Date | undefined;
    errors: Record<string, string>;
    users: { id: string | number; name: string }[];
    departments: string[];
    setFullName: (value: string) => void;
    setReportingManager: (value: string | undefined) => void;
    setDesignation: (value: string) => void;
    setDepartment: (value: string | undefined) => void;
    setDateOfBirth: (value: Date | undefined) => void;
  }
  

const ProfileForm: React.FC<ProfileFormProps> = ({
  fullName,
  reportingManager,
  designation,
  department,
  dateOfBirth,
  errors,
  users,
  departments,
  setFullName,
  setReportingManager,
  setDesignation,
  setDepartment,
  setDateOfBirth,
}) => (
  <form className="grid grid-cols-1 gap-6 space-y-1 w-[60%] p-6">
    <div>
      <Input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full"
      />
      {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
    </div>

    <div>
      <Select onValueChange={setReportingManager} value={reportingManager}>
        <SelectTrigger className={`w-full ${reportingManager ? "text-black" : "text-gray-500"}`}>
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
      {errors.reportingManager && <p className="text-red-600 text-sm">{errors.reportingManager}</p>}
    </div>

    <div>
      <Input
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="w-full"
      />
      {errors.designation && <p className="text-red-600 text-sm">{errors.designation}</p>}
    </div>

    <div>
      <Select onValueChange={setDepartment} value={department}>
        <SelectTrigger className={`w-full ${department ? "text-black" : "text-gray-500"}`}>
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
      {errors.department && <p className="text-red-600 text-sm">{errors.department}</p>}
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
);

export default ProfileForm;
