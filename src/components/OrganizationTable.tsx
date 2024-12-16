"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import OrganizationActionsPopover from "@/components/OrganizationActionsPopover";
import { useDispatch } from "react-redux";
import { updatePostPreference } from "@/redux/slices/organizationManagementSlice";

interface Organization {
  name: string;
  username: string;
  email: string;
  type: string;
  website: string;
  postType: "Admin Approved" | "Post Publicly";
}

interface OrganizationTableProps {
  organizations: Organization[];
  onShowDetails: (org: Organization) => void;
  onPostPreference: (org: Organization) => void;
  onSuspend: (org: Organization) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  organizations,
  onShowDetails,
  onPostPreference,
  onSuspend,
}) => {
  const dispatch = useDispatch();

  const handlePostPreference = (org: Organization) => {
    onPostPreference(org);
    dispatch(
      updatePostPreference({
        organizationName: org.name,
        postType: org.postType,
      })
    );
  };

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
          <TableHead>Actions</TableHead>
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
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover"
              >
                {org.website}
              </a>
            </TableCell>
            <TableCell>{org.postType}</TableCell>
            <TableCell>
              {/* Ellipsis icon button for actions */}
              <OrganizationActionsPopover
                onShowDetails={() => onShowDetails(org)} // Passing full organization details
                onPostPreference={() => handlePostPreference(org)} // Passing post preference handler
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrganizationTable;
