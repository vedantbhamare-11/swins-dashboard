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
      address: "123 Alpha St, City, Country",
      adminName: "John Doe",
      adminEmail: "john@alpha.com",
      jobTitle: "CEO",
      orgDescription: "A leading branding agency.",
      numEmployees: "50",
      foundedDate: new Date("2010-01-01"),
      logo: "https://imgs.search.brave.com/XK7UflLxIkphGp1SAmYhkR0x8ZFGjnorUUgRWV5clCE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzgyLzQ1Lzk2/LzM2MF9GXzc4MjQ1/OTY3M19sQVdyOVQ3/UUZWMGx0NUpJMzdl/NFQwakl0bFVuRDNy/Yi5qcGc", // Sample logo URL
      postType: "Admin Approved",
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
