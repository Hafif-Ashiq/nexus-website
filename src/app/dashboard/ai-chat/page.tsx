"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import Chat from './_components/Chat'
import ChatSideBar from './_components/ChatSideBar'
import { AiChatInterface } from '@/services/AiChatInterface'
// import { getChatHistory } from '@/firebaseFunctions/user/aiChat'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { listenToAiChatHistory } from '@/firebaseFunctions/user/aiChat'
import { setChats, setSelectedChat } from '@/redux/slices/userSlice'

const page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId);
    const selectedChat = useSelector((state: RootState) => state.userReducer.selectedChat);
    const chats = useSelector((state: RootState) => state.userReducer.chats);
    const dispatch = useDispatch();



    useEffect(() => {
        let aiChats = listenToAiChatHistory(userId, (result) => {
            console.log(result);
            dispatch(setChats(result))

        });
        console.log("after effect");

        return () => aiChats();
    }, [userId])

    useEffect(() => {
        if (!selectedChat && chats.length > 0) {
            dispatch(setSelectedChat(chats[0]))
        }
        else {
            dispatch(setSelectedChat(chats.find(chat => chat.chat_id === selectedChat?.chat_id)))
        }
    }, [chats])

    return (
        <div className='flex flex-col gap-[40px]'>
            <Header title='AI Chat' subtitle='Ask AI to translate or summarize.' />
            <div className='flex gap-[20px]'>
                <Chat selectedChat={selectedChat} />
                <ChatSideBar chats={chats} setSelectedChat={(chat) => dispatch(setSelectedChat(chat))} />
            </div>
        </div>

    )
}

export default page