// redux/slices/counterSlice.ts

import { AiChatInterface } from '@/services/AiChatInterface';
import { ContentInterface } from '@/services/ContentInterface';
import { SupportInterface } from '@/services/SupportInterface';
import { createSlice } from '@reduxjs/toolkit';
import { mockSupportChat } from '@/constants/data';
export interface UserSliceReducer {

    userId: string,
    selectedChat: AiChatInterface | null,
    chats: AiChatInterface[],
    content: ContentInterface[],
    selectedUserSupportChat: SupportInterface | null,
    allUserSupportChats: SupportInterface[]
}

const initialState: UserSliceReducer = {

    // userId: "ir4ThYV5ghOFdjxeA8cp",
    userId: "Bd4umkyLqOLnMpdOLZ0E",
    selectedChat: null,
    chats: [],
    content: [],
    selectedUserSupportChat: mockSupportChat,
    allUserSupportChats: []

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setSelectedUserSupportChat: (state, action) => {
            state.selectedUserSupportChat = action.payload;
        },
        setAllUserSupportChats: (state, action) => {
            state.allUserSupportChats = action.payload;
        },
    },
});

export const {
    setUserId,
    setSelectedChat,
    setChats,
    setContent,
    setSelectedUserSupportChat,
    setAllUserSupportChats
} = userSlice.actions;

export default userSlice.reducer;
