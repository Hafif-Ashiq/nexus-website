"use client"
import React, { useEffect, useState } from 'react'
import Header from '../_components/Header'
import Search from '../_components/Search'
import SupportChatLists from './_components/SupportChatList'
import HeaderButton from '../_components/HeaderButton'
// import { fetchAllSupportChats } from '@/firebaseFunctions/support'
import { SupportInterface } from '@/services/SupportInterface'
import SupportChat from './_components/SupportChat'
import { useDispatch } from 'react-redux'
import { setAllSupportChats, setSupportChat } from '@/redux/slices/adminSlice'
import { listenToSupportChats } from '@/firebaseFunctions/support'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { mockSupportChat } from '@/constants/data'

const page = () => {


    // const [allSupportChats, setAllSupportChats] = useState<SupportInterface[]>([])

    const currentSupportChat = useSelector((state: RootState) => state.adminReducer.currentSupportChat)
    const allSupportChats = useSelector((state: RootState) => state.adminReducer.allSupportChats)

    const dispatch = useDispatch()


    useEffect(() => {
        console.log("in effect");

        let sChats = listenToSupportChats((result) => {
            console.log(result);
            dispatch(setAllSupportChats(result));

        });
        console.log("after effect");


        return () => sChats();

    }, [])

    useEffect(() => {
        console.log("in support set");
        if (allSupportChats.length == 0) {
            return
        }

        if (mockSupportChat.issue_id == currentSupportChat.issue_id) {

            dispatch(setSupportChat(allSupportChats[0]));
        }
        else {
            // console.log("in else");
            const newSupport = allSupportChats.find(chat => chat.issue_id == currentSupportChat.issue_id)
            dispatch(setSupportChat(newSupport));
        }

    }, [allSupportChats])




    return (
        <div className="flex flex-col gap-[30px] h-[80vh]">
            <Header
                title='Help & Support'
                subtitle='Manage and fix users issues.'
            />

            <div className="flex gap-[40px] flex-1">
                <main className='basis-[70%] flex flex-col gap-[20px] bg-white  rounded-2xl'>
                    <div className='flex flex-col gap-[22px] py-[22px]'>
                        <div className='flex items-center justify-between gap-[15px] px-[22px]'>
                            <Search text={""} onChange={(text) => { }} placeholder="Search users..." />

                            <div className='flex justify-end items-center gap-[15px] '>
                                {/* Report Download Button */}
                                <HeaderButton icon='/assets/arrow-down.svg' title='Report' onClick={() => { }} />
                                {/* Filter button */}
                                <HeaderButton icon='/assets/sort.svg' title='Filter' onClick={() => { }} />
                            </div>

                        </div>
                        <div>
                            <SupportChatLists issues={allSupportChats} showSelect showViewAll={false} />
                        </div>

                    </div>
                </main>
                <aside className='basis-[30%]'>
                    <SupportChat />
                </aside>
            </div>

        </div>
    )
}

export default page