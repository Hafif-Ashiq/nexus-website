import React, { useEffect, useState } from 'react';
import Like from "../../../public/assets/like.svg";
import { PostCommentInterface } from '@/services/PostCommentInterface';
import { likeComment, unlikeComment } from '@/firebaseFunctions/user/postFunctions/commentInteractions';
import { UserProfile } from '@/services/UserInterface';
import { getUserDataForPost } from '@/firebaseFunctions/user/postFunctions/postUsers';

interface CommentTileProps {
    comment: PostCommentInterface
    userId: string;
    index: number;
    postId: string;

}

const CommentTile: React.FC<CommentTileProps> = ({ comment, userId, index, postId }) => {

    const [liked, setLiked] = useState(false)

    const [userData, setUserData] = useState<Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'profile_pic'>>>({})

    useEffect(() => {
        setLiked(comment.liked_by.includes(userId))
        getUserDataForPost(comment.user_id).then(res => setUserData(res))
    }, [comment])

    const handleLikeComment = (commentId: string) => {
        setLiked(prev => !prev)
        if (liked) {
            unlikeComment(postId, commentId, userId).then((res) => {
                if (!res) setLiked(true)
            })
        } else {
            likeComment(postId, commentId, userId).then((res) => {
                if (!res) setLiked(false)
            })
        }
    }

    return (
        <div key={index} className='relative flex flex-col gap-[5px] p-[10px] pb-[30px] bg-accentColorLight rounded-[10px]'>
            <div className='flex items-center gap-[10px]'>
                <img src={userData.profile_pic} alt="" className='w-[25px] h-[25px] rounded-full object-cover' />
                <span className='font-semibold text-[14px]'>{userData.first_name} {userData.last_name}</span>
            </div>
            <span className='font-medium text-[14px] text-justify'>
                {comment.text}
            </span>
            <button
                className='px-[10px] py-[8px] border-[3px] border-white absolute bottom-[-20px] left-[10px] bg-accentColorLight rounded-full flex items-center gap-[5px]'
                onClick={() => handleLikeComment(comment.comment_id)}
            >
                <Like
                    fill={liked ? "#2a4e8f" : "transparent"}
                    stroke="#2a4e8f"
                />
                <span className='text-[12px] font-medium text-primaryColorLight'>{comment.total_likes}</span>
            </button>
        </div>
    );
}

export default CommentTile;