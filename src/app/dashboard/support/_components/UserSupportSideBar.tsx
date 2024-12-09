import HeaderButton from '@/components/HeaderButton'
import IconButton from '@/components/IconButton'
import { RootState } from '@/redux/store'
import { SupportInterface } from '@/services/SupportInterface'
import { getStatusColor } from '@/utils/support'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NewIssueModal from './NewIssueModal'

interface UserSupportSideBarProps {
    chats: SupportInterface[],
    setSelectedChat: (chat: SupportInterface) => void
}

const UserSupportSideBar = ({ chats, setSelectedChat }: UserSupportSideBarProps) => {

    const selectedChat = useSelector((state: RootState) => state.userReducer.selectedUserSupportChat)

    const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

    const showChats = (chat: SupportInterface) => {
        return (
            <button key={chat.issue_id} className={`flex flex-col gap-[2px] border-[3px] border-solid rounded-[15px] ${selectedChat?.issue_id === chat.issue_id ? 'border-primaryColorLight' : 'border-transparent'}`} onClick={() => setSelectedChat(chat)}>
                <div className='flex justify-between items-center gap-[50px] overflow-hidden  px-[18px] py-[15px] rounded-t-[15px] bg-accentColorLight w-full text-left'>
                    <p className='font-medium text-[16px] max-h-[48px] overflow-hidden w-full text-ellipsis'>{chat.conversation[chat.conversation.length - 1].text || "File Attached ● "}</p>
                    {/* <button className='flex justify-center items-center cursor-pointer  '>
                        <img src="/assets/dots.svg" alt="more options" />
                    </button> */}
                </div>
                <div style={{
                    color: getStatusColor(chat.issue_status)
                }} className='flex w-full  items-center gap-[5px] overflow-hidden px-[18px] py-[10px] rounded-b-[15px] bg-accentColorLight text-[14px] text-primaryColorLight font-medium'>
                    <div className='w-[6px] h-[6px] rounded-full ' style={{
                        backgroundColor: getStatusColor(chat.issue_status)
                    }}></div>
                    {chat.issue_status}
                </div>
            </button>
        )
    }

    return (
        <div className='basis-[30%] bg-white rounded-2xl'>
            <div className='shadow-normal bg-white h-full rounded-[15px] py-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center px-[20px]'>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        <HeaderButton icon='/assets/add-blue.svg' title='New Chat' onClick={() => { setIsNewIssueModalOpen(true) }} />
                        {isNewIssueModalOpen && <NewIssueModal onClose={() => { setIsNewIssueModalOpen(false) }} />}
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>
                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                <div className='flex flex-col gap-[15px] px-[20px] overflow-y-auto h-[69vh]'>
                    <p className='font-semibold text-[16px] text-textColorDarkBlue'>Recent</p>
                    {chats.map((chat, index) => (
                        showChats(chat)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserSupportSideBar