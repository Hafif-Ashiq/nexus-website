import React, { useState } from 'react'
import { getStatusColor } from '@/utils/support';
import { ConversationInterface, SupportInterface } from '@/services/SupportInterface';
import IconButton from '../../_components/IconButton';

interface SupportChatProps {
    chat?: SupportInterface,

}

const SupportChat: React.FC<SupportChatProps> = ({ chat }) => {


    const getMessage = (message: ConversationInterface) => {
        if (message.sender_id == "bpReSCGFYZY9k1TuuCdW") {
            return (
                <div>Admin</div>
            )
        }
        return (
            <div>user</div>
        )
    }


    return (
        <div className='flex flex-col gap-[20px] h-[80vh]'>

            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center '>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        {/* profile */}
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                            <img src="/person.jpg" alt="profile picture" className='object-cover' />
                        </div>
                        {/* title */}
                        <div className='flex flex-col items-start justify-center'>
                            <p className='font-semibold text-[16px]'>Mads Nilson</p>
                            <p className='font-semibold text-[14px]' style={{
                                color: getStatusColor("Pending")
                            }}>Pending</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/folder-minus-blue.svg' onClick={() => { }} />
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>

                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                <div className='flex-1'>

                </div>
                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                <div className='flex justify-end items-center gap-[15px]'>
                    {/* buttons */}
                    <IconButton icon='/assets/add-image-outlined.svg' onClick={() => { }} />
                    <input
                        placeholder='Write a message...'
                        className='p-[13px] font-semibold text-[16px] flex-1 border-borderColor border-[3px] border-solid rounded-[15px] text-primaryColorLight placeholder:text-primaryColorLight placeholder:opacity-50 focus:outline-primaryColorLight'
                    />
                    <IconButton icon='/assets/arrow-up-white.svg' disabled={true} filled onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default SupportChat