import IconButton from '@/components/IconButton'
import PostsSection from '@/components/postComponents/PostsSection'
import { listenToPosts } from '@/firebaseFunctions/user/postFunctions/getPosts'
import { RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PostInterface } from '@/services/PostInterface'

const UserSideBarInfo = () => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const user = useSelector((state: RootState) => state.userReducer.user)


    const [userPosts, setUserPosts] = useState<PostInterface[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listenToPosts((newPosts) => {
            setUserPosts(newPosts);
            setLoading(false);
        }, 3, undefined, true, userId);
    }, [userId])

    return (
        <div className='basis-[30%] flex flex-col gap-[20px]  rounded-[15px] min-h-[65vh]'>
            <div className='flex flex-col gap-[20px] bg-white rounded-[15px] pb-[20px] min-h-[75vh]'>
                <div className='flex flex-col gap-[13px] relative'>
                    <div onClick={() => { }} className={`w-full h-[180px] rounded-t-[10px] overflow-hidden shadow-normal group relative bg-accentColorLight`}>
                        <img src={user?.background_pic} alt="" className='w-full h-full object-cover' />

                    </div>
                    <div onClick={() => { }} className='shadow-normal absolute left-[15px] top-[70%] border-white border-[4px] border-solid rounded-[20px] overflow-hidden group'>
                        <div className='w-[120px] h-[120px] rounded-[18px] bg-accentColorLight'>
                            <img src={user?.profile_pic} alt="" className='object-cover w-full h-full' />
                        </div>

                    </div>


                </div>
                <div className='flex justify-between items-start gap-[20px] flex-1'>
                    <div className='flex flex-col gap-[10px] mt-[70px] px-[20px]'>
                        <div className='flex flex-col gap-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <p className='text-[24px] font-semibold text-black'>{user?.first_name + " " + user?.last_name}</p>
                                <img src="/assets/tick-circle-blue.svg" alt="" />
                            </div>
                            <p className='text-[16px] font-medium text-gray-500'>{user?.biography}</p>
                            <div className='flex items-center gap-[15px] text-[14px] font-medium text-gray-500'>
                                <p>{user?.email}</p>
                                <div className='w-[4px] h-[4px] rounded-full bg-gray-500'></div>
                                <p>Joined {user?.start_date ? new Date(user?.start_date).toLocaleDateString() : ''}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex justify-end items-end px-[20px]'>
                        <IconButton icon="/assets/pencil.svg" onClick={() => { }} />
                    </div> */}
                </div>
                <div className="w-full h-[2px] bg-borderColorLight"></div>
                <div className='flex flex-col gap-[20px]' >
                    <span className='text-primaryColorLight text-[18px] font-semibold px-[20px]'>User Posts</span>
                    <PostsSection posts={userPosts} loading={loading} onLoadMore={() => { }} isOwner={true} concise={true} />

                </div>
            </div>
        </div>
    )
}

export default UserSideBarInfo