// organizationManagementSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Organization {
  name: string;
  username: string;
  email: string;
  type: string;
  website: string;
  address: string;
  adminName: string;
  adminEmail: string;
  jobTitle: string;
  orgDescription: string;
  numEmployees: string;
  foundedDate: Date | undefined;
  logo: string | null;
  postType: "Admin Approved" | "Post Publicly";
  users: User[];
  feedbacks: Feedback[];
  leaderboard: Leader[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin" | "Organization Admin";
  lastActive: string;
  status: "Active" | "Inactive";
  profilePic: string;
  reportedTo?: string;
}

interface Feedback {
  feedback: string;
  sharedTo: string;
  sharedBy: string;
  time: string;
  status: "Accepted" | "Flagged" | "Pending";
}

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

interface OrganizationManagementState {
  organizations: Organization[];
}

const defaultUsers: User[] = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", role: "User", lastActive: "Oct 20, 2024", status: "Active", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", reportedTo: "Jane Smith" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "Admin", lastActive: "Oct 18, 2024", status: "Inactive", profilePic: "https://randomuser.me/api/portraits/women/2.jpg" }
];

const defaultFeedbacks: Feedback[] = [
  { feedback: "Great work environment! Keep it up.", sharedTo: "john_doe", sharedBy: "jane_doe", time: "6:48 PM", status: "Accepted" },
  { feedback: "Could improve team bonding activities.", sharedTo: "alex_smith", sharedBy: "susan_lee", time: "8:15 AM", status: "Flagged" }
];

const defaultLeaderboard: Leader[] = [
  { rank: 1, name: "Alice Johnson", department: "Engineering", role: "Software Engineer", points: 250, profilePic: "https://images.pexels.com/photos/8993561/pexels-photo-8993561.jpeg", email: "alice.johnson@example.com", designation: "UI Engineer" },
  { rank: 2, name: "Bob Smith", department: "Design", role: "UI/UX Designer", points: 200, profilePic: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg", email: "bob.smith@example.com", designation: "UI Designer" }
];


const initialState: OrganizationManagementState = {
  organizations: [
    {
      name: "Alpha Branding",
      username: "Alpha",
      email: "contact@alpha.com",
      type: "Branding",
      website: "https://alpha.com",
      address: "123 Alpha St, City, Country",
      adminName: "John Doe",
      adminEmail: "john@alpha.com",
      jobTitle: "CEO",
      orgDescription: "A leading branding agency.",
      numEmployees: "50",
      foundedDate: new Date("2010-01-01"),
      logo: "https://imgs.search.brave.com/XK7UflLxIkphGp1SAmYhkR0x8ZFGjnorUUgRWV5clCE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzgyLzQ1Lzk2/LzM2MF9GXzc4MjQ1/OTY3M19sQVdyOVQ3/UUZWMGx0NUpJMzdl/NFQwakl0bFVuRDNy/Yi5qcGc", // Sample logo URL
      postType: "Admin Approved",
      users: defaultUsers,
      feedbacks: defaultFeedbacks,
      leaderboard: defaultLeaderboard

    },
    {
      name: "Beta Solutions",
      username: "Beta",
      email: "info@beta.com",
      type: "Consulting",
      website: "https://beta.com",
      address: "456 Beta Ave, City, Country",
      adminName: "Jane Smith",
      adminEmail: "jane@beta.com",
      jobTitle: "Founder",
      orgDescription: "Consulting services for business solutions.",
      numEmployees: "100",
      foundedDate: new Date("2015-05-15"),
      logo: "https://imgs.search.brave.com/XK7UflLxIkphGp1SAmYhkR0x8ZFGjnorUUgRWV5clCE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzgyLzQ1Lzk2/LzM2MF9GXzc4MjQ1/OTY3M19sQVdyOVQ3/UUZWMGx0NUpJMzdl/NFQwakl0bFVuRDNy/Yi5qcGc", // Sample logo URL
      postType: "Post Publicly",
      users: defaultUsers,
      feedbacks: defaultFeedbacks,
      leaderboard: defaultLeaderboard

    },
    {
      name: "Gamma Technologies",
      username: "Gamma",
      email: "support@gamma.com",
      type: "Tech",
      website: "https://gamma.com",
      address: "789 Gamma Blvd, City, Country",
      adminName: "Mark Lee",
      adminEmail: "mark@gamma.com",
      jobTitle: "CTO",
      orgDescription: "Innovative tech solutions for the modern world.",
      numEmployees: "250",
      foundedDate: new Date("2005-08-23"),
      logo: "https://imgs.search.brave.com/XK7UflLxIkphGp1SAmYhkR0x8ZFGjnorUUgRWV5clCE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzgyLzQ1Lzk2/LzM2MF9GXzc4MjQ1/OTY3M19sQVdyOVQ3/UUZWMGx0NUpJMzdl/NFQwakl0bFVuRDNy/Yi5qcGc", // Sample logo URL
      postType: "Admin Approved",
      users: defaultUsers,
      feedbacks: defaultFeedbacks,
      leaderboard: defaultLeaderboard

    },
  ],
};

const organizationManagementSlice = createSlice({
  name: "organizationManagement",
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
    },
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const orgIndex = state.organizations.findIndex(
        (org) => org.name === action.payload.name
      );
      if (orgIndex !== -1) {
        state.organizations[orgIndex] = action.payload; // Update the organization with the new data
      }
    },
    updatePostPreference: (
      state,
      action: PayloadAction<{
        organizationName: string;
        postType: "Admin Approved" | "Post Publicly";
      }>
    ) => {
      const org = state.organizations.find(
        (org) => org.name === action.payload.organizationName
      );
      if (org) {
        org.postType = action.payload.postType;
      }
    },
  },
});

export const {
  setOrganizations,
  addOrganization,
  updateOrganization,
  updatePostPreference,
} = organizationManagementSlice.actions;

export default organizationManagementSlice.reducer;
