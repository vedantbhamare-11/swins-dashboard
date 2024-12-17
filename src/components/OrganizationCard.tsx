import React from "react";
import { Globe, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrganizationActionsPopover from "./OrganizationActionsPopover";
import { useRouter } from "next/navigation";

interface OrganizationCardProps {
  organization: {
    name: string;
    email: string;
    website: string;
    type: string;
    postType: string;
    logo: string | null;
  };
  onShowDetails: () => void;
  onPostPreference: () => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onShowDetails,
  onPostPreference,
}) => {
  // Move useRouter inside the component
  const router = useRouter();

  const handleOrganizationClick = () => {
    router.push(`/organization-management/${organization.name}`);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 h-auto w-full">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={organization.logo || "/default-logo.png"}
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="cursor-pointer">
          <OrganizationActionsPopover
            onShowDetails={onShowDetails}
            onPostPreference={onPostPreference}
          />
        </div>
      </div>
      <div className="mt-4 mb-8">
        <h3 className="text-xl font-normal">{organization.name}</h3>

        <div className="flex mt-2">
          <MailIcon className="w-4 h-4 text-gray-500 mr-2" />
          <p className=" relative w-full pr-2 text-sm text-gray-500 break-words">{organization.email}</p>
        </div>

        <div className="flex">
          <Globe className="w-4 h-4 text-gray-500 mr-2" />
          <p className=" relative w-full pr-2 text-sm text-gray-500 break-words">{organization.website}</p>
        </div>
      </div>

      <div className="mt-2 w-full flex gap-2">
        <span className="bg-gray-200 flex w-auto text-gray-600 text-xs py-1 px-2 rounded-full">
          {organization.type}
        </span>
        <span className="bg-gray-200 flex  w-auto text-gray-600 text-xs py-1 px-2 rounded-full">
          {organization.postType}
        </span>
      </div>

      <div className="mt-4">
        <Button
          onClick={handleOrganizationClick}
          className="w-full bg-[#1E1E1E] text-white"
        >
          View Organization
        </Button>
      </div>
    </div>
  );
};

export default OrganizationCard;
