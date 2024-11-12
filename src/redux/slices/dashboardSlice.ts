import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardCardsData {
  totalOrganizations: number;
  activeOrganizations: number;
  feedbackReceived: number;
}

interface DashboardState {
  cardsData: DashboardCardsData;
}

// Initialize the state with dummy data
const initialState: DashboardState = {
  cardsData: {
    totalOrganizations: 200,
    activeOrganizations: 150,
    feedbackReceived: 200,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCardsData: (state, action: PayloadAction<DashboardCardsData>) => {
      state.cardsData = action.payload;
    },
  },
});

export const { setCardsData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
