import React, { useState } from "react";
import Image from "next/image";
import { CloudUpload, Monitor, Folder } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileImageUploadProps {
  profileImage: File | null;
  handleImageUpload: (file: File | null) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage, handleImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Temporary state for modal
  const [isOpen, setIsOpen] = useState<boolean>(false); // Control modal open/close

  const handleSaveChanges = () => {
    if (selectedImage) {
      handleImageUpload(selectedImage); // Save the selected image to parent state
    }
    setIsOpen(false); // Close the modal
  };


  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className=" h-[20rem] w-[20rem] p-4 mt-6 flex rounded-md flex-col border border-dashed border-gray-300 items-center cursor-pointer">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  width={160}
                  height={160}
                  className="w-auto h-[20rem] rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <CloudUpload size={40} className="" />
                  <p className="text-gray-600 mt-4">Upload your profile picture</p>
                </div>
              )}
            </div>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="text-center mb-4">
            <h2 className="text-xl text-center font-semibold">Choose Image</h2>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div
              onClick={() => document.getElementById("upload-computer")?.click()}
              className="p-4 border rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
            >
              <Monitor size={40} />
              <p className="mt-2">Upload from Computer</p>
              <input
                id="upload-computer"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
              <Folder size={40} />
              <p className="mt-2">Upload from Drive</p>
            </div>
          </div>
          <Button className="w-full" onClick={handleSaveChanges}>
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileImageUpload;
