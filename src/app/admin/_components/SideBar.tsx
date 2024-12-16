import { adminNavLinks } from '@/constants/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import React from 'react'


const SideBar = () => {
    const path = usePathname()

    return (
        <div className='fixed h-screen w-[360px] bg-white px-[30px] py-[45px] flex flex-col justify-between'>
            <div className='flex flex-col gap-[70px]' >
                <div className='flex justify-start  items-center gap-[15px]'>
                    <img src="/assets/logo.svg" alt="" />
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
                    {adminNavLinks.map((navlink) => (
                        <Link key={navlink.link} href={`/admin/${navlink.link}`}
                            className={`
                            w-full
                            h-[70px]
                            flex 
                            font-semibold 
                            items-center 
                            justify-start 
                            gap-[15px] 
                            px-[23px] 
                            ${path.includes(navlink.link) ? "bg-primaryColorLight text-white" : ""}
                            rounded-[15px]
                        `}>
                            {/* <img src={`/assets/${navlink.icon}`} alt="" /> */}
                            {navlink.icon && <navlink.icon
                                stroke={path.includes(navlink.link) ? "white" : "#171717"}

                                // fill={path.includes(navlink.link) ? "#2a4e8f" : "white"}
                                style={{
                                    color: path.includes(navlink.link) ? "white" : "transparent"
                                }}

                            >
                            </navlink.icon>}


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