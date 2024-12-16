import Link from 'next/link'
import React from 'react'

const PersonalizedExperience = () => {

    return (
        <div className='w-full flex justify-center items-center gap-[100px]'>
            <div className='flex flex-col justify-start items-start gap-[32px] flex-1 relative'>
                <h2 className='text-[40px] font-semibold leading-[64px] text-white max-w-[515px]'>Design Your Personalized Learning Experience</h2>
                <p className='text-[16px] font-normal leading-[24px] max-w-[515px] text-landingSecondaryColorLight'>With NEXUS, personalize your translations, summaries, and transcriptions for a more efficient and tailored experience.</p>
                <Link href="/signup" className='text-[16px] font-medium leading-[24px] text-white rounded-[64px] pl-[32px] pr-[20px] py-[16px] bg-landingPrimaryColor flex justify-center items-center gap-[16px]'>
                    <span>
                        Start Now
                    </span>
                    <img src="/landingPage/assets/arrow-right.svg" alt="" />
                </Link>

            </div>
            <div className='flex-1 flex justify-end'>
                <img src="/landingPage/personalized-experience.png" alt="" className='w-full h-full' />
            </div>
        </div>
    )
}

export default PersonalizedExperience