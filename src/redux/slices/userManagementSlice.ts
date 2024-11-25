// ./redux/slices/userManagementSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin" | "Organization Admin";
  lastActive: string;
  status: "Active" | "Inactive";
  profilePic: string;
  reportedTo?: string;
}

interface UserManagementState {
  users: User[];
}

const initialState: UserManagementState = {
  users: [
    { id: 1, name: "John Doe", email: "johndoe@example.com", role: "User", lastActive: "Oct 20, 2024", status: "Active", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", reportedTo: "Jane Smith" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "Admin", lastActive: "Oct 18, 2024", status: "Inactive", profilePic: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "John Smith", email: "johnsmith@example.com", role: "User", lastActive: "Oct 19, 2024", status: "Active", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", reportedTo: "Jane Smith" },
    { id: 4, name: "Emily Brown", email: "emilybrown@example.com", role: "User", lastActive: "Oct 17, 2024", status: "Active", profilePic: "https://randomuser.me/api/portraits/women/4.jpg", reportedTo: "John Doe" },
    { id: 5, name: "Michael Green", email: "michaelgreen@example.com", role: "User", lastActive: "Oct 16, 2024", status: "Inactive", profilePic: "https://randomuser.me/api/portraits/men/5.jpg", reportedTo: "Jane Smith" },
  ],
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userManagementSlice.actions;
export default userManagementSlice.reducer;
