import { SummarizationConfig, TranslationConfig } from '@/services/Configs'
import React, { useEffect, useState } from 'react'
import LargeNewChatButton from '../LargeNewChatButtons'
import { createNewSummarizationChat, createNewTranslationChat } from '@/firebaseFunctions/user/aiChat'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSelectedChat } from '@/redux/slices/userSlice'




const NewAiChatModal = ({ onClose }: { onClose: () => void }) => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const dispatch = useDispatch()


    const buttons = [
        {
            title: "AI Summarizer",
            text: "Discover AI Summarizer for precise text summarization. Choose your preferred length and style for a custom summary.",
            onClick: async () => {
                const chat = await createNewSummarizationChat(userId)
                console.log(chat)
                dispatch(setSelectedChat(chat))
                onClose()
            }
        },
        {
            title: "AI Translator",
            text: "Discover AI Translator to effortlessly translate text across a wide variety of languages.",
            onClick: async () => {
                const chat = await createNewTranslationChat(userId)
                console.log(chat)
                dispatch(setSelectedChat(chat))
                onClose()
            }
        }
    ]



    return (
        <div className='absolute right-0 top-[100%]  p-[20px] w-[500px] bg-white rounded-[15px] border-[1px] border-borderColorLight py-[20px] flex flex-col gap-[15px] shadow-normal'>
            <div className='flex items-center justify-between'>
                <span className='text-[20px] font-bold'>Chat Type</span>
                <div className="relative group">
                    <img src="/assets/more-circle.svg" alt="close" />
                    <div className="absolute hidden group-hover:block right-0 top-full mt-2 bg-white border border-borderColorLight rounded-lg py-2 px-3 shadow-md">
                        <span className="text-sm whitespace-nowrap">More options</span>
                    </div>
                </div>
            </div>



            <div className='flex flex-col gap-[15px]'>
                {
                    buttons.map((button, index) => (
                        <LargeNewChatButton
                            title={button.title}
                            text={button.text}
                            onClick={button.onClick}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default NewAiChatModal