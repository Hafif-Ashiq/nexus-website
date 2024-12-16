import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='w-full flex justify-center items-center gap-[60px]'>
            <div className='flex flex-col justify-start items-start gap-[32px] flex-1 relative'>
                <h1 className='text-[48px] font-semibold leading-[64px] text-white max-w-[515px]'>Learn Faster, Understand Better</h1>
                <p className='text-[16px] font-normal leading-[24px] max-w-[515px] text-[#ADB2B1]'>Translate, summarize, and transcribe seamlessly with NEXUS—bridging English and Urdu to save time and boost productivity.</p>
                <Link href="/signup" className='text-[16px] font-medium leading-[24px] text-white rounded-[64px] pl-[32px] pr-[20px] py-[16px] bg-landingPrimaryColor flex justify-center items-center gap-[16px]'>
                    <span>
                        Get Started
                    </span>
                    <img src="/landingPage/assets/arrow-right.svg" alt="" />
                </Link>
                <div className='absolute top-[62px] left-[-10px] '>
                    <img src="/landingPage/assets/hero-background-vector.svg" alt="" className='w-full h-full' />
                </div>
            </div>
            <div className='flex-1 flex justify-end'>
                <img src="/landingPage/heroImage.png" alt="" className='w-full h-full' />
            </div>
        </div>
    )
}

export default HeroSection