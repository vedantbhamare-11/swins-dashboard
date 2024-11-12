// ./redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./slices/leaderboardSlice";
import userManagementReducer from "./slices/userManagementSlice";
import dashboardReducer from "./slices/dashboardSlice"; 
import organizationManagementReducer from "./slices/organizationManagementSlice"
import feedbackManagementReducer from "./slices/feedbackManagementSlice"; 
import notificationReducer from "./slices/notificationSlice";



const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
    userManagement: userManagementReducer,
    dashboard: dashboardReducer, 
    organizationManagement: organizationManagementReducer,
    feedbackManagement: feedbackManagementReducer, 
    notifications: notificationReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
