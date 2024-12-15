"use client"
import { useEffect, useState } from 'react'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToContent, listenToFolderContent } from '@/firebaseFunctions/user/content'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useParams } from 'next/dist/client/components/navigation'
import LibraryHeaderBreadCrumb from '../../../../_components/LibraryHeaderBreadCrumb'
import ContentSideBar from '../../../../_components/ContentSideBar'
import { getDateFormatted } from '@/utils/datetime'


import Like from "../../../../../../../../public/assets/like.svg"
import Dislike from "../../../../../../../../public/assets/dislike.svg"
import { summarize } from '@/backendFunctions/summarization'
import { addSummarizationText, addTranslationText } from '@/firebaseFunctions/user/contentFunctions/addContent'
import { translate } from '@/backendFunctions/translation'
import Loader from '@/components/Loader'
import { updateContentResponseStatus } from '@/firebaseFunctions/user/contentFunctions/statusFunctions'

const Page = () => {
    const params = useParams();
    const contentId = params.contentId as string;

    const extractiveSummarizationModelId = useSelector((state: RootState) => state.aiModelsReducer.extractiveSummarizationModelId)
    const translationModelId = useSelector((state: RootState) => state.aiModelsReducer.translationModelId)
    const allModels = useSelector((state: RootState) => state.aiModelsReducer.allModels)
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const dispatch = useDispatch()

    const [showOriginalContent, setShowOriginalContent] = useState(false)

    const [content, setContent] = useState<ContentInterface | null>(null)
    const [selectedContent, setSelectedContent] = useState<"summarization" | "translation">("summarization")
    const [textToShow, setTextToShow] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        listenToContent(userId, contentId, setContent)
    }, [contentId, userId])

    useEffect(() => {
        if (!content) return;

        if (content.summarization?.text) {
            setSelectedContent("summarization")
            setTextToShow(content.summarization.text)
        } else if (content.translation?.text) {
            setSelectedContent("translation")
            setTextToShow(content.translation.text)
        } else {
            setSelectedContent("summarization")
            setTextToShow("")
        }
    }, [content])

    useEffect(() => {
        if (!content) return;

        if (selectedContent === "summarization") {
            setTextToShow(content.summarization?.text || "")
        } else {
            setTextToShow(content.translation?.text || "")
        }
    }, [content, selectedContent])

    if (content == null) {
        return (
            <div className='h-[80vh] flex items-center justify-center'>
                <Loader />
            </div>
        )
    }

    const handleSelectContent = (value: "summarization" | "translation") => {
        setSelectedContent(value)
    }

    const handleGenerate = async () => {
        setIsLoading(true)
        if (selectedContent === "summarization") {
            await handleSummarize(contentId)
        } else {
            await handleTranslate(contentId)
        }
        setIsLoading(false)
    }

    const handleSummarize = async (contentId: string) => {
        const model = allModels.find((model) => model.model_id === extractiveSummarizationModelId)
        const response = await summarize(content.extracted_text, "medium", model?.endpoint || "")
        console.log(response)
        setTextToShow(response.text)
        await addSummarizationText(userId, contentId, response.text);

    }

    const handleTranslate = async (contentId: string) => {
        const model = allModels.find((model) => model.model_id === translationModelId)
        const response = await translate(content.extracted_text, "English", "Urdu", model?.endpoint || "")
        console.log(response)
        setTextToShow(response.text)
        await addTranslationText(userId, contentId, response.text);
    }

    const handleLikeContentResponse = async () => {
        await updateContentResponseStatus(userId, contentId, selectedContent == "summarization" ? extractiveSummarizationModelId : translationModelId, selectedContent, { is_liked: true, is_disliked: false })
    }
    const handleDisLikeContentResponse = async () => {
        await updateContentResponseStatus(userId, contentId, selectedContent == "summarization" ? extractiveSummarizationModelId : translationModelId, selectedContent, { is_liked: false, is_disliked: true })
    }


    return (
        <div className='flex flex-col gap-[40px]'>
            {/* <Header title='Library' subtitle='Navigate through the library of content' /> */}
            <LibraryHeaderBreadCrumb subtitle={content ? getDateFormatted(content.date_updated) : ""} />
            <div className='flex gap-[20px]'>

                <main className='basis-[70%] flex flex-col gap-[20px]  rounded-2xl w-full h-[80vh]'>
                    <div className='flex flex-col gap-[22px]  h-full'>
                        <button className={`bg-white rounded-2xl flex p-[20px] transition-all duration-300 ${showOriginalContent ? 'basis-[60%] pointer-events-none ' : 'basis-[40%] cursor-pointer'}`} onClick={() => setShowOriginalContent(true)}>
                            <div className={`flex-1 h-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 border-[3px] border-solid border-transparent ${showOriginalContent ? 'bg-white gap-[25px]' : 'opacity-50 bg-accentColorLight gap-[10px] hover:border-primaryColorLight'}`}>
                                <div className={`font-semibold text-[16px] text-primaryColorLight rounded-[12px] border-[2px] border-solid transition-all duration-300 px-[10px] ${showOriginalContent ? 'border-borderColor py-[10px]' : 'border-transparent mx-[20px] mt-[20px]'}`}>
                                    Original
                                </div>
                                <div className={`font-medium w-full text-black text-justify bg-accentColorLight flex-1 px-[20px] rounded-lg overflow-hidden ${showOriginalContent ? 'py-[20px]' : 'py-[10px] text-ellipsis line-clamp-6'}`}>
                                    {content.extracted_text}
                                </div>

                            </div>
                        </button>
                        <button className={`bg-white rounded-2xl flex p-[20px] transition-all duration-300 ${!showOriginalContent ? 'basis-[60%] cursor-default' : 'basis-[40%] cursor-pointer'}`} onClick={() => setShowOriginalContent(false)}>
                            <div className={`flex-1 h-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 border-[3px] border-solid border-transparent ${!showOriginalContent ? 'bg-white gap-[25px]' : 'opacity-50 bg-accentColorLight gap-[10px] hover:border-primaryColorLight'}`}>
                                <div className='flex justify-between items-center w-full'>
                                    <select className={`font-semibold text-[16px] text-primaryColorLight rounded-[12px] border-[2px] border-solid transition-all duration-300 px-[10px]  ${!showOriginalContent ? 'border-borderColor py-[10px] ' : 'bg-accentColorLight border-transparent mx-[20px] mt-[20px]'}`} value={selectedContent} onChange={(e) => handleSelectContent(e.target.value as "summarization" | "translation")}>
                                        <option value="summarization" className='font-semibold'>Summarization</option>
                                        <option value="translation" className='font-semibold'>Translation</option>
                                    </select>

                                    {
                                        !showOriginalContent && <div className='flex gap-[10px]'>

                                            <button
                                                className=' p-[8px] border-accentColorLight border-[3px] rounded-full'
                                                onClick={handleLikeContentResponse}
                                            >
                                                {
                                                    content[selectedContent]?.status?.is_liked
                                                        ?
                                                        <Like fill="#2a4e8f" />
                                                        :
                                                        <Like stroke="#2a4e8f" />
                                                }
                                            </button>
                                            <button
                                                className='p-[8px] border-accentColorLight border-[3px] rounded-full'
                                                onClick={handleDisLikeContentResponse}
                                            >
                                                {
                                                    content[selectedContent]?.status?.is_disliked
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
                                <div className={`font-medium text-black text-justify bg-accentColorLight flex-1 w-full px-[20px] rounded-lg overflow-auto ${!showOriginalContent ? 'py-[20px]' : 'py-[10px] text-ellipsis line-clamp-6'} ${selectedContent === "summarization" ? '' : 'font-urdu leading-[45px] text-right'}`}>
                                    {textToShow}
                                    {isLoading &&
                                        <div className='flex justify-center items-center w-full h-full'>
                                            <Loader />
                                        </div>
                                    }
                                </div>
                                <div className='flex justify-center w-full'>
                                    {textToShow == "" && <button onClick={handleGenerate} className='bg-accentColorLight text-black font-semibold text-[16px] px-[20px] py-[10px] rounded-[10px]'>
                                        Generate
                                    </button>}
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

export default Page