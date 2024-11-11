// ./src/components/FeedbackTable.tsx
"use client";

import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 
import FeedbackDetailsModal from "@/components/FeedbackDetailsModal"; // Import the new modal component

interface Feedback {
  feedback: string;
  sharedTo: string;
  sharedBy: string;
  time: string;
  status: string;
}

interface FeedbackTableProps {
  feedbacks: Feedback[];
  searchQuery: string;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks, searchQuery }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null); // Store selected feedback
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleOpenDialog = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Function to handle the "Read more" text
  const truncateText = (text: string, limit: number = 40) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  // Filter feedbacks based on search query (feedback text, sharedTo, sharedBy)
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.sharedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.sharedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feedback</TableHead>
            <TableHead>Shared To</TableHead>
            <TableHead>Shared By</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFeedbacks.map((feedback, index) => (
            <TableRow key={index}>
              <TableCell>{truncateText(feedback.feedback)}</TableCell>
              <TableCell>{feedback.sharedTo}</TableCell>
              <TableCell>{feedback.sharedBy}</TableCell>
              <TableCell>{feedback.time}</TableCell>
              <TableCell>
                {/* Apply the color based on status */}
                <span
                  style={{
                    color: feedback.status === "Accepted" ? "#3EC91B" : 
                           feedback.status === "Flagged" ? "#006A9F" : "black",
                  }}
                >
                  {feedback.status}
                </span>
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleOpenDialog(feedback)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog Modal for viewing feedback */}
      <FeedbackDetailsModal 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        feedback={selectedFeedback} 
      />
    </>
  );
};

export default FeedbackTable;
