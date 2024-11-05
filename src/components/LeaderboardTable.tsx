// ./components/LeaderboardTable.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Leader {
  rank: number;
  name: string;
  department: string;
  role: string;
  points: number;
}

interface LeaderboardTableProps {
  data: Leader[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  return (
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
              <Button className="text-sm">
                View Profile
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
