// ./redux/slices/leaderboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Leader {
  rank: number;
  name: string;
  department: string;
  role: string;
  points: number;
  profilePic: string;
  email: string;
  designation: string;
}

interface LeaderboardState {
  weekly: Leader[];
  monthly: Leader[];
  annually: Leader[];
}

const initialState: LeaderboardState = {
  weekly: [
    {
      rank: 1,
      name: "Alice Johnson",
      department: "Engineering",
      role: "Software Engineer",
      points: 250,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 2,
      name: "Bob Smith",
      department: "Design",
      role: "UI/UX Designer",
      points: 200,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 3,
      name: "Clara Brown",
      department: "Marketing",
      role: "Marketing Specialist",
      points: 180,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 4,
      name: "Daniel Wilson",
      department: "Finance",
      role: "Financial Analyst",
      points: 85,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 5,
      name: "Eva Thomas",
      department: "HR",
      role: "HR Manager",
      points: 83,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Evan Parker",
      department: "Engineering",
      role: "Project Manager",
      points: 200,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 2,
      name: "Fiona Black",
      department: "Sales",
      role: "Regional Sales Head",
      points: 190,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 3,
      name: "George White",
      department: "Finance",
      role: "Senior Analyst",
      points: 177,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 4,
      name: "Hannah Davis",
      department: "Marketing",
      role: "Brand Manager",
      points: 165,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 5,
      name: "Ian Brown",
      department: "HR",
      role: "Recruiter",
      points: 160,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
  ],
  annually: [
    {
      rank: 1,
      name: "Hannah Green",
      department: "Engineering",
      role: "Director of Engineering",
      points: 450,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 2,
      name: "Isaac Gray",
      department: "Marketing",
      role: "Chief Marketing Officer",
      points: 395,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 3,
      name: "James Blue",
      department: "Finance",
      role: "CFO",
      points: 383,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 4,
      name: "Laura Hall",
      department: "Sales",
      role: "VP of Sales",
      points: 370,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
    {
      rank: 5,
      name: "Michael Adams",
      department: "Operations",
      role: "COO",
      points: 360,
      profilePic:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      email: "alice.johnson@example.com",
      designation: "UI Engineer",
    },
  ],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setWeeklyData: (state, action: PayloadAction<Leader[]>) => {
      state.weekly = action.payload;
    },
    setMonthlyData: (state, action: PayloadAction<Leader[]>) => {
      state.monthly = action.payload;
    },
    setAnnualData: (state, action: PayloadAction<Leader[]>) => {
      state.annually = action.payload;
    },
  },
});

export const { setWeeklyData, setMonthlyData, setAnnualData } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
