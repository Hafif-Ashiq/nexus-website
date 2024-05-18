"use client"
import React, { useState } from 'react'

const Header = () => {
    const [searchText, setSearchText] = useState<string>("")

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchText(event.target.value);
    };


    return (
        <div className='flex flex-col gap-[28px]'>
            <div className='flex bg-white w-[450px] p-[15px] rounded-[15px] gap-[10px]'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z" fill="" className='fill-primaryColorLight' />
                    <path d="M22 22.75C21.81 22.75 21.62 22.68 21.47 22.53L19.47 20.53C19.18 20.24 19.18 19.76 19.47 19.47C19.76 19.18 20.24 19.18 20.53 19.47L22.53 21.47C22.82 21.76 22.82 22.24 22.53 22.53C22.38 22.68 22.19 22.75 22 22.75Z" fill="" className='fill-primaryColorLight' />
                </svg>

                <input
                    type="text"
                    name="search"
                    value={searchText}
                    onChange={handleInputChange}
                    id=""
                    placeholder='Search content...'
                    autoComplete='off'
                    className='w-full text-[16px] focus:outline-none  text-primaryColorLight placeholder:text-primaryColorLight font-semibold  placeholder:font-semibold'
                />
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-[5px]'>
                    <h2 className='text-[28px] font-semibold'>Welcome Back, Admin</h2>
                    <p className='text-[16px] opacity-[50%] font-medium'>Here's a little bit of everything</p>
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