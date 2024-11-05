// ./src/components/DashboardCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Ensure the import path is correct

interface DashboardCardProps {
  title: string;
  description: number;
  footerText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, footerText }) => {
  return (
    <Card className=' bg-white shadow-md'>
      <CardHeader className="p-2 mx-6 mt-4">
        <CardTitle className="text-[#09090B] text-[16px] font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 mx-6">
        <CardDescription className="text-[#09090B] font-bold text-[38px] mb-1">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0  mx-6 mt-[-15px] mb-6">
        <p className="text-[#09090B] text-[12px] font-normal">{footerText}</p>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
