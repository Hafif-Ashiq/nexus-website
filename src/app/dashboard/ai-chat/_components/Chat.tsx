import HeaderButton from '@/components/HeaderButton';
import IconButton from '@/components/IconButton'
import ImageModal from '@/components/ImageModal';
import React, { useEffect, useRef, useState } from 'react'
import { AiChatInterface, AiChatMessageInterface } from '@/services/AiChatInterface';

interface ChatProps {
    selectedChat: AiChatInterface | null
}

const Chat = ({ selectedChat }: ChatProps) => {

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);


    // State
    const [inputText, setInputText] = useState("")


    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        // Profile photo show
        // let chat = supportChat.conversation
        // for (let index = 0; index < chat.length; index++) {
        //     if (chat[index].sender_id == adminId && chat[index - 1]?.sender_id !== adminId) {
        //         setLastAdminMessageIndex(index)
        //     }
        //     if (chat[index].sender_id != adminId && chat[index - 1]?.sender_id == adminId) {
        //         {
        //             setLastUserMessageIndex(index)
        //         }
        //     }
        // }


    }, [selectedChat]); // Dependency array includes messages


    const getMessage = (message: AiChatMessageInterface, index: number) => {
        console.log(message);

        let isMessageFromUser: boolean = message.message_type == "original"
        let isResponse: boolean = message.message_type == "response"
        if (isMessageFromUser) {
            console.log("isMessageFromUser");

            return (
                <div className={`flex gap-[10px] items-start justify-end mb-[25px]`}>
                    <div className='w-[30px] h-[30px]'></div>

                    {/* For text */}
                    <div className='flex-1 flex justify-end max-w-[52%]'> <p className={`p-[16px] inline-block  font-medium text-[16px] rounded-[15px] 
                         bg-primaryColorLight text-white
                        `}>
                        {message.text}</p>
                    </div>
                </div>
            )
        }

        return (
            <div className={`flex gap-[10px] flex-start items-start mb-[25px] `}>
                <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center'>

                    <img src={"/user-image.jpg"} alt="profile picture" className='object-cover' />
                </div>

                {/* For text */}

                <div className='flex-1 flex justify-start'>
                    <p className={`p-[16px]  font-medium text-[16px]  rounded-[15px] 
                bg-accentColorLight text-black max-w-[52%]
                    `}>{message.text}</p>
                </div>

                <div className='w-[30px] h-[30px]'></div>
            </div>
        )

    }



    return (
        <div className='flex flex-col gap-[20px] h-[80vh] basis-[70%]'>

            <div className='shadow-normal bg-white h-full rounded-[15px] py-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center px-[20px]'>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        {/* Back button */}
                        {/* <button onClick={() => { }} className='w-[10px] h-[20px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src='/assets/back-arrow.svg' />
                        </button> */}
                        {/* profile */}
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src="/user-image.jpg" alt="profile picture" className='object-cover' />
                        </div>
                        {/* title */}
                        <div className='flex flex-col items-start justify-center'>
                            <p className='font-semibold text-[16px]'>Haji Mehdi</p>
                            <p className='font-semibold text-[14px]' style={{
                                color: "#2B9F03"
                            }}>Available</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <HeaderButton icon='' title='Translation' onClick={() => { }} isDropdown={true} />
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>

                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                {/* Conversation Tab */}

                {true &&
                    <div className='flex-1 overflow-scroll flex flex-col gap-[0px] px-[20px]' style={{
                        //  overflow: 'auto', // Allows scrolling
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                        {/* {getMessage(supportChat.conversation[0])} */}

                        {selectedChat?.conversation.map(
                            (message, index) => (
                                <div className='w-full'>
                                    {getMessage(message, index)}
                                </div>
                            )
                        )}



                        <div ref={endOfMessagesRef} />
                    </div>
                }
                {/* Files Tab */}
                {!"Right button clicked" &&
                    <div className='flex-1 overflow-scroll flex gap-[20px] px-[20px] flex-wrap' style={{
                        //  overflow: 'auto', // Allows scrolling
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                        {/*                         
                        {imageFiles.map(
                            (file, index) => (
                                <button onClick={() => {
                                    setImageSelected(index)
                                    setImageExpanded(true)

                                }} className='w-[130px] h-[130px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                    <img className="rounded-[15px] object-fill" src={file.image_link} alt={"input file"} />
                                </button>
                            )
                        )} */}
                    </div>
                }

                {/* Inputs Tab at the bottom */}

                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid '></div>

                <div className='flex justify-end items-center gap-[15px] px-[20px]'>
                    {/* buttons */}
                    {/* Image icon */}
                    <IconButton icon='/assets/add-image-outlined.svg' onClick={() => { }} />
                    {/* Text input */}
                    <input
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                // sendTextMessage()
                            }
                        }}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder='Write a message...'
                        className='p-[13px] font-semibold text-[16px] flex-1 border-borderColor border-[3px] border-solid rounded-[15px] text-primaryColorLight placeholder:text-primaryColorLight placeholder:opacity-50 focus:outline-primaryColorLight resize-none '
                        style={{
                            scrollbarWidth: "none"
                        }}

                    />
                    {/* Send button */}
                    <IconButton icon='/assets/arrow-up-white.svg' disabled={inputText == ""} filled
                        onClick={() => { }} />
                </div>

                {/* Image modal  */}
                {!"imageExpanded" ?
                    <ImageModal
                        imageSelected={""}
                        onClose={() => { }}
                        onNextClick={() => { }}
                        onPreviousClick={() => { }}
                    />
                    : <></>
                }

            </div>
        </div>
    )
}

export default Chat