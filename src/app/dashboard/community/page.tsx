"use client"
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import Guides from '@/components/Guides'
import { getGuidesFromFirebase } from '@/firebaseFunctions/admin/guide'
import { GuideInterface } from '@/services/GuideInterface'
import CreatePost from './_components/CreatePost'
import { listenToPosts } from '@/firebaseFunctions/user/postFunctions/getPosts'
import { PostInterface } from '@/services/PostInterface'
import PostsSection from '@/components/postComponents/PostsSection'
import Loader from '@/components/Loader'

const Page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const router = useRouter()
    const dispatch = useDispatch()

    const [postId, setPostId] = useState("4XuQ2c48hVHbxvV03HjH")


    const [posts, setPosts] = useState<PostInterface[]>([])
    const [postLimit, setPostLimit] = useState(10)
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingGuides, setLoadingGuides] = useState(true);


    useEffect(() => {
        setLoadingPosts(true);
        setLoadingGuides(true);
        listenToPosts((newPosts) => {
            setPosts(newPosts);
            setLoadingPosts(false);
        }, postLimit, undefined, false);
        getGuidesFromFirebase().then(res => {
            setGuides(res);
            setLoadingGuides(false);
        })
    }, [postLimit]);

    const loadMorePosts = () => {
        setLoadingPosts(true);
        console.log("more posts loading");

        if (posts.length < postLimit) {
            console.log("No more posts to load");
            setLoadingPosts(false);
            return;
        }

        setPostLimit(prevLimit => prevLimit + 10);
    }

    const [guides, setGuides] = useState<GuideInterface[]>([])



    return (
        <div className='flex flex-col gap-[40px]'>

            <Header title='Community' subtitle='Explore discussions with in the community forum' />

            <div className='w-[70%] flex flex-col gap-[20px] '>


                <div className={`p-[20px] bg-white rounded-[15px] min-h-[195px] ${loadingGuides ? "flex justify-center items-center" : ""}`}>
                    {loadingGuides ? <Loader /> : <Guides guides={guides} editEnabled={false} />}
                </div>

                <CreatePost userImage='/admin-image.jpg' />

                <PostsSection posts={posts} loading={loadingPosts} onLoadMore={loadMorePosts} />

            </div>

        </div>
    )
}

export default Page