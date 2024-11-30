"use client"
import { useEffect, useState } from 'react'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToContent, listenToFolderContent } from '@/firebaseFunctions/user/content'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useParams } from 'next/dist/client/components/navigation'
import LibraryHeaderBreadCrumb from '../../_components/LibraryHeaderBreadCrumb'
import ContentSideBar from '../../_components/ContentSideBar'
import { getDateFormatted } from '@/utils/datetime'


import Like from "../../../../../../public/assets/like.svg"
import Dislike from "../../../../../../public/assets/dislike.svg"

const page = () => {
    const params = useParams();
    const contentId = params.contentId as string;

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const dispatch = useDispatch()

    const [showOriginalContent, setShowOriginalContent] = useState(false)

    const [content, setContent] = useState<ContentInterface | null>(null)

    useEffect(() => {
        listenToContent(userId, contentId, setContent)
    }, [contentId])


    if (content == null) {
        return (
            <h1>No Content to Show</h1>
        )
    }

    return (
        <div className='flex flex-col gap-[40px]'>
            {/* <Header title='Library' subtitle='Navigate through the library of content' /> */}
            <LibraryHeaderBreadCrumb subtitle={content ? getDateFormatted(content.date_updated) : ""} />
            <div className='flex gap-[20px]'>

                <main className='basis-[70%] flex flex-col gap-[20px]  rounded-2xl w-full h-[80vh]'>
                    <div className='flex flex-col gap-[22px]  h-full'>
                        <button className={`bg-white rounded-2xl flex p-[20px] transition-all duration-300 ${showOriginalContent ? 'basis-[60%] pointer-events-none ' : 'basis-[40%] cursor-pointer'}`} onClick={() => setShowOriginalContent(true)}>
                            <div className={`flex-1 h-full flex flex-col items-start justify-start   rounded-lg transition-all duration-300 border-[3px] border-solid border-transparent ${showOriginalContent ? 'bg-white gap-[25px]' : 'opacity-50 bg-accentColorLight gap-[10px] hover:border-primaryColorLight'}`}>
                                <div className={`font-semibold text-[16px] text-primaryColorLight rounded-[12px]  border-[2px] border-solid transition-all duration-300  px-[10px] ${showOriginalContent ? 'border-borderColor  py-[10px]' : 'border-transparent mx-[20px] mt-[20px]'}`}>
                                    Original
                                </div>
                                <div className={`font-medium text-black text-justify bg-accentColorLight flex-1 px-[20px] rounded-lg ${showOriginalContent ? 'py-[20px]' : 'py-[10px]'}`}>
                                    {content.extracted_text}
                                </div>

                            </div>
                        </button>
                        <button className={`bg-white rounded-2xl flex p-[20px] transition-all duration-300 ${!showOriginalContent ? 'basis-[60%] cursor-default' : 'basis-[40%] cursor-pointer'}`} onClick={() => setShowOriginalContent(false)}>
                            <div className={`flex-1 h-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 border-[3px] border-solid border-transparent ${!showOriginalContent ? 'bg-white gap-[25px]' : 'opacity-50 bg-accentColorLight gap-[10px] hover:border-primaryColorLight'}`}>
                                <div className='flex justify-between items-center w-full'>
                                    <button className={`font-semibold text-[16px] text-primaryColorLight rounded-[12px] border-[2px] border-solid transition-all duration-300 px-[10px] ${!showOriginalContent ? 'border-borderColor py-[10px]' : 'border-transparent mx-[20px] mt-[20px]'}`}>
                                        Summary
                                    </button>

                                    {
                                        !showOriginalContent && <div className='flex gap-[10px]'>

                                            <button
                                                className=' p-[8px] border-accentColorLight border-[3px] rounded-full'
                                                onClick={() => { }}
                                            >
                                                {
                                                    content.summarization?.status?.is_liked
                                                        ?
                                                        <Like fill="#2a4e8f" />
                                                        :
                                                        <Like stroke="#2a4e8f" />
                                                }
                                            </button>
                                            <button
                                                className='p-[8px] border-accentColorLight border-[3px] rounded-full'
                                                onClick={() => { }}
                                            >
                                                {
                                                    content.summarization?.status?.is_disliked
                                                        ?
                                                        <Dislike fill="#2a4e8f" />
                                                        :
                                                        <Dislike stroke="#2a4e8f" />
                                                }
                                            </button>
                                            <button className='py-[8px] px-[15px] border-accentColorLight border-[3px] rounded-[10px] flex gap-[10px] items-center text-primaryColorLight'>
                                                <img src="/assets/small-arrow-right.svg" alt="down arrow" className='rotate-90' />
                                                <span>More</span>
                                            </button>

                                        </div>
                                    }

                                </div>
                                <div className={`font-medium text-black text-justify bg-accentColorLight flex-1 px-[20px] rounded-lg ${!showOriginalContent ? 'py-[20px]' : 'py-[10px]'}`}>
                                    {content?.summarization?.text}
                                </div>
                            </div>
                        </button>
                    </div>
                </main>

                <ContentSideBar content={content} />
            </div>

        </div>

    )
}

export default page