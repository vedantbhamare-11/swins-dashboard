// ./src/redux/slices/adminDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the admin details
interface AdminDetailsState {
  fullName: string;
  email: string;
  role: string;
  timeZone: string;
  profilePic: string | null; // profilePic can be a URL or null if not set
}

// Initial state for admin details
const initialState: AdminDetailsState = {
  fullName: "John Doe",
  email: "johndoe@example.com",
  role: "Admin",
  timeZone: "GMT",
  profilePic: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800", // initially, the profile picture is not set
};

const adminDetailsSlice = createSlice({
  name: "adminDetails",
  initialState,
  reducers: {
    setAdminDetails: (state, action: PayloadAction<AdminDetailsState>) => {
      // Updates all admin details
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.timeZone = action.payload.timeZone;
      state.profilePic = action.payload.profilePic;
    },
    updateProfilePic: (state, action: PayloadAction<string | null>) => {
      // Updates only the profile picture
      state.profilePic = action.payload;
    },
    updateAdminDetail: (
      state,
      action: PayloadAction<{ key: keyof AdminDetailsState; value: string }>
    ) => {
      // Updates a specific detail, e.g., fullName, email, etc.
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setAdminDetails, updateProfilePic, updateAdminDetail } = adminDetailsSlice.actions;
export default adminDetailsSlice.reducer;
