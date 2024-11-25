import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    profilePic: string;
    points: number;
    department: string;
    role: string;
    designation: string;
  };
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-auto h-[55vh] rounded-lg p-0 overflow-hidden">
        {/* Profile Picture Section */}
        <div className="relative w-full h-full">
          <img
            src={user.profilePic}
            alt={`${user.name}'s profile`}
            className="absolute w-full h-full object-cover"
          />

        {/* Details Card */}
        <div className="relative bg-white top-[70%] mx-4 rounded-lg p-4">
          <div className="flex justify-between items-start">
            {/* Left Side: Name and Email */}
            <div>
              <h1 className="text-lg font-bold">{user.name}</h1>
              <p className="text-sm text-[#929292]">{user.email}</p>
            </div>

            {/* Right Side: Points */}
            <div className="text-right">
              <h1 className="text-3xl font-bold">{user.points}</h1>
              <p className="text-sm font-medium text-[#929292]">Points</p>
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex justify-start space-x-2 mt-4">
            <span className="border border-[#929292] text-xs font-medium px-3 py-1 rounded-full">
              {user.department}
            </span>
            <span className="border border-[#929292] text-xs font-medium px-3 py-1 rounded-full">
              {user.role}
            </span>
            <span className="border border-[#929292] text-xs font-medium px-3 py-1 rounded-full">
              {user.designation}
            </span>
          </div>
        </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
