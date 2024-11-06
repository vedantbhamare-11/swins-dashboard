// ./redux/slices/organizationManagementSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Organization {
  name: string;
  username: string;
  email: string;
  type: string;
  website: string;
  postType: "Admin Approved" | "Post Publicly";
}

interface OrganizationManagementState {
  organizations: Organization[];
}

const initialState: OrganizationManagementState = {
  organizations: [
    {
      name: "Alpha Branding",
      username: "Alpha",
      email: "contact@alpha.com",
      type: "Branding",
      website: "https://alpha.com",
      postType: "Admin Approved",
    },
    {
      name: "Beta Solutions",
      username: "Beta",
      email: "info@beta.com",
      type: "Consulting",
      website: "https://beta.com",
      postType: "Post Publicly",
    },
    {
      name: "Gamma Technologies",
      username: "Gamma",
      email: "support@gamma.com",
      type: "Tech",
      website: "https://gamma.com",
      postType: "Admin Approved",
    },
    // Add more entries as needed
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
  },
});

export const { setOrganizations, addOrganization } = organizationManagementSlice.actions;
export default organizationManagementSlice.reducer;
