// ./src/components/OrganizationTable.tsx
"use client";

import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Organization {
  name: string;
  username: string;
  email: string;
  type: string;
  website: string;
  postType: string;
}

interface OrganizationTableProps {
  organizations: Organization[];
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({ organizations }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Organization Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Post Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org, index) => (
          <TableRow key={index}>
            <TableCell>{org.name}</TableCell>
            <TableCell>{org.username}</TableCell>
            <TableCell>{org.email}</TableCell>
            <TableCell>{org.type}</TableCell>
            <TableCell>
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {org.website}
              </a>
            </TableCell>
            <TableCell>{org.postType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrganizationTable;
