import React from 'react'
import { landingLinks } from '@/constants/links'
import Link from 'next/link'

const Footer = () => {



    return (
        <div className='w-full flex justify-center items-center bg-[#2834303d] pt-[60px] pb-[35px] backdrop-blur-[16px] relative z-[2]'>
            <div className='w-full max-w-[1440px] flex flex-col gap-[88px] justify-between items-center'>
                <div className='flex justify-between items-start gap-[32px] w-full'>
                    <div className='flex flex-col justify-start items-start gap-[32px]'>
                        <img src="/assets/logo.svg" alt="" />
                        <p className='text-[16px] font-normal leading-[24px] text-landingSecondaryColorLight max-w-[400px]'>Translate, summarize, and transcribe seamlessly with NEXUS</p>
                    </div>
                    <div className='flex justify-center items-center gap-[32px]'>
                        {landingLinks.map((link) => (
                            <Link key={link.link} href={link.link} className='text-[16px] font-medium leading-[24px] text-white hover:text-[#3D71CF] transition-all duration-300 ease-in-out'>{link.name}</Link>
                        ))}
                    </div>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col justify-start items-start gap-[32px]'>
                        <p className='text-[16px] font-normal leading-[24px] text-landingSecondaryColorLight max-w-[400px]'>Copyright 2024 Nexus All Rights Reserved </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer