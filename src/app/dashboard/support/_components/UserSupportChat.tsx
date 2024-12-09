import React, { useEffect, useRef, useState } from 'react'
import { getStatusColor } from '@/utils/support';
import { ConversationInterface, SupportInterface } from '@/services/SupportInterface';
import IconButton from '../../../../components/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addImageMessage, addTextMessage } from '@/firebaseFunctions/admin/supportChat';
import ImageModal from '@/components/modals/ImageModal';
import Loader from '@/components/Loader';



const UserSupportChat = () => {


    const [inputText, setInputText] = useState<string>("")

    const [filesOpen, setFilesOpen] = useState<boolean>(false)

    const [imageFiles, setImageFiles] = useState<ConversationInterface[]>([])

    const [imageExpanded, setImageExpanded] = useState<boolean>(false)
    const [imageSelected, setImageSelected] = useState<number>(0)

    const supportChat: SupportInterface | null = useSelector((state: RootState) => state.userReducer.selectedUserSupportChat)
    const userId: string = useSelector((state: RootState) => state.userReducer.userId)

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const [lastUserMessageIndex, setLastUserMessageIndex] = useState<number>(0)


    if (!supportChat) {
        return <div className='h-[80vh] flex justify-center items-center'>
            <Loader />
        </div>
    }


    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        // Profile photo show
        let chat = supportChat.conversation
        for (let index = 0; index < chat.length; index++) {

            if (chat[index].sender_id != userId && chat[index - 1]?.sender_id == userId) {
                {
                    setLastUserMessageIndex(index)
                }
            }
        }


    }, [supportChat, supportChat.conversation]);


    useEffect(() => {

        const imgs = supportChat.conversation.filter((chat) => chat.message_type == "image")

        setImageFiles(imgs)
    }, [supportChat])


    const sendTextMessage = () => {
        addTextMessage({ message: inputText, documentId: supportChat.issue_id, senderId: userId })
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
                            'image/*': ['.png', '.jpg', '.jpeg'],
                        },
                    },
                ],
            });

            const validExtensions = ['png', 'jpg', 'jpeg']
            // Get the selected file
            const file = await fileHandle.getFile();
            console.log(file);
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select an image file.');
                return
            }

            addImageMessage({
                imageFile: file,
                documentId: supportChat.issue_id,
                senderId: userId
            })
        }
        catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }





    const getMessage = (message: ConversationInterface, index: number) => {
        let isUser: boolean = message.sender_id == userId
        let nextIsUser: boolean = supportChat.conversation[index + 1]?.sender_id == userId
        let isLastMessage: boolean = index == supportChat.conversation.length - 1

        if (isUser) {
            return (
                <div key={supportChat.issue_id + "_" + index} className={`flex gap-[10px] items-start justify-end  ${(nextIsUser && isUser) || isLastMessage ? "mb-[3px]" : "mb-[25px]"}`}>
                    <div className='w-[30px] h-[30px]'></div>

                    {/* For text */}
                    {
                        message.message_type == "text" ? <div className='flex-1 max-w-[60%] flex justify-end'> <p className={`p-[16px] inline-block  font-semibold text-[16px] rounded-[15px] 
                         bg-primaryColorLight text-white
                        `}>{message.text}</p> </div> : <></>
                    }
                    {/* For image */}
                    {
                        message.message_type == "image" ? <button onClick={() => {
                            setImageSelected(imageFiles.findIndex(files => files.image_link == message.image_link))
                            setImageExpanded(true)

                        }} className='max-w-[400px] flex justify-end'>
                            <img className="rounded-[15px]" src={message.image_link} alt="" />
                        </button> : <></>
                    }

                </div>
            )
        }

        return (
            <div className={`flex gap-[10px] flex-start items-start  ${(!nextIsUser && !isUser) || isLastMessage ? "mb-[2px]" : "mb-[25px]"}`}>
                <div className='w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center'>

                    {index == lastUserMessageIndex ? <img src={"/user-image.jpg"} alt="profile picture" className='object-cover' /> : <></>}
                </div>

                {/* For text */}
                {
                    message.message_type == "text" ?
                        <div className='flex-1 max-w-[60%] flex justify-start'>
                            <p className={`p-[16px]  font-semibold text-[16px]  rounded-[15px] 
                bg-accentColorLight text-black 
                    `}>{message.text}</p> </div> : <></>
                }
                {/* For image */}
                {

                    message.message_type == "image" ? <button onClick={() => {
                        setImageSelected(imageFiles.findIndex(files => files.image_link == message.image_link))
                        setImageExpanded(true)

                    }} className='max-w-[400px] flex justify-start'>
                        <img className="rounded-[15px]" src={message.image_link} alt="" /> </button> : <></>
                }


                <div className='w-[30px] h-[30px]'></div>

            </div>
        )

    }



    // const getFiles = () => {

    //     return 
    // }



    return (
        <div className='flex flex-col gap-[20px] h-[80vh]'>

            <div className='shadow-normal bg-white h-full rounded-[15px] py-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center px-[20px]'>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        {filesOpen ? <button onClick={() => setFilesOpen(false)} className='w-[10px] h-[20px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src='/assets/back-arrow.svg' />
                        </button> : <></>}
                        {/* profile */}
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src="/user-image.jpg" alt="profile picture" className='object-cover' />
                        </div>
                        {/* title */}
                        <div className='flex flex-col items-start justify-center'>
                            <p className='font-semibold text-[16px]'>Admin</p>
                            <p className='font-semibold text-[14px]' style={{
                                color: getStatusColor(supportChat.issue_status)
                            }}>{supportChat.issue_status}</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/folder-minus-blue.svg' opened={filesOpen} onClick={() => { setFilesOpen(true) }} />
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>

                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                {/* Conversation Tab */}
                {!filesOpen &&
                    <div className='flex-1 overflow-scroll flex flex-col gap-[0px] px-[20px]' style={{
                        //  overflow: 'auto', // Allows scrolling
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                        {/* {getMessage(supportChat.conversation[0])} */}
                        {supportChat.conversation.map(
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
                {filesOpen &&
                    <div className='flex-1 overflow-scroll flex gap-[20px] px-[20px] flex-wrap' style={{
                        //  overflow: 'auto', // Allows scrolling
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                        {imageFiles.map(
                            (file, index) => (
                                <button onClick={() => {
                                    setImageSelected(index)
                                    setImageExpanded(true)

                                }} className='w-[130px] h-[130px] rounded-[15px] overflow-hidden flex justify-center items-center'>
                                    <img className="rounded-[15px] object-fill" src={file.image_link} alt={"input file"} />
                                </button>
                            )
                        )}
                    </div>
                }

                {/* Inputs Tab at the bottom */}
                {
                    supportChat.issue_status == "Pending" ?
                        <>
                            <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid '></div>

                            <div className='flex justify-end items-center gap-[15px] px-[20px]'>
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
                {/* Image modal */}
                {imageExpanded ?

                    <ImageModal
                        imageSelected={imageFiles[imageSelected].image_link}
                        onClose={() => setImageExpanded(false)}
                        onNextClick={() => {
                            imageSelected < imageFiles.length - 1 ? setImageSelected(imageSelected + 1) : setImageSelected(0)
                        }}
                        onPreviousClick={() => {
                            imageSelected == 0 ? setImageSelected(imageFiles.length - 1) : setImageSelected(imageSelected - 1)
                        }}
                    />
                    : <></>
                }

            </div>
        </div>
    )
}

export default UserSupportChat