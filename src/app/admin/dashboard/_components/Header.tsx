"use client"
import React, { useState } from 'react'
import Search from '../../../../components/Search';

const Header = () => {
    const [searchText, setSearchText] = useState("")

    return (
        <div className='flex flex-col gap-[28px]'>
            <Search text={searchText} onChange={(text) => setSearchText(text)} placeholder="Search content..." />
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-[5px]'>
                    <h2 className='text-[28px] font-semibold'>Welcome Back, Admin</h2>
                    <p className='text-[16px] opacity-[50%] font-medium'>Here&apos;s a little bit of everything</p>
                </div>
                <div className='flex items-center justify-center gap-[20px] '>
                    <button className="p-[8px] rounded-full bg-white ">
                        <img src="/assets/notification-filled.svg" alt="" />
                    </button>
                    <div className="flex gap-[10px] items-center">
                        <div className="w-[55px] h-[55px] rounded-full">
                            <img src="/profile.png" alt="" />
                        </div>
                        <button className="flex flex-col justify-start items-start">
                            <h3 className='text-[22px] font-semibold'>Admin Nexus</h3>
                            <div className='flex opacity-[50%] gap-[5px]'>
                                <p className='text-[12px] font-medium'>admin.nexus@gmail.com</p>

                                <img src="/assets/small-arrow-down.svg" alt="" />

                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header