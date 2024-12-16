import Link from 'next/link'
import React from 'react'

const ManageLearning = () => {

    return (
        <div className='w-full flex justify-center items-center gap-[100px]'>
            <div className='flex flex-col justify-start items-start gap-[32px] flex-1 relative'>
                <h2 className='text-[48px] font-semibold leading-[64px] text-white max-w-[515px]'>Easy Way to Manage Your Learning Journey  </h2>
                <p className='text-[16px] font-normal leading-[24px] max-w-[515px] text-landingSecondaryColorLight'>NEXUS offers an easy-to-use app for Android and web, ensuring a seamless experience across all devices.</p>


            </div>
            <div className='flex-1 flex justify-end'>
                <img src="/landingPage/manage-learning.png" alt="" className='w-full h-full' />
            </div>
        </div>
    )
}

export default ManageLearning