// ./src/components/DynamicLineChart.tsx
"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface DynamicLineChartProps {
  data: { name: string; Positive: number; Negative: number }[];
}

const DynamicLineChart: React.FC<DynamicLineChartProps> = ({ data }) => (
  <Card className="w-full h-full p-0 rounded-lg">
    <CardHeader>
      <CardTitle className="text-lg">Overview of Reviews</CardTitle>
      <CardDescription className="text-sm text-gray-500 pb-4">
        Based on reviews given
      </CardDescription>
    </CardHeader>
    <CardContent className="relative h-64"> {/* Set a fixed height */}
      {/* Chart Section */}
      <div className="h-full"> {/* Ensure this container takes up full height */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" hide />
            <Line type="monotone" dataKey="Positive" stroke="#09090B" dot />
            <Line type="monotone" dataKey="Negative" stroke="#8884d8" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Radio Buttons Section */}
      <div className="absolute top-[-30px] right-[-20px] md:right-10 md:top-[-100px] w-full md:w-auto grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="reviewType"
            value="positive"
            defaultChecked
          />
          <label className="ml-2 text-sm">Positive</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="reviewType"
            value="negative"
          />
          <label className="ml-2 text-sm">Negative</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="reviewType"
            value="Flagged"
          />
          <label className="ml-2 text-sm">Flagged</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="reviewType"
            value="Escalated"
          />
          <label className="ml-2 text-sm">Escalated</label>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DynamicLineChart;
