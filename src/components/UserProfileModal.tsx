import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

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
      <DialogContent className="w-auto rounded-lg p-0 overflow-hidden">
        <DialogHeader className="relative">
          <div className="relative w-full h-[300px]">
            <img
              src={user.profilePic}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 text-white">
              <div className="text-lg font-semibold">{user.name}</div>
              <div className="text-xs">{user.email}</div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg"
            ></button>
          </div>
        </DialogHeader>

        <div className="my-4 px-4">
          <h1 className="text-5xl text-center font-bold">{user.points}</h1>
          <p className="text-lg text-center font-semibold">Points</p>
        </div>

        <div className="flex justify-center space-x-2 mb-4 px-4">
          <span className="bg-[#F0F0F0]  text-xs font-medium px-3 py-1 rounded-sm">
            {user.department}
          </span>
          <span className="bg-[#F0F0F0] text-xs font-medium px-3 py-1 rounded-sm">
            {user.role}
          </span>
          <span className="bg-[#F0F0F0] text-xs font-medium px-3 py-1 rounded-sm">
            {user.designation}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
