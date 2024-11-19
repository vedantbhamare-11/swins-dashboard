import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserProfileModal from "@/components/UserProfileModal";

interface Leader {
  rank: number;
  name: string;
  department: string;
  role: string;
  points: number;
  profilePic: string;
  email: string;
  designation: string;
}

interface LeaderboardTableProps {
  data: Leader[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState<Leader | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (user: Leader) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((leader) => (
            <TableRow key={leader.rank}>
              <TableCell>{leader.rank}</TableCell>
              <TableCell>{leader.name}</TableCell>
              <TableCell>{leader.department}</TableCell>
              <TableCell>{leader.role}</TableCell>
              <TableCell>{leader.points}</TableCell>
              <TableCell>
                <Button className="text-sm p-2" onClick={() => handleViewProfile(leader)}>
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserProfileModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={{
            name: selectedUser.name,
            email: selectedUser.email,
            profilePic: selectedUser.profilePic,
            points: selectedUser.points,
            department: selectedUser.department,
            role: selectedUser.role,
            designation: selectedUser.designation
          }}
        />
      )}
    </>
  );
};

export default LeaderboardTable;
