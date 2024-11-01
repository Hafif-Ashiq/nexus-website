// redux/slices/counterSlice.ts

import { AiChatInterface } from '@/services/AiChatInterface';
import { ContentInterface } from '@/services/ContentInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceReducer {

    userId: string,
    selectedChat: AiChatInterface | null,
    chats: AiChatInterface[],
    content: ContentInterface[]
}

const initialState: UserSliceReducer = {

    userId: "Bd4umkyLqOLnMpdOLZ0E",
    selectedChat: null,
    chats: [],
    content: []

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
    },
});

export const { setUserId, setSelectedChat, setChats, setContent } = userSlice.actions;

export default userSlice.reducer;
