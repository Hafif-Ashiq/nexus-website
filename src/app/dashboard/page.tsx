"use client"
import Header from '@/components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import LargeButton from '../admin/_components/LargeButton'
import ContentList from './library/_components/ContentList'
import { setAllContent, setAllFolders, setCurrentContent } from '@/redux/slices/librarySlice'
import { listenToUserContent } from '@/firebaseFunctions/user/content'
import { useEffect, useState } from 'react'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToPosts } from '@/firebaseFunctions/user/postFunctions/getPosts'
import { PostInterface } from '@/services/PostInterface'
import { setChats, setSelectedChat } from '@/redux/slices/userSlice'
import { createNewSummarizationChat, createNewTranslationChat, listenToAiChatHistory } from '@/firebaseFunctions/user/aiChat'
import UserSideBarInfo from './_components/UserSideBarInfo'
// import { FolderInterface } from '@/services/FolderInterface'
// import { listenToUserFolders } from '@/firebaseFunctions/user/folders'
// import { setAllFolders, setCurrentFolder } from '@/redux/slices/folderSlice'
// import FolderList from './library/_components/FolderList'
import { FolderInterface } from '@/services/FoldersInterface'
import { listenToUserFolders } from '@/firebaseFunctions/user/folder'
import { FolderIcon } from './library/_components/LibrarySideBar'
import { getDateFormatted } from '@/utils/datetime'

const Page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const user = useSelector((state: RootState) => state.userReducer.user)

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<PostInterface[]>([])
    const [loadingPosts, setLoadingPosts] = useState(true);

    const router = useRouter()
    const dispatch = useDispatch()

    const content = useSelector((state: RootState) => state.libraryReducer.allContent)
    const folders = useSelector((state: RootState) => state.libraryReducer.allFolders)

    const [recentContent, setRecentContent] = useState<ContentInterface[]>([])
    const [recentFolders, setRecentFolders] = useState<FolderInterface[]>([])

    const [isSummarizing, setIsSummarizing] = useState(false)
    const [isTranslating, setIsTranslating] = useState(false)

    useEffect(() => {
        listenToUserContent(userId, (content) => dispatch(setAllContent(content)))
        listenToUserFolders(userId, (folders) => dispatch(setAllFolders(folders)))
        listenToPosts((newPosts) => {
            setPosts(newPosts);
            setLoadingPosts(false);
        }, 4, undefined, false);
        let aiChats = listenToAiChatHistory(userId, (result) => {
            console.log(result);
            dispatch(setChats(result))
        });

        return () => aiChats();
    }, [userId, dispatch])

    useEffect(() => {
        const recentContent = content.slice(0, 5)
        setRecentContent(recentContent)
        const recentFolders = folders.slice(0, 5)
        setRecentFolders(recentFolders)
        setIsLoading(false)
    }, [content, folders])

    const startSummarize = async () => {
        setIsSummarizing(true)
        const chat = await createNewSummarizationChat(userId)
        console.log(chat)
        dispatch(setSelectedChat(chat))
        router.push('/dashboard/ai-chat')
        setIsSummarizing(false)
    }

    const startTranslate = async () => {
        setIsTranslating(true)
        const chat = await createNewTranslationChat(userId)
        console.log(chat)
        dispatch(setSelectedChat(chat))
        router.push('/dashboard/ai-chat')
        setIsTranslating(false)
    }

    return (
        <div className='flex flex-col gap-[40px]'>

            <Header title={`Welcome Back, ${user?.first_name ?? ''} ${user?.last_name ?? ''}`} subtitle="Here's a little bit of everything" />


            <div className='flex justify-between gap-[20px]'>
                <div className='basis-[70%] flex flex-col gap-[20px] '>
                    {/* CTA buttons */}
                    <div className={`p-[20px] bg-white  rounded-[15px] min-h-[220px] flex justify-center items-center gap-[20px]`}>
                        <LargeButton activeIcon='translate' inActiveIcon='' text='Translate' title='Chat with AI' active onClick={startTranslate} disabled={isTranslating} height='h-[210px]' />
                        <LargeButton activeIcon='translate' inActiveIcon='' text='Summarize' title='Chat with AI' active onClick={startSummarize} disabled={isSummarizing} height='h-[210px]' />
                    </div>

                    {/* Folders */}
                    <div className='py-[20px] bg-white rounded-[15px] flex flex-col gap-[20px]'>
                        <div className='flex justify-between items-center px-[20px]'>
                            <span className='text-[24px] font-semibold'>Recent Folders</span>
                            <button onClick={() => {
                                router.push('/dashboard/library')
                            }} className='text-[16px] font-medium text-primaryColorLight underline'>View All</button>
                        </div>
                        {/* folders */}
                        <div className='h-[2px] w-full bg-borderColorLight'></div>
                        {
                            !isLoading ?
                                recentFolders.length > 0 ?
                                    <div className='flex overflow-x-auto gap-[15px] p-[15px] rounded-[15px] w-full'>
                                        {
                                            recentFolders.map((folder) => {
                                                return (
                                                    <button onClick={() => {
                                                        router.push(`/dashboard/library/folder/${folder.folder_id}`)
                                                    }} className={`flex max-w-[200px] flex-col justify-start items-start gap-[15px] overflow-hidden p-[15px] rounded-[15px] bg-accentColorLight w-full text-left border-[1px] border-solid border-transparent hover:border-primaryColorLight transition-all duration-200 `}>
                                                        <FolderIcon index={folder.icon} />
                                                        <p className='font-medium text-[16px] max-h-[48px] overflow-hidden w-full text-ellipsis'>{folder.title}</p>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='w-full h-[100px] flex justify-center items-center'>
                                        <p className='text-[16px] font-medium text-primaryColorLight'>No recent folders</p>
                                    </div>
                                :
                                <div className='w-full h-[100px] flex justify-center items-center'>
                                    <Loader />
                                </div>
                        }
                    </div>



                    {/* Content */}
                    <div className='py-[20px] bg-white rounded-[15px] flex flex-col gap-[20px]'>
                        <div className='flex justify-between items-center px-[20px]'>
                            <span className='text-[24px] font-semibold'>Recent Content</span>
                            <button onClick={() => {
                                router.push('/dashboard/library')
                            }} className='text-[16px] font-medium text-primaryColorLight underline'>View All</button>
                        </div>
                        <div className='h-[2px] w-full bg-borderColorLight'></div>
                        {
                            !isLoading ?
                                recentContent.length > 0 ?
                                    <div className="grid grid-cols-3 gap-4 px-[20px]">
                                        {recentContent.map((content) => (
                                            <button
                                                key={content.content_id}
                                                onClick={() => {
                                                    dispatch(setCurrentContent(content))
                                                    router.push(`/dashboard/library/content/${content.content_id}`)
                                                }}
                                                className="relative h-[200px] rounded-[15px] overflow-hidden group"
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${content.thumbnail})` }}
                                                />
                                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-200" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
                                                    <h3 className="font-medium text-[16px] mb-2 line-clamp-2">{content.title}</h3>
                                                    <p className="text-sm opacity-80">{getDateFormatted(content.date_updated)}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    :
                                    <div className='w-full h-[100px] flex justify-center items-center'>
                                        <p className='text-[16px] font-medium text-primaryColorLight'>No recent content</p>
                                    </div>
                                :
                                <div className='w-full h-[100px] flex justify-center items-center'>
                                    <Loader />
                                </div>
                        }
                    </div>


                    {/* Posts */}
                    {/* <div className='py-[20px] rounded-[15px] flex flex-col gap-[20px]'>
                        <PostsSection posts={posts} loading={loadingPosts} onLoadMore={() => { }} />
                        {posts.length > 0 && <button onClick={() => {
                            router.push('/dashboard/community')
                        }} className='text-[16px] font-medium text-primaryColorLight underline'>View More Posts</button>}
                    </div> */}

                </div>
                <UserSideBarInfo />


            </div>


        </div>
    )
}

export default Page