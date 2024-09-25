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
import { setSupportChat } from '@/redux/slices/adminSlice'
import { listenToSupportChats } from '@/firebaseFunctions/support'

const page = () => {


    const [allSupportChats, setAllSupportChats] = useState<SupportInterface[]>([])

    const dispatch = useDispatch()


    useEffect(() => {

        let sChats = listenToSupportChats((result) => {
            console.log(result);
            setAllSupportChats(result);


            // Dispatch the first chat (or any other logic as needed)
            if (result.length > 0) {

            }
        });

        // fetchAllSupportChats().then((result: SupportInterface[]) => {
        //     console.log(result);

        //     setAllSupportChats(result)
        //     dispatch(setSupportChat(result[0]))
        // })
        return () => sChats();

    }, [])

    useEffect(() => {
        if (allSupportChats.length > 0) {
            dispatch(setSupportChat(allSupportChats[0]));
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