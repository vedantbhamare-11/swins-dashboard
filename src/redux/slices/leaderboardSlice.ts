// ./redux/slices/leaderboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Leader {
  rank: number;
  name: string;
  department: string;
  role: string;
  points: number;
}

interface LeaderboardState {
  weekly: Leader[];
  monthly: Leader[];
  annually: Leader[];
}

const initialState: LeaderboardState = {
  weekly: [
    { rank: 1, name: "Alice Johnson", department: "Engineering", role: "Software Engineer", points: 98 },
    { rank: 2, name: "Bob Smith", department: "Sales", role: "Sales Manager", points: 92 },
    { rank: 3, name: "Clara Brown", department: "Marketing", role: "Marketing Specialist", points: 89 },
    { rank: 4, name: "Daniel Wilson", department: "Finance", role: "Financial Analyst", points: 85 },
    { rank: 5, name: "Eva Thomas", department: "HR", role: "HR Manager", points: 83 },
    { rank: 6, name: "Frank White", department: "Operations", role: "Operations Manager", points: 81 },
    { rank: 7, name: "Grace Lee", department: "Engineering", role: "Frontend Developer", points: 78 },
    { rank: 8, name: "Henry Kim", department: "Legal", role: "Legal Advisor", points: 75 },
    { rank: 9, name: "Ivy Green", department: "Product", role: "Product Manager", points: 72 },
    { rank: 10, name: "Jack Miller", department: "IT", role: "IT Support", points: 70 },
    
  ],
  monthly: [
    { rank: 1, name: "Evan Parker", department: "Engineering", role: "Project Manager", points: 200 },
    { rank: 2, name: "Fiona Black", department: "Sales", role: "Regional Sales Head", points: 190 },
    { rank: 3, name: "George White", department: "Finance", role: "Senior Analyst", points: 177 },
    { rank: 4, name: "Hannah Davis", department: "Marketing", role: "Brand Manager", points: 165 },
    { rank: 5, name: "Ian Brown", department: "HR", role: "Recruiter", points: 160 },
    { rank: 6, name: "Julia King", department: "Operations", role: "Supply Chain Manager", points: 155 },
    { rank: 7, name: "Kevin Scott", department: "Engineering", role: "Full Stack Developer", points: 150 },
    { rank: 8, name: "Liam Clark", department: "Legal", role: "Paralegal", points: 145 },
    { rank: 9, name: "Mia Moore", department: "Product", role: "Product Designer", points: 140 },
    { rank: 10, name: "Nina Young", department: "IT", role: "Systems Analyst", points: 135 },
  ],
  annually: [
    { rank: 1, name: "Hannah Green", department: "Engineering", role: "Director of Engineering", points: 450 },
    { rank: 2, name: "Isaac Gray", department: "Marketing", role: "Chief Marketing Officer", points: 395 },
    { rank: 3, name: "James Blue", department: "Finance", role: "CFO", points: 383 },
    { rank: 4, name: "Laura Hall", department: "Sales", role: "VP of Sales", points: 370 },
    { rank: 5, name: "Michael Adams", department: "Operations", role: "COO", points: 360 },
    { rank: 6, name: "Olivia Martinez", department: "HR", role: "Chief HR Officer", points: 355 },
    { rank: 7, name: "Paul Walker", department: "Legal", role: "General Counsel", points: 348 },
    { rank: 8, name: "Quinn Rivera", department: "Product", role: "Chief Product Officer", points: 340 },
    { rank: 9, name: "Riley Anderson", department: "IT", role: "CTO", points: 330 },
    { rank: 10, name: "Sophia Perez", department: "Engineering", role: "Tech Lead", points: 320 },
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

export const { setWeeklyData, setMonthlyData, setAnnualData } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
