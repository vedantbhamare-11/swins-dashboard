"use client";

import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeedbackActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  actionDetails: string;
  setActionDetails: (value: string) => void;
  onConfirm: () => void;
  confirmLabel: string;
  confirmClassName: string;
}

const FeedbackActionModal: React.FC<FeedbackActionModalProps> = ({
  isOpen,
  onClose,
  title,
  placeholder,
  actionDetails,
  setActionDetails,
  onConfirm,
  confirmLabel,
  confirmClassName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-4">
        <DialogHeader>
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>
        <div className="mt-8">
          <textarea
            placeholder={placeholder}
            value={actionDetails}
            onChange={(e) => setActionDetails(e.target.value)}
            className="w-full p-2 border rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-300"
            rows={Math.min(5, Math.max(1, Math.ceil(actionDetails.length / 50)))} // Adjust rows dynamically
          />
        </div>
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="mr-2"
            onClick={onClose}
          >
            Discard
          </Button>
          <Button onClick={onConfirm} className={confirmClassName}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackActionModal;