// redux/slices/counterSlice.ts
import { SupportInterface } from '@/services/SupportInterface';
import { UserProfile } from '@/services/UserInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface AdminSliceInterface {
  currentSupportChat: SupportInterface,
  adminId: string,
  allUsersList: UserProfile[],
  currentUser: UserProfile,
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
  adminId: "bpReSCGFYZY9k1TuuCdW",

  allUsersList: [],

  currentUser: {
    "id": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "account_status": {
      "is_premium": false,
      "is_deactivated": false
    },
    "profile_pic": "",
    "background_pic": "",
    "biography": "",
    "community": {
      "posts": [],
      "saved_posts": []
    },
    "guides": {
      "viewed_guides": []
    },
    "app_customization": {
      "is_dark": true,
      "notification_settings": {
        "community_notis_enabled": true,
        "app_notis_enabled": true
      }
    }
  }


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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

  },
});

export const { setSupportChat, setAllUsersList, setCurrentUser } = adminSlice.actions;

export default adminSlice.reducer;
