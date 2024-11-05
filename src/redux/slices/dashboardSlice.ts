// ./redux/slices/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardCardsData {
  positiveReviews: number;
  negativeReviews: number;
  flaggedReviews: number;
  escalatedReviews: number;
  positiveFooter: string;
  negativeFooter: string;
  flaggedFooter: string;
  escalatedFooter: string;
}

interface LineChartData {
  name: string;
  Positive: number;
  Negative: number;
}

interface RecentReview {
  reviewer: string;
  reviewedPerson: string;
  comment: string;
  timeAgo: string;
  type: 'Positive' | 'Negative';
}

interface DashboardState {
  cardsData: DashboardCardsData;
  lineChartData: LineChartData[];
  recentReviews: RecentReview[];
}

// Initialize the state with dummy data
const initialState: DashboardState = {
  cardsData: {
    positiveReviews: 150,
    negativeReviews: 25,
    flaggedReviews: 20,
    escalatedReviews: 5,
    positiveFooter: "+20.1% from last month",
    negativeFooter: "+201 since last month",
    flaggedFooter: "180.1% from last month",
    escalatedFooter: "+19% from last month",
  },
  lineChartData: [
    { name: "January", Positive: 50, Negative: 10 },
    { name: "February", Positive: 80, Negative: 15 },
    { name: "March", Positive: 100, Negative: 30 },
    { name: "April", Positive: 150, Negative: 40 },
    { name: "May", Positive: 130, Negative: 50 },
    { name: "June", Positive: 170, Negative: 60 },
  ],
  recentReviews: [
    { reviewer: "Sajith", reviewedPerson: "Lokesh", comment: "Great job on the new logo design!", timeAgo: "2 min ago", type: "Positive" },
    { reviewer: "Anto", reviewedPerson: "Sridhar", comment: "The service could be improved.", timeAgo: "5 min ago", type: "Negative" },
    { reviewer: "Rahul", reviewedPerson: "Nisha", comment: "Loved the product quality!", timeAgo: "10 min ago", type: "Positive" },
    { reviewer: "Kiran", reviewedPerson: "Aditi", comment: "Not what I expected.", timeAgo: "15 min ago", type: "Negative" },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCardsData: (state, action: PayloadAction<DashboardCardsData>) => {
      state.cardsData = action.payload;
    },
    setLineChartData: (state, action: PayloadAction<LineChartData[]>) => {
      state.lineChartData = action.payload;
    },
    setRecentReviews: (state, action: PayloadAction<RecentReview[]>) => {
      state.recentReviews = action.payload;
    },
  },
});

export const { setCardsData, setLineChartData, setRecentReviews } = dashboardSlice.actions;
export default dashboardSlice.reducer;
