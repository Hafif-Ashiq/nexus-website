import { adminNavLinks, userNavLinks } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import React from 'react'



const SideBar = () => {
    const path = usePathname()

    return (
        <div className='fixed h-screen w-[360px] bg-white px-[30px] py-[45px] flex flex-col justify-between'>
            <div className='flex flex-col gap-[70px]' >
                <div className='flex justify-start  items-center gap-[15px]'>
                    <div className="logo w-[50px] h-[50px] bg-[#D9D9D9]">

                    </div>
                    <div className='text-[28px] text-black font-semibold '>
                        Nexus
                    </div>
                </div>
                <div
                    className='
                        flex 
                        flex-col 
                        justify-start 
                        items-start 
                    '
                >
                    {userNavLinks.map((navlink) => (
                        <Link key={navlink.link} href={path == "/" ? `/${navlink.link}` : `/dashboard/${navlink.link}`}
                            className={`
                            w-full
                            h-[70px]
                            flex 
                            font-semibold 
                            items-center 
                            justify-start 
                            gap-[15px] 
                            px-[23px] 
                            
                            ${path === `/dashboard${navlink.link}` ? "bg-primaryColorLight text-white" : ""}   
                            rounded-[15px]
                        `}>
                            <img src={`/assets/${navlink.icon}`} alt="" />
                            <p className='text-[20px]'>{navlink.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-center items-start gap-10'>
                <button className='
                    w-full
                    h-[70px] 
                    text-white
                    font-medium 
                    flex 
                    items-center 
                    justify-start 
                    gap-[15px] 
                    px-[23px] 
                    bg-primaryColorLight 
                    rounded-[15px] 
                    cursor-pointer
                '>
                    <img src="/assets/logout.svg" alt="" />
                    <p className='text-[20px] font-medium '>Logout</p>
                </button>
            </div>
        </div>
    )
}

export default SideBar