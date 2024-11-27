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
  const charLimit = 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-4">
        <DialogHeader>
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>
        <div className="relative">
          <textarea
            placeholder={placeholder}
            value={actionDetails}
            onChange={(e) =>
              e.target.value.length <= charLimit && setActionDetails(e.target.value)
            }
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
            rows={4}
            maxLength={charLimit} // Limit character count
          />
          {/* Character count display */}
          <span className="absolute bottom-2 right-2 text-sm text-gray-500">
            {actionDetails.length}/{charLimit}
          </span>
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={onClose}>
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
