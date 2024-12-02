import React, { useEffect, useState } from 'react'

import Like from "../../../public/assets/heart.svg"
import Comment from "../../../public/assets/messages.svg"
import Share from "../../../public/assets/share.svg"
import Save from "../../../public/assets/save.svg"
import PostAction from './PostAction'
import PostComments from './PostComments'
import PostDisplay from './PostDisplay'
import { likePost, unlikePost } from '@/firebaseFunctions/user/postFunctions/postInteractions'
import { PostCommentInterface } from '@/services/PostCommentInterface'
import { PostInterface } from '@/services/PostInterface'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { listenToPostComments } from '@/firebaseFunctions/user/postFunctions/getPostComments'
import { UserProfile } from '@/services/UserInterface'
import { getUserDataForPost } from '@/firebaseFunctions/user/postFunctions/postUsers'

interface PostProps {
    post: PostInterface | null
}

const Post = ({ post }: PostProps) => {


    if (!post) return null

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [comments, setComments] = useState<PostCommentInterface[]>([])

    const [liked, setLiked] = useState(false)

    const [userData, setUserData] = useState<Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'profile_pic'>>>({})


    useEffect(() => {
        setLiked(post.liked_by.includes(userId) || false)
        listenToPostComments(post.post_id, setComments)
        getUserDataForPost(post.user_id).then(res => setUserData(res))

    }, [])

    const handleLikeClick = () => {
        setLiked(!liked)
        if (liked) {
            unlikePost(post.post_id, userId)
        } else {
            likePost(post.post_id, userId)
        }
    }

    const postActions = [
        {
            title: "Like",
            icon: <Like style={{
                // color: "#2A4E8F"
                color: liked ? "#2A4E8F" : "transparent"
            }} />,
            text: post ? post.total_likes.toString() : "0",
            primary: true,
            onClick: handleLikeClick
        },
        {
            title: "Comment",
            icon: <Comment style={{
                color: "transparent"
            }} stroke="black" />,
            text: comments.length.toString(),
            primary: false,
            onClick: () => { }
        },
        {
            title: "Share",
            icon: <Share />,
            text: post ? post.total_shares.toString() : "0",
            primary: false,
            onClick: () => { }
        },

    ]

    return (
        <div className='flex justify-between bg-white rounded-[20px]'>
            <div className='flex-1 flex flex-col gap-[15px]  w-full'>
                <div className='flex justify-between items-center px-[20px] pt-[20px] '>
                    <div className='flex items-center gap-[10px] '>
                        <img src={userData.profile_pic} alt="" className='w-[40px] h-[40px] rounded-full object-cover' />
                        <div className="flex flex-col ">
                            <span className='font-semibold text-[16px]'>{userData.first_name} {userData.last_name}</span>
                            <span className='font-medium text-[12px] opacity-50'>{userData.email}</span>
                        </div>
                    </div>

                    <button>
                        <img src="/assets/more-circle.svg" alt="" />
                    </button>

                </div>
                <div className='m-w-full h-[2px] bg-borderColorLight'></div>
                <div className='flex-1 px-[20px] pb-[20px] flex flex-col justify-between gap-[15px]'>
                    {/* Post */}
                    <PostDisplay images={post ? post.images : []} text={post ? post.description : ""} />
                    {/* Actions */}
                    <div className='flex justify-between p-[15px] rounded-[16px] bg-accentColorLight'>
                        {/* 3 actions */}
                        <div className='flex items-center gap-[15px]'>
                            {
                                postActions.map(action => (
                                    <PostAction key={action.title} {...action} />
                                ))
                            }
                        </div>
                        {/* save */}

                        <PostAction
                            primary={false}
                            icon={<Save style={{
                                color: "black"
                            }} />}
                            onClick={() => { }}
                        />
                    </div>
                </div>
            </div>
            <div className='m-h-full w-[2px] bg-borderColorLight'></div>
            <PostComments comments={comments} postId={post.post_id} />
        </div >
    )
}

export default Post