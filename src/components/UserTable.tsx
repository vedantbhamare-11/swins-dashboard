import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin";
  lastActive: string;
  status: "Active" | "Inactive";
  profilePic: string;
  reportedTo?: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
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
          <TableRow key={user.id}>
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
              <Button variant="ghost">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
