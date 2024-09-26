// redux/slices/counterSlice.ts
import { mockSupportChat, mockUser } from '@/constants/data';
import { SupportInterface } from '@/services/SupportInterface';
import { UserProfile } from '@/services/UserInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface AdminSliceInterface {
  currentSupportChat: SupportInterface,
  adminId: string,
  allSupportChats: SupportInterface[],
  allUsersList: UserProfile[],
  currentUser: UserProfile,
}

const initialState: AdminSliceInterface = {
  currentSupportChat: mockSupportChat,
  adminId: "bpReSCGFYZY9k1TuuCdW",

  allUsersList: [],
  allSupportChats: [],

  currentUser: mockUser

};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSupportChat: (state, action) => {
      state.currentSupportChat = action.payload;
    },
    setAllUsersList: (state, action) => {
      state.allUsersList = action.payload;
    },
    setAllSupportChats: (state, action) => {
      state.allSupportChats = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

  },
});

export const { setSupportChat, setAllUsersList, setCurrentUser, setAllSupportChats } = adminSlice.actions;

export default adminSlice.reducer;
