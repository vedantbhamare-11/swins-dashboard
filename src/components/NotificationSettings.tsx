"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; // Import Switch from shadcn
import { Button } from "./ui/button";

const NotificationSettings: React.FC = () => {
  const [newUserRegistration, setNewUserRegistration] = useState(false); 
  const [newFeedbackSubmission, setNewFeedbackSubmission] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(false); 

  const handleNewUserRegistrationChange = (value: boolean) => {
    setNewUserRegistration(value); 
  };

  const handleNewFeedbackSubmissionChange = (value: boolean) => {
    setNewFeedbackSubmission(value);
  };

  const handleSystemUpdatesChange = (value: boolean) => {
    setSystemUpdates(value); 
  };

  const handleSaveSettings = () => {
    const settingsDetails = `
      New User Registrations: ${newUserRegistration ? "Enabled" : "Disabled"}
      New Feedback Submissions: ${newFeedbackSubmission ? "Enabled" : "Disabled"}
      System Updates: ${systemUpdates ? "Enabled" : "Disabled"}
    `;
    alert(`Notification Settings Saved: \n\n${settingsDetails}`);
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 my-4">
      <CardContent>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Email Notifications</h2>
          <p className="text-sm text-gray-600">Manage your email notification preferences here</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">New User Registrations</p>
            <p className="text-sm text-gray-600">Receive emails for new user sign-ups</p>
          </div>
          <Switch
            checked={newUserRegistration} 
            onCheckedChange={handleNewUserRegistrationChange} 
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">New Feedback Submissions</p>
            <p className="text-sm text-gray-600">Get notified when new feedback is submitted</p>
          </div>
          <Switch
            checked={newFeedbackSubmission} 
            onCheckedChange={handleNewFeedbackSubmissionChange} 
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">System Updates</p>
            <p className="text-sm text-gray-600">Receive important system update notifications</p>
          </div>
          <Switch
            checked={systemUpdates} 
            onCheckedChange={handleSystemUpdatesChange} 
          />
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSaveSettings}
            className="p-2 rounded-md"
          >
            Save Notification Settings
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
