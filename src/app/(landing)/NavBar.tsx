import { landingLinks } from '@/constants/links'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {


    return (
        <div id='home' className='w-full flex justify-between items-center'>
            <Link href="/" className='text-[24px] font-semibold'>
                <img src="/assets/logo.svg" />
            </Link>

            <div className='flex justify-center items-center gap-[32px]'>
                {landingLinks.map((navlink) => (
                    <Link key={navlink.link} href={navlink.link} className='text-[16px] font-medium  text-white hover:text-[#3D71CF] transition-all duration-300 ease-in-out'>{navlink.name}</Link>
                ))}
            </div>
            <Link href="/login" className='text-[16px] font-bold leading-[24px] text-[#3D71CF] rounded-[64px] px-[32px] py-[12px] border-[2px] border-solid border-[#3D71CF]'>Login</Link>

        </div>
    )
}

export default NavBar