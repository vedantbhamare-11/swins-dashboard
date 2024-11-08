// ./src/components/UserTable.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserActionsPopover from "@/components/UserActionsPopover";
import UserDetailsDialog from "@/components/UserDetailsDialog";
import { deleteUser, updateUser } from "@/redux/slices/userManagementSlice";
import type { User } from "@/redux/slices/userManagementSlice";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const handleShowDetails = (user: User) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleSaveUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser));
    handleCloseDetailsDialog();
  };

  return (
    <>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported To</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}> {/* Ensure each row uses a unique key */}
              <TableCell className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profilePic} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.reportedTo || "N/A"}</TableCell>
              <TableCell>
                <UserActionsPopover
                  onShowDetails={() => handleShowDetails(user)}
                  onSuspend={() => console.log(`Suspend user ${user.id}`)}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Show Details Dialog */}
      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          isOpen={showDetailsDialog}
          onClose={handleCloseDetailsDialog}
          onSave={handleSaveUser} // Pass the handleSaveUser function as the onSave prop
        />
      )}
    </>
  );
};

export default UserTable;
