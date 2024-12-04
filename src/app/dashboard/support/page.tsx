"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import Chat from './_components/UserSupportChat'
import ChatSideBar from './_components/UserSupportSideBar'
import { SupportInterface } from '@/services/SupportInterface'
// import { getChatHistory } from '@/firebaseFunctions/user/aiChat'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { listenToAiChatHistory } from '@/firebaseFunctions/user/aiChat'
import { setAllUserSupportChats, setSelectedUserSupportChat } from '@/redux/slices/userSlice'
import { listenToSupportChats } from '@/firebaseFunctions/admin/support'
import { mockSupportChat } from '@/constants/data'

const page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId);
    const selectedChat = useSelector((state: RootState) => state.userReducer.selectedUserSupportChat);
    const allSupportChats = useSelector((state: RootState) => state.userReducer.allUserSupportChats);
    // const [supportChats, setSupportChats] = useState<SupportInterface[]>([]);
    const dispatch = useDispatch();



    useEffect(() => {
        let sChats = listenToSupportChats((result) => {
            console.log(result);
            // setSupportChats(result);
            dispatch(setAllUserSupportChats(result));

        }, userId);
        console.log("after effect");


        return () => sChats();

    }, [userId])

    useEffect(() => {
        console.log("in use effect allSupportChats");

        if (allSupportChats.length == 0) {
            return
        }

        if (mockSupportChat.issue_id == selectedChat?.issue_id) {

            dispatch(setSelectedUserSupportChat(allSupportChats[0]));
        }
        else {
            console.log("else");
            const newSupport = allSupportChats.find(chat => chat.issue_id == selectedChat?.issue_id)
            dispatch(setSelectedUserSupportChat(newSupport));
        }

    }, [allSupportChats])

    return (
        <div className='flex flex-col gap-[40px]'>
            <Header title='AI Chat' subtitle='Ask AI to translate or summarize.' />
            <div className='flex gap-[20px]'>
                <div className='basis-[70%]'>
                    <Chat />
                </div>
                <ChatSideBar chats={allSupportChats} setSelectedChat={(chat) => dispatch(setSelectedUserSupportChat(chat))} />
            </div>
        </div>

    )
}

export default page