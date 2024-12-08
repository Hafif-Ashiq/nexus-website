import HeaderButton from '@/components/HeaderButton';
import IconButton from '@/components/IconButton'
import React, { useEffect, useRef, useState } from 'react'
import { AiChatInterface, AiChatMessageInterface } from '@/services/AiChatInterface';

import Like from "../../../../../public/assets/like.svg"
import Dislike from "../../../../../public/assets/dislike.svg"
import { addOriginalMessage, addResponseMessage, updateAiChatConfig, updateMessageResponseStatus } from '@/firebaseFunctions/user/aiChat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loader from '@/components/Loader';
import SummarizationConfigModal from './modals/SummarizationConfigModal';
import { chat } from '@/services/abc';
import TranslationConfigModal from './modals/TranslationConfigModal';
import { TranslationConfig } from '@/services/Configs';
import { SummarizationConfig } from '@/services/Configs';
import { AiModelInterface } from '@/services/AiModelsInterface';
import { translate } from '@/backendFunctions/translation';
import { summarize } from '@/backendFunctions/summarization';

interface ChatProps {
    selectedChat: AiChatInterface | null
}

const Chat = ({ selectedChat }: ChatProps) => {

    if (!selectedChat) {
        return (
            <div className='flex flex-1 justify-center items-center h-[80vh]'>
                <Loader />
            </div>
        )
    }

    useEffect(() => {
        console.log("selected chat changed")
        console.log(selectedChat)
    }, [selectedChat])

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const allModels = useSelector((state: RootState) => state.aiModelsReducer.allModels) as AiModelInterface[]

    const translationModelId = useSelector((state: RootState) => state.aiModelsReducer.translationModelId)
    const abstractiveSummarizationModelId = useSelector((state: RootState) => state.aiModelsReducer.abstractiveSummarizationModelId)
    const extractiveSummarizationModelId = useSelector((state: RootState) => state.aiModelsReducer.extractiveSummarizationModelId)

    // State
    const [inputText, setInputText] = useState("")
    const [showSummarizationConfigModal, setShowSummarizationConfigModal] = useState<boolean>(false)
    const [showTranslationConfigModal, setShowTranslationConfigModal] = useState<boolean>(false)

    const [currentModel, setCurrentModel] = useState<AiModelInterface | null>(null)



    useEffect(() => {
        const modelId = getModelId()
        const model = allModels.find((model) => model.model_id == modelId)
        setCurrentModel(model ?? null)
    }, [allModels, selectedChat])

    useEffect(() => {
        // Scroll to the bottom of the chat when messages change
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        setShowSummarizationConfigModal(false)
        setShowTranslationConfigModal(false)
    }, [selectedChat]); // Dependency array includes messages





    const getTranslationFromModel = async () => {
        if (!currentModel) {
            return
        }
        const response = await translate(inputText, selectedChat.translation_config.source_languages[0], selectedChat.translation_config.target_languages[0], currentModel.endpoint)
        console.log(response)
        return response
    }


    const sendSummarizationMessage = async () => {
        if (!currentModel) {
            return
        }
        const response = await summarize(inputText, selectedChat.summarization_config.length, currentModel?.endpoint)
        console.log(response)
        return response
    }


    const likeMessage = (liked: boolean, index: number) => {

        const response_status = {
            is_liked: liked ? false : true,
            is_disliked: false
        }
        if (!currentModel) {
            return
        }
        updateMessageResponseStatus(userId, selectedChat.chat_id, index, selectedChat.conversation[index].response_message_id ?? "", response_status)
    }

    const dislikeMessage = (disliked: boolean, index: number) => {

        const response_status = {
            is_liked: false,
            is_disliked: disliked ? false : true
        }
        if (!currentModel) {
            return
        }
        updateMessageResponseStatus(userId, selectedChat.chat_id, index, selectedChat.conversation[index].response_message_id ?? "", response_status)
    }




    const handleConfigChange = (newConfig: SummarizationConfig | TranslationConfig) => {
        console.log(newConfig)
        updateAiChatConfig(selectedChat.chat_type, newConfig, userId, selectedChat.chat_id)

    }


    const getModelId = () => {
        const type = selectedChat.chat_type
        if (type == "Summarization") {
            if (selectedChat.summarization_config.type == "extractive") {
                return extractiveSummarizationModelId
            }
            else if (selectedChat.summarization_config.type == "abstractive") {
                return abstractiveSummarizationModelId
            }
        }
        else if (type == "Translation") {
            return translationModelId
        }
    }




    const handleTranslateMessage = async () => {
        if (!currentModel) {
            alert("No model selected")
            return
        }
        if (inputText.split(" ").length < 15) {
            alert("Input text is too short")
            return
        }
        addOriginalMessage(userId, selectedChat.chat_id, inputText)
        setInputText("")
        getTranslationFromModel().then((res: any) => {
            console.log(res)
            if (res.text) {
                addResponseMessage(userId, selectedChat.chat_id, res.text, currentModel?.model_id)
            }
        })
    }

    const handleSummarizeMessage = () => {
        if (!currentModel) {
            alert("No model selected")
            return
        }
        if (inputText.split(" ").length < 15) {
            alert("Input text is too short")
            return
        }
        addOriginalMessage(userId, selectedChat.chat_id, inputText)
        setInputText("")
        sendSummarizationMessage().then((res: any) => {
            console.log(res)
            if (res.text) {
                addResponseMessage(userId, selectedChat.chat_id, res.text, currentModel?.model_id)
            }
        })
    }




    // Render Message



    const getMessage = (message: AiChatMessageInterface, index: number) => {


        let isMessageFromUser: boolean = message.message_type == "original"

        if (isMessageFromUser) {

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
                <div className='min-w-[30px] w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center'>

                    <img src={"/user-image.jpg"} alt="profile picture" className='object-cover' />
                </div>

                {/* For text */}

                <div className='flex-1 flex justify-start items-center'>
                    <p
                        className={`p-[16px] font-medium text-[16px] rounded-[15px] bg-accentColorLight text-black max-w-[52%] ${selectedChat.chat_type === "Translation"
                            ?
                            "font-urdu leading-10 text-right " : ""
                            }`}>
                        {message.text}
                    </p>
                    {
                        message.response_status && <div className='flex gap-[5px] mx-[15px]'>
                            <button
                                className=' p-[8px] bg-accentColorLight rounded-full'
                                onClick={() => likeMessage(message.response_status?.is_liked ?? false, index)}
                            >
                                {
                                    message.response_status?.is_liked
                                        ?
                                        <Like fill="#2a4e8f" />
                                        :
                                        <Like stroke="#2a4e8f" />
                                }
                            </button>
                            <button
                                className=' p-[8px] bg-accentColorLight rounded-full '
                                onClick={() => dislikeMessage(message.response_status?.is_disliked ?? false, index)}
                            >
                                {
                                    message.response_status?.is_disliked
                                        ?
                                        <Dislike fill="#2a4e8f" />
                                        :
                                        <Dislike stroke="#2a4e8f" />
                                }
                            </button>
                        </div>
                    }
                </div>

            </div >
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
                            <p className='font-semibold text-[16px]'>AI Something</p>
                            <p className='font-semibold text-[14px]' style={{
                                color: "#2B9F03"
                            }}>Available</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <div className='relative'>
                            <HeaderButton icon='' title={selectedChat.chat_type} onClick={() => {
                                if (selectedChat.chat_type == "Summarization") {
                                    setShowSummarizationConfigModal(!showSummarizationConfigModal)
                                }
                                else if (selectedChat.chat_type == "Translation") {
                                    setShowTranslationConfigModal(!showTranslationConfigModal)
                                }
                            }} isDropdown={true} />
                            <div className='absolute top-[100%] right-0'>
                                {showSummarizationConfigModal && <SummarizationConfigModal config={selectedChat.summarization_config} onConfigChange={handleConfigChange} />}
                                {showTranslationConfigModal && <TranslationConfigModal config={selectedChat.translation_config} onConfigChange={handleConfigChange} />}
                            </div>
                        </div>
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>

                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                {/* Conversation Tab */}

                {true &&
                    <div className='flex-1 overflow-scroll flex flex-col gap-[0px] px-[20px]' style={{
                        //  overflow: 'auto', // Allows scrolling
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                        {selectedChat?.conversation.map(
                            (message, index) => (
                                <div key={index} className='w-full'>
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

                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid '></div>

                <div className=' flex justify-end items-center gap-[15px] px-[20px]'>
                    {/* buttons */}
                    {/* Text input */}
                    <textarea
                        onInput={(e) => {
                            e.currentTarget.style.height = 'auto'; // Reset height
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set height to scrollHeight
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                if (selectedChat.chat_type == "Translation") {
                                    handleTranslateMessage()
                                }
                                else if (selectedChat.chat_type == "Summarization") {
                                    handleSummarizeMessage()
                                }
                            }
                        }}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder='Write a message...'
                        className='p-[13px] font-semibold text-[16px] flex-1 border-borderColor border-[3px] border-solid rounded-[15px] text-primaryColorLight placeholder:text-primaryColorLight placeholder:opacity-50 focus:outline-primaryColorLight resize-none'
                        style={{
                            scrollbarWidth: "none",
                            overflow: 'hidden',
                            minHeight: '40px',
                            maxHeight: '240px',
                            height: 'auto',
                        }}
                        rows={1} // Start with one row
                    />
                    {/* Send button */}
                    <IconButton icon='/assets/arrow-up-white.svg' disabled={inputText == ""} filled
                        onClick={() => {
                            if (selectedChat.chat_type == "Translation") {
                                handleTranslateMessage()
                            }
                            else if (selectedChat.chat_type == "Summarization") {
                                handleSummarizeMessage()
                            }
                        }} />
                </div>



            </div>
        </div>
    )
}

export default Chat