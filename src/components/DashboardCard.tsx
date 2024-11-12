import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Building, PanelsTopLeft } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: number;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
}) => {
  const getIcon = (title: string) => {
    switch (title) {
      case "Total Organizations":
        return <Building2 className="text-gray-500" size={15} />;
      case "Active Organizations":
        return <Building className="text-gray-500" size={15} />;
      case "Feedback Received":
        return <PanelsTopLeft className="text-gray-500" size={15} />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white relative w-1/3">
      <CardHeader className="p-2 mx-2 mt-1">
        <CardTitle className="text-[#09090B] text-[16px] font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 mx-2">
        <CardDescription className="text-[#09090B] font-bold text-[40px]">
          {description}
        </CardDescription>
      </CardContent>

      <div className="absolute top-4 right-4">{getIcon(title)}</div>
    </Card>
  );
};

export default DashboardCard;
