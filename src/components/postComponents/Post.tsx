import React, { useEffect, useState } from 'react'

import Like from "../../../public/assets/heart.svg"
import Comment from "../../../public/assets/messages.svg"
import Share from "../../../public/assets/share.svg"
import Save from "../../../public/assets/save.svg"
import SaveFilled from "../../../public/assets/save-filled.svg"
import PostAction from './PostAction'
import PostComments from './PostComments'
import PostDisplay from './PostDisplay'
import { likePost, savePost, unlikePost, unsavePost, updatePostPermissions } from '@/firebaseFunctions/user/postFunctions/postInteractions'
import { PostCommentInterface } from '@/services/PostCommentInterface'
import { PostInterface } from '@/services/PostInterface'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { listenToPostComments } from '@/firebaseFunctions/user/postFunctions/getPostComments'
import { UserProfile } from '@/services/UserInterface'
import { getUserDataForPost } from '@/firebaseFunctions/user/postFunctions/postUsers'
import UpdatePostPermissions from '@/app/dashboard/profile/_components/UpdatePostPermissions'

interface PostProps {
    post: PostInterface | null,
    isOwner?: boolean,
    concise?: boolean
}

const Post = ({ post, isOwner = false, concise = false }: PostProps) => {




    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [comments, setComments] = useState<PostCommentInterface[]>([])

    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    const [userData, setUserData] = useState<Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'profile_pic'>>>({})

    const [showMore, setShowMore] = useState(false)



    useEffect(() => {
        if (!post) return
        setLiked(post.liked_by.includes(userId) || false)
        setSaved(post.saved_by.includes(userId) || false)
        listenToPostComments(post.post_id, setComments)
        getUserDataForPost(post.user_id).then(res => setUserData(res))
        console.log(post.saved_by)
    }, [])

    if (!post) return null

    const handleLikeClick = () => {
        setLiked(!liked)
        if (liked) {
            unlikePost(post.post_id, userId)
        } else {
            likePost(post.post_id, userId)
        }
    }

    const handleSaveClick = () => {
        setSaved(!saved)
        if (saved) {
            unsavePost(post.post_id, userId)
        } else {
            savePost(post.post_id, userId)
        }
    }

    const handleMoreClick = () => {
        setShowMore(true)
    }

    const postActions = [
        {
            title: "Like",
            disabled: !post.permissions.like_allowed,
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
            disabled: !post.permissions.comment_allowed,
            icon: <Comment style={{
                color: "transparent"
            }} stroke="black" />,
            text: comments.length.toString(),
            primary: false,
            onClick: () => { }
        },
        {
            title: "Share",
            disabled: !post.permissions.share_allowed,
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
                        <img src={userData.profile_pic == "" ? "/assets/admin-image.jpg" : userData.profile_pic} alt="" className='w-[40px] h-[40px] rounded-full object-cover bg-accentColorLight' />
                        <div className="flex flex-col ">
                            <span className='font-semibold text-[16px]'>{userData.first_name ? userData.first_name : "Nexus User"} {userData.last_name}</span>
                            <span className='font-medium text-[12px] opacity-50'>{userData.email || "nexususer@nexus.com"}</span>
                        </div>
                    </div>

                    {isOwner && <button onClick={handleMoreClick}>
                        <img src="/assets/more-circle.svg" alt="" />
                    </button>}

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
                            icon={saved ? <SaveFilled /> : <Save />}
                            onClick={handleSaveClick}
                        />
                    </div>
                </div>
            </div>
            <div className='m-h-full w-[2px] bg-borderColorLight'></div>
            {!concise && <PostComments canAddComment={post.permissions.comment_allowed} comments={comments} postId={post.post_id} />}
            {showMore && <UpdatePostPermissions onClose={() => setShowMore(false)} initialPermissions={post.permissions} onUpdate={(permissions) => updatePostPermissions(post.post_id, userId, permissions)} />}
        </div >
    )
}

export default Post