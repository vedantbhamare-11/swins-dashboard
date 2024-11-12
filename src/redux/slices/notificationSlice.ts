// ./redux/slices/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  notification: string;
  brief: string;
  date: string;
  time: string;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [
    {
      notification: "New User Registration",
      brief: "John Doe has registered as a new user.",
      date: "2024/11/10",
      time: "06:48 pm",
    },
    {
      notification: "Feedback Approval Required",
      brief: "There are 5 new feedback submissions pending approval.",
      date: "2024/11/10",
      time: "06:48 pm",
    },
    {
      notification: "System Update",
      brief: "A new system update is available. Please review and install.",
      date: "2024/11/09",
      time: "03:20 pm",
    },
    {
      notification: "User Milestone Achieved",
      brief: "User Jane Smith has reached 1000 points on the leaderboard!",
      date: "2024/11/08",
      time: "05:15 pm",
    },
    {
      notification: "New Organization Onboarded",
      brief: "TechCorp has successfully onboarded to the platform.",
      date: "2024/11/07",
      time: "08:30 am",
    },
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    // Optionally, you can add more actions here (e.g., for adding/removing notifications)
  },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
