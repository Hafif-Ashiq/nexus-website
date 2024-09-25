// redux/slices/counterSlice.ts
import { SupportInterface } from '@/services/SupportInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface AdminSliceInterface {
  currentSupportChat: SupportInterface,
  adminId: string
}

const initialState: AdminSliceInterface = {
  currentSupportChat: {
    "user_id": "",
    "issue_id": "",
    "issue_opened_time": "",
    "issue_closed_time": "",
    "issue_category": "Application",
    "issue_status": "Pending",
    "conversation": [
      {
        "sender_id": "",
        "time_stamp": "",
        "image_link": "",
        "message_type": "",
        "text": "",
        "status": {
          "is_sent": false,
          "is_seen": false
        }
      }
    ]
  },
  adminId: "bpReSCGFYZY9k1TuuCdW"

};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSupportChat: (state, action) => {
      state.currentSupportChat = action.payload;
    },

  },
});

export const { setSupportChat } = adminSlice.actions;

export default adminSlice.reducer;
