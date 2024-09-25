import React, { useEffect, useRef, useState } from 'react'
import { getStatusColor } from '@/utils/support';
import { ConversationInterface, SupportInterface } from '@/services/SupportInterface';
import IconButton from '../../_components/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addImageMessage, addTextMessage } from '@/firebaseFunctions/supportChat';



const SupportChat = () => {


    const [inputText, setInputText] = useState<string>("")

    const supportChat: SupportInterface = useSelector((state: RootState) => state.adminReducer.currentSupportChat)
    const adminId: string = useSelector((state: RootState) => state.adminReducer.adminId)

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [supportChat]); // Dependency array includes messages
    // , [supportChat, supportChat.conversation,]
    useEffect(() => {
        console.log(supportChat);

    }, [supportChat])


    const getMessage = (message: ConversationInterface, isLast: boolean) => {
        let isAdmin: boolean = message.sender_id == adminId

        if (isAdmin) {
            return (
                <div className={`flex gap-[10px] items-start justify-end`}>
                    <div className='w-[30px] h-[30px]'></div>

                    <div className='flex-1 flex justify-end'>
                        {
                            message.message_type == "text" ? <p className={`p-[16px] inline-block  font-semibold text-[16px] rounded-[15px] 
                         bg-primaryColorLight text-white
                        `}>{message.text}</p> : <></>
                        }

                        {
                            message.message_type == "image" ? <img className="rounded-[15px]" src={message.image_link} alt="" /> : <></>
                        }
                    </div>
                    <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center'>
                        <img src={isAdmin ? "/admin-image.jpg" : "/user-image.jpg"} alt="profile picture" className='object-cover' />
                    </div>
                </div>
            )
        }

        return (
            <div className={`flex gap-[10px] flex-start items-start`}>
                <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center'>
                    <img src={"/user-image.jpg"} alt="profile picture" className='object-cover' />
                </div>

                <div className='flex-1 flex justify-start'>
                    {
                        message.message_type == "text" ?
                            <p className={`p-[16px]  font-semibold text-[16px]  rounded-[15px] 
                bg-accentColorLight text-black 
                    `}>{message.text}</p> : <></>}
                    {
                        message.message_type == "image" ? <img className="rounded-[15px]" src={message.image_link} alt="" /> : <></>
                    }

                </div>
                <div className='w-[30px] h-[30px]'></div>

            </div>
        )

    }


    const sendTextMessage = () => {
        addTextMessage({ message: inputText, documentId: supportChat.issue_id, senderId: adminId })
        setInputText("")
    }

    const uploadImage = async () => {
        try {
            // Open file picker
            const [fileHandle] = await (window as any).showOpenFilePicker({
                types: [
                    {
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                        },
                    },
                ],
            });

            // Get the selected file
            const file = await fileHandle.getFile();
            console.log(file);
            addImageMessage({
                imageFile: file,
                documentId: supportChat.issue_id,
                senderId: adminId
            })
        }
        catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }



    return (
        <div className='flex flex-col gap-[20px] h-[80vh]'>

            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center '>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        {/* profile */}
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src="/user-image.jpg" alt="profile picture" className='object-cover' />
                        </div>
                        {/* title */}
                        <div className='flex flex-col items-start justify-center'>
                            <p className='font-semibold text-[16px]'>{supportChat.user_name}</p>
                            <p className='font-semibold text-[14px]' style={{
                                color: getStatusColor(supportChat.issue_status)
                            }}>{supportChat.issue_status}</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/folder-minus-blue.svg' onClick={() => { }} />
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>

                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                <div className='flex-1 overflow-scroll flex flex-col gap-[25px]' style={{
                    //  overflow: 'auto', // Allows scrolling
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                }}>
                    {/* {getMessage(supportChat.conversation[0])} */}
                    {supportChat.conversation.map(
                        (message, index) => (
                            <div className='w-ful'>
                                {getMessage(message, index == supportChat.conversation.length - 1)}
                            </div>
                        )
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
                {
                    supportChat.issue_status == "Pending" ?
                        <>
                            <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>

                            <div className='flex justify-end items-center gap-[15px]'>
                                {/* buttons */}
                                <IconButton icon='/assets/add-image-outlined.svg' onClick={uploadImage} />
                                <input
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            sendTextMessage()
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
                                <IconButton icon='/assets/arrow-up-white.svg' disabled={inputText == ""} filled
                                    onClick={sendTextMessage} />
                            </div>
                        </> : <></>
                }
            </div>
        </div>
    )
}

export default SupportChat