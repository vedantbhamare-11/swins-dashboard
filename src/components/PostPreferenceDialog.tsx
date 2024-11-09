import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Earth, ShieldCheck } from "lucide-react";

interface PostPreferenceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preference: "Admin Approved" | "Post Publicly") => void;
}

const PostPreferenceDialog: React.FC<PostPreferenceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "Admin Approved" | "Post Publicly" | ""
  >("");

  const handleOptionSelect = (option: "Admin Approved" | "Post Publicly") => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      onSave(selectedOption); // Save the selected preference
      onClose();
    }
  };

  const handleDiscard = () => {
    setSelectedOption(""); // Reset selection
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <div className="relative">
          <h2 className="text-xl text-center mb-[-15px]">Post Preference</h2>
          <div className="flex gap-4 mb-10 justify-center">
            {/* Public Post Card */}
            <div
              onClick={() => handleOptionSelect("Post Publicly")}
              className={`w-[200px] h-[200px] bg-[#FAFAFA] p-4 mt-10 rounded-md text-center cursor-pointer flex flex-col justify-center ${
                selectedOption === "Post Publicly"
                  ? "border border-[#CBCACA]"
                  : ""
              }`}
            >
              <Earth className="mx-auto mb-2" size={24} />
              <h3 className="font-bold">Post Publicly</h3>
              <p className="text-sm text-gray-600">
                "Post Publicly" shares updates instantly for broad visibility
                and engagement.
              </p>
            </div>

            {/* Admin Approval Card */}
            <div
              onClick={() => handleOptionSelect("Admin Approved")}
              className={`w-[200px] h-[200px] bg-[#FAFAFA] p-4 mt-10 rounded-md text-center cursor-pointer flex flex-col justify-center ${
                selectedOption === "Admin Approved"
                  ? "border border-[#CBCACA]"
                  : ""
              }`}
            >
              <ShieldCheck className="mx-auto mb-2" size={24} />
              <h3 className="font-bold">Admin Approved</h3>
              <p className="text-sm text-gray-600">
                "Admin Approval" submits posts for review before publishing.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-1/2" variant="outline" onClick={handleDiscard}>
              Discard Changes
            </Button>
            <Button
              className="w-1/2"
              onClick={handleSave}
              disabled={!selectedOption}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostPreferenceDialog;
