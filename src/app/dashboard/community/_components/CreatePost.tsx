import IconButton from '@/components/IconButton';
import CreateCommunityPostModal from '@/app/dashboard/community/_components/CreateCommunityPostModal';
import React, { useState } from 'react'

interface CreatePostInterface {
    userImage: string;

}

const CreatePost = ({ userImage }: CreatePostInterface) => {



    const [communityPostModalOpen, setCommunityPostModalOpen] = useState<boolean>(false)



    return (
        <div className='bg-white p-[20px] w-full rounded-[15px] flex flex-col gap-[10px]'>

            <div className='flex-1 flex gap-[10px] w-full justify-end items-end'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                    <img src={userImage} alt="" className='w-full h-full ' />

                </div>

                <div className={`flex-1  flex flex-col justify-between items-start gap-[10px]`}>


                    {/* Input */}
                    <button onClick={() => setCommunityPostModalOpen(true)} className={`flex justify-between items-center w-full border-[3px] border-solid border-accentColorLight rounded-[15px]  px-[15px] py-[5px]`}>
                        <div

                            className='flex-1 focus:outline-none text-[16px] placeholder:text-primaryColorLight font-medium text-primaryColorLight text-left'
                        >What's on your mind?</div>

                        <div className=' p-[8px]  rounded-full flex justify-center items-center' >
                            <img src='/assets/add-image-outlined.svg' alt="" />
                        </div>
                    </button>
                </div>

            </div>


            {communityPostModalOpen && <CreateCommunityPostModal onClose={() => setCommunityPostModalOpen(false)} />}
        </div>
    )
}

export default CreatePost