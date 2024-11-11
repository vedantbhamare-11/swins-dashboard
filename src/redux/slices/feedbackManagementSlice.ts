// ./src/redux/slices/feedbackManagementSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// feedbackManagementSlice.ts
export interface Feedback {
    feedback: string;    // The actual feedback message
    sharedTo: string;    // The user to whom the feedback was shared
    sharedBy: string;    // The user who shared the feedback
    time: string;        // Time when feedback was shared (e.g., '6:48 PM')
    status: "Accepted" | "Flagged" | "Pending";  // Feedback status
  }
  
  interface FeedbackManagementState {
    feedbacks: Feedback[];
  }

  const initialState: FeedbackManagementState = {
    feedbacks: [
      {
        feedback: "Great work environment! Keep it up.",
        sharedTo: "john_doe",
        sharedBy: "jane_doe",
        time: "6:48 PM",
        status: "Accepted"
      },
      {
        feedback: "Could improve team bonding activities.",
        sharedTo: "alex_smith",
        sharedBy: "susan_lee",
        time: "8:15 AM",
        status: "Flagged"
      },
      {
        feedback: "Excellent communication and leadership skills. Very organized.",
        sharedTo: "mary_jones",
        sharedBy: "robert_brown",
        time: "10:05 AM",
        status: "Accepted"
      },
      {
        feedback: "Project deadlines are not being met as expected. Needs improvement.",
        sharedTo: "emily_white",
        sharedBy: "tom_davis",
        time: "2:30 PM",
        status: "Flagged"
      },
      {
        feedback: "Has been a valuable contributor to team success. Keep up the good work!",
        sharedTo: "david_black",
        sharedBy: "kate_johnson",
        time: "3:45 PM",
        status: "Accepted"
      },
      {
        feedback: "Lack of attention to detail. Requires more focus on task execution.",
        sharedTo: "chris_green",
        sharedBy: "olivia_martin",
        time: "11:25 AM",
        status: "Flagged"
      },
      {
        feedback: "Consistently exceeds expectations and brings fresh ideas to the table.",
        sharedTo: "michael_blue",
        sharedBy: "sophia_garcia",
        time: "4:00 PM",
        status: "Accepted"
      },
      {
        feedback: "Communication within the team could be better, sometimes unclear.",
        sharedTo: "jessica_lee",
        sharedBy: "james_white",
        time: "5:10 PM",
        status: "Pending"
      },
      {
        feedback: "Provides great suggestions but sometimes struggles with time management.",
        sharedTo: "noah_wilson",
        sharedBy: "julia_perez",
        time: "7:20 PM",
        status: "Pending"
      },
      {
        feedback: "Takes initiative and is very proactive in finding solutions to challenges.",
        sharedTo: "mason_king",
        sharedBy: "aiden_thomas",
        time: "9:00 AM",
        status: "Accepted"
      },
      {
        feedback: "Frequently misses meetings, which affects overall team performance.",
        sharedTo: "ava_morris",
        sharedBy: "benjamin_taylor",
        time: "12:30 PM",
        status: "Flagged"
      },
      {
        feedback: "Demonstrates excellent problem-solving skills and contributes positively to team dynamics.",
        sharedTo: "ella_harris",
        sharedBy: "william_clark",
        time: "1:45 PM",
        status: "Accepted"
      },
      {
        feedback: "Struggles to collaborate effectively with others, needs to improve teamwork skills.",
        sharedTo: "lucas_lee",
        sharedBy: "sarah_rodriquez",
        time: "10:15 AM",
        status: "Flagged"
      }
    ]
  };
  
  
  const feedbackManagementSlice = createSlice({
    name: "feedbackManagement",
    initialState,
    reducers: {
      setFeedbacks: (state, action: PayloadAction<Feedback[]>) => {
        state.feedbacks = action.payload;
      },
      // More reducers as needed...
    }
  });
  
  export const { setFeedbacks } = feedbackManagementSlice.actions;
  export default feedbackManagementSlice.reducer;
  