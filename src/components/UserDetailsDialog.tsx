// ./src/components/UserDetailsDialog.tsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import type { User } from "@/redux/slices/userManagementSlice";

interface UserDetailsDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void; // Pass in onSave for updating
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ user, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<"User" | "Admin">(user.role);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setProfilePic(user.profilePic);
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...user, name, email, role, profilePic });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="flex">
          <div className="w-3/5 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "User" | "Admin")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="w-2/5 flex flex-col justify-center relative">
            <Label className="ml-4 mb-2">Profile Picture</Label>
            <div className="w-[80%] border rounded-md overflow-hidden ml-4 p-2 relative">
              <img src={profilePic} alt={user.name} className="w-full h-full object-cover" />
              <label htmlFor="profile-pic-upload" className="absolute bottom-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer">
                <SquarePen className="text-gray-500" size={14} />
              </label>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-center space-x-4 w-full">
          <Button className="w-1/2" variant="outline" onClick={onClose}>
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

export default UserDetailsDialog;
