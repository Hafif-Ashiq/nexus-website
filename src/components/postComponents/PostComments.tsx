import { PostCommentInterface } from '@/services/PostCommentInterface'

import React, { useState } from 'react'
import IconButton from '../IconButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import CommentTile from './CommentTile'
import { addComment } from '@/firebaseFunctions/user/postFunctions/addComment'

interface PostComments {
    comments?: PostCommentInterface[]
    postId: string,
    canAddComment?: boolean
}

const PostComments = ({ comments, postId, canAddComment = true }: PostComments) => {
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [newComment, setNewComment] = useState("")

    const addCommentToPost = () => {
        addComment(postId, newComment, userId)
        setNewComment("")
    }

    return (
        <div className='flex-1 px-[20px] pt-[20px] flex flex-col gap-[20px]'>

            <span className='font-semibold text-[16px] '>Comments</span>

            <div className='relative flex flex-col h-full gap-[20px] '>
                <div className={`h-full flex flex-col gap-[40px] overflow-y-auto max-h-[500px] pb-[100px] `}>
                    {comments?.map((comment, index) => (
                        <CommentTile
                            key={index}
                            comment={comment}
                            userId={userId}
                            index={index}
                            postId={postId}
                        />
                    ))}
                </div>

                {canAddComment && (
                    <div className='absolute mt-[20px] bottom-0 bg-white left-0 right-0 flex justify-end items-center gap-[15px] px-[10px] py-[15px]'>
                        {/* Text input */}
                        <input
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !event.shiftKey) {
                                    addCommentToPost()
                                }
                            }}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder='Write a message...'
                            className='p-[13px] font-semibold text-[16px] flex-1 border-borderColor border-[3px] border-solid rounded-[15px] text-primaryColorLight placeholder:text-primaryColorLight placeholder:opacity-50 focus:outline-primaryColorLight resize-none '
                            style={{
                                scrollbarWidth: "none"
                            }}
                        />
                        {/* Send button */}
                        <IconButton
                            icon='/assets/arrow-up-white.svg'
                            disabled={newComment == ""}
                            filled
                            onClick={addCommentToPost}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostComments