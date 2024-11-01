"use client"
import Header from '@/components/Header'
import ContentList from './_components/ContentList'
import Search from '@/components/Search'
import { useEffect, useState } from 'react'
import HeaderButton from '@/components/HeaderButton'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToUserContent } from '@/firebaseFunctions/user/content'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const page = () => {
    const [searchText, setSearchText] = useState('')
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [content, setContent] = useState<ContentInterface[]>([])

    useEffect(() => {
        listenToUserContent(userId, setContent)
    }, [userId])

    return (
        <div className='flex flex-col gap-[40px]'>
            <Header title='Library' subtitle='Navigate through the library of content' />
            <div className="flex gap-[40px] flex-1">
                <main className='basis-[70%] flex flex-col gap-[20px] bg-white  rounded-2xl w-full'>
                    <div className='flex flex-col gap-[22px] py-[22px]'>
                        <div className='flex items-center justify-between gap-[15px] px-[22px]'>
                            <Search text={searchText} onChange={(text) => { setSearchText(text) }} placeholder="Search Content.." />

                            <div className='flex justify-end items-center gap-[15px] '>
                                {/* Report Download Button */}
                                {/* <HeaderButton icon='/assets/arrow-down.svg' title='Report' onClick={() => { }} /> */}
                                {/* Filter button */}
                                <HeaderButton icon='/assets/sort.svg' title='Filter' onClick={() => { }} />
                            </div>

                        </div>
                        <div className='flex-1'>
                            {/* <SupportChatLists issues={chats} showSelect showViewAll={false} /> */}
                            <ContentList content={content} showSelect />
                        </div>

                    </div>
                </main>
                <aside className='basis-[30%]'>
                    {/* <SupportChat /> */}
                </aside>
            </div>
        </div>

    )
}

export default page