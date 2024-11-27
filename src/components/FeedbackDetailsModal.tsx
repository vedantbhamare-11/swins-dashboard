"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock9 } from "lucide-react"; // For the clock icon
import ActionModal from "@/components/FeedbackActionModal"; // Import the reusable ActionModal component

interface Feedback {
  feedback: string;
  sharedTo: string;
  sharedBy: string;
  time: string;
  status: string;
}

interface FeedbackDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: Feedback | null;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({ isOpen, onClose, feedback }) => {
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [actionDetails, setActionDetails] = useState("");

  if (!feedback) return null;

  const handleFlag = () => {
    console.log("Flagging feedback with details:", actionDetails);
    setIsFlagModalOpen(false);
  };

  const handleReject = () => {
    console.log("Rejecting feedback with details:", actionDetails);
    setIsRejectModalOpen(false);
  };

  const openFlagModal = () => {
    setIsFlagModalOpen(true);
    onClose();
  };

  const openRejectModal = () => {
    setIsRejectModalOpen(true);
    onClose();
  };

  const renderButtons = () => {
    if (feedback.status === "Pending") {
      return (
        <>
          <Button
            className="w-1/3 bg-[#C5ECFF] text-[#006A9F] hover:bg-[#A3D6E9]"
            onClick={openFlagModal}
          >
            Flag
          </Button>
          <Button
            className="w-1/3 bg-[#FFD8D8] text-[#EF5050] hover:bg-[#F7B5B5]"
            onClick={openRejectModal}
          >
            Reject
          </Button>
          <Button
            className="w-1/3 text-[#327222] bg-[#E2F9D6] hover:bg-[#C4E7A0]"
            onClick={() => alert("Feedback accepted")}
          >
            Accept
          </Button>
        </>
      );
    }

    if (feedback.status === "Accepted") {
      return (
        <>
          <Button
            className="w-1/2 bg-[#C5ECFF] text-[#006A9F] hover:bg-[#A3D6E9]"
            onClick={openFlagModal}
          >
            Flag
          </Button>
          <Button
            className="w-1/2 bg-[#FFD8D8] text-[#EF5050] hover:bg-[#F7B5B5]"
            onClick={openRejectModal}
          >
            Reject
          </Button>
        </>
      );
    }

    if (feedback.status === "Flagged") {
      return (
        <>
          <Button
            className="w-1/2 text-[#327222] bg-[#E2F9D6] hover:bg-[#C4E7A0]"
            onClick={() => alert("Feedback accepted")}
          >
            Accept
          </Button>
          <Button
            className="w-1/2 bg-[#FFD8D8] text-[#EF5050] hover:bg-[#F7B5B5]"
            onClick={openRejectModal}
          >
            Reject
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {/* Main Feedback Details Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-4">
          <DialogHeader>
            <div className="flex items-center">
              <Clock9 className="text-gray-500" size={15} />
              <p className="text-xs text-gray-500 ml-1">{feedback.time}</p>
            </div>
          </DialogHeader>

          <div className="mt-2">
            <p className="text-2xl font-normal mb-2">{feedback.feedback}</p>

            <div className="flex justify-between mt-6">
              <div className="w-1/2 text-left">
                <p className="text-xs text-gray-500">Mentioned</p>
                <p className="font-regular">{feedback.sharedTo}</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-xs text-gray-500">Posted By</p>
                <p className="font-regular">{feedback.sharedBy}</p>
              </div>
            </div>
          </div>

          <DialogFooter>{renderButtons()}</DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reusable Modals */}
      <ActionModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        title="Action Details"
        placeholder="Specify the Reason for Flagging"
        actionDetails={actionDetails}
        setActionDetails={setActionDetails}
        onConfirm={handleFlag}
        confirmLabel="Flag"
        confirmClassName="bg-[#C5ECFF] w-full text-[#006A9F] hover:bg-[#A3D6E9]"
      />

      <ActionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Action Details"
        placeholder="Specify the Reason for Rejection"
        actionDetails={actionDetails}
        setActionDetails={setActionDetails}
        onConfirm={handleReject}
        confirmLabel="Reject"
        confirmClassName="bg-[#FFD8D8] w-full text-[#EF5050] hover:bg-[#F7B5B5]"
      />
    </>
  );
};

export default FeedbackDetailsModal;
