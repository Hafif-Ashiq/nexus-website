import Link from 'next/link'
import React from 'react'

const PerfectLearningTool = () => {

    return (
        <div id='perfect-learning-tool' className='w-full flex justify-center items-center gap-[100px]'>

            <div className='flex-1 flex justify-start'>
                <img src="/landingPage/perfect-learning.png" alt="" className='w-full h-full' />
            </div>
            <div className='flex flex-col justify-start items-start gap-[32px] flex-1 relative'>
                <h2 className='text-[40px] font-semibold leading-[64px] text-white max-w-[515px]'>Find the Perfect Learning Tools for You</h2>
                <p className='text-[16px] font-normal leading-[24px] max-w-[515px] text-landingSecondaryColorLight'>NEXUS offers seamless translation, summarization, and transcription. Manage content easily, connect with a supportive community, and get reliable support to meet your learning goals.</p>
                <Link href="/signup" className='text-[16px] font-medium leading-[24px] text-white rounded-[64px] px-[32px] py-[16px] bg-landingPrimaryColor flex justify-center items-center gap-[16px]'>
                    <span>
                        Learn More
                    </span>
                </Link>

            </div>
        </div>
    )
}

export default PerfectLearningTool