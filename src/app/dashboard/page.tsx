"use client"
import Header from '@/components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import LargeButton from '../admin/_components/LargeButton'
import ContentList from './library/_components/ContentList'
import { setAllContent, setCurrentContent } from '@/redux/slices/librarySlice'
import { listenToUserContent } from '@/firebaseFunctions/user/content'
import { useEffect, useState } from 'react'
import { ContentInterface } from '@/services/ContentInterface'
import PostsSection from '@/components/postComponents/PostsSection'
import { listenToPosts } from '@/firebaseFunctions/user/postFunctions/getPosts'
import { PostInterface } from '@/services/PostInterface'


const page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<PostInterface[]>([])
    const [loadingPosts, setLoadingPosts] = useState(true);

    const router = useRouter()
    const dispatch = useDispatch()

    const content = useSelector((state: RootState) => state.libraryReducer.allContent)

    const [recentContent, setRecentContent] = useState<ContentInterface[]>([])

    useEffect(() => {
        listenToUserContent(userId, (content) => dispatch(setAllContent(content)))
        listenToPosts((newPosts) => {
            setPosts(newPosts);
            setLoadingPosts(false);
        }, 4, undefined, false);
    }, [userId, dispatch])

    useEffect(() => {
        const recentContent = content.slice(0, 5)
        setRecentContent(recentContent)
        setIsLoading(false)
    }, [content])


    return (
        <div className='flex flex-col gap-[40px]'>

            <Header title='Welcome Back, Mehdi' subtitle="Here's a little bit of everything" />


            <div className='w-[70%] flex flex-col gap-[20px] '>
                {/* CTA buttons */}
                <div className={`p-[20px] bg-white rounded-[15px] min-h-[195px] flex justify-center items-center gap-[20px]`}>
                    <LargeButton activeIcon='translate' inActiveIcon='' text='Translate' title='Chat with AI' active onClick={() => { }} />
                    <LargeButton activeIcon='translate' inActiveIcon='' text='Summarize' title='Chat with AI' active onClick={() => { }} />
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
                                <ContentList
                                    content={recentContent}
                                    showHeader={false}
                                    onContentClick={(cont) => {
                                        dispatch(setCurrentContent(cont))
                                        router.push(`/dashboard/library/content/${cont.content_id}`)
                                    }} />
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
                <div className='py-[20px] rounded-[15px] flex flex-col gap-[20px]'>
                    <PostsSection posts={posts} loading={loadingPosts} onLoadMore={() => { }} />
                    {posts.length > 0 && <button onClick={() => {
                        router.push('/dashboard/community')
                    }} className='text-[16px] font-medium text-primaryColorLight underline'>View More Posts</button>}
                </div>

            </div>





        </div>
    )
}

export default page