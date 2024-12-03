import HeaderButton from '@/components/HeaderButton'
import IconButton from '@/components/IconButton'
import { RootState } from '@/redux/store'
import { AiChatInterface } from '@/services/AiChatInterface'
import React from 'react'
import { useSelector } from 'react-redux'

interface ChatSideBarProps {
    chats: AiChatInterface[],
    setSelectedChat: (chat: AiChatInterface) => void
}

const ChatSideBar = ({ chats, setSelectedChat }: ChatSideBarProps) => {

    const selectedChat = useSelector((state: RootState) => state.userReducer.selectedChat)


    const showChats = (chat: AiChatInterface) => {
        return (
            <button className={`flex flex-col gap-[2px] border-[3px] border-solid rounded-[15px] ${selectedChat?.chat_id === chat.chat_id ? 'border-primaryColorLight' : 'border-transparent'}`} onClick={() => setSelectedChat(chat)}>
                <div className='flex justify-between items-center gap-[50px] overflow-hidden  px-[18px] py-[15px] rounded-t-[15px] bg-accentColorLight w-full text-left'>
                    <p className='font-medium text-[16px] max-h-[48px] overflow-hidden w-full text-ellipsis'>{chat.conversation[chat.conversation.length - 1].text}</p>
                    <button className='flex justify-center items-center cursor-pointer  '>
                        <img src="/assets/dots.svg" alt="more options" />
                    </button>
                </div>
                <div className='flex w-full  items-center gap-[5px] overflow-hidden px-[18px] py-[10px] rounded-b-[15px] bg-accentColorLight text-[14px] text-primaryColorLight font-medium'>
                    <div className='w-[6px] h-[6px] rounded-full bg-primaryColorLight'></div> {chat.chat_type}
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
                        <HeaderButton icon='/assets/add-blue.svg' title='New Chat' onClick={() => { }} />
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>
                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                <div className='flex flex-col gap-[15px] px-[20px]'>
                    <p className='font-semibold text-[16px] text-textColorDarkBlue'>Recent</p>
                    {chats.map((chat, index) => (
                        showChats(chat)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatSideBar