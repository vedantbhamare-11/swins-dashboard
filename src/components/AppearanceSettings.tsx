"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"; 

const AppearanceSettings: React.FC = () => {
  const [colorTheme, setColorTheme] = useState("light"); 

  const handleColorThemeChange = (value: string) => {
    setColorTheme(value); 
  };



  const handleSaveAppearanceSettings = () => {
    console.log("Appearance Settings Saved");
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 my-4">
      <CardContent>
        <div className="my-4">
          <h2 className="text-xl font-bold">Appearance Settings</h2>
          <p className="text-sm text-gray-600">Customize your dashboard appearance here</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Color Theme</p>
          <div className="flex gap-2">
            <Button
              variant={colorTheme === "light" ? "default" : "outline"}
              onClick={() => handleColorThemeChange("light")}
              className={`w-[10%] ${colorTheme === "light" ? "bg-[#09090B] text-white" : ""}`}
            >
              Light
            </Button>
            <Button
              variant={colorTheme === "dark" ? "default" : "outline"}
              onClick={() => handleColorThemeChange("dark")}
              className={`w-[10%] ${colorTheme === "dark" ? "bg-[#09090B] text-white" : ""}`}
            >
              Dark
            </Button>
            <Button
              variant={colorTheme === "system" ? "default" : "outline"}
              onClick={() => handleColorThemeChange("system")}
              className={`w-[10%] ${colorTheme === "system" ? "bg-[#09090B] text-white" : ""}`}
            >
              System
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSaveAppearanceSettings} className="px-6 py-2 rounded-md w-[30%]">
            Save Appearance Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
