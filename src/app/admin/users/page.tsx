"use client"
import React, { useState } from 'react'
import ActiveUsers from '../_components/ActiveUsers'
import Header from './_components/Header'
import LargeButton from '../_components/LargeButton'
import UserSideBar from '../_components/UserSideBar'
import RecentUsers from '../_components/RecentUsers'

const page = () => {

    const [activeTile, setActiveTile] = useState(0)

    const tiles = [
        {
            title: "Active Users",
            value: "12.5k",
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "5.4%"
        },
        {
            title: "Premium Users",
            value: "3.56k",
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "2.14%"
        },
        {
            title: "Issues Reported",
            value: "567",
            activeSvg: "issues-white",
            inActiveSvg: "issues-blue",
            increase: false,
            change: "1.24%"
        },
    ]

    return (

        <div className="flex flex-col gap-[30px]">
            <Header />
            <div className='flex gap-[40px]'>
                <div className='basis-[70%] flex flex-col gap-[20px]'>
                    <div className='flex justify-between items-center gap-[20px]'>
                        {tiles.map((stat, index) => (
                            <LargeButton
                                key={index}
                                activeIcon={stat.activeSvg}
                                inActiveIcon={stat.inActiveSvg}
                                text={stat.value}
                                title={stat.title}
                                increase={stat.increase}
                                change={stat.change}
                                onClick={() => setActiveTile(index)}
                                active={index == activeTile}
                            />
                        ))}
                    </div>
                    <ActiveUsers />
                    <RecentUsers />
                </div>
                <div className='basis-[30%]'>
                    <UserSideBar />
                </div>
            </div>

        </div>
    )
}

export default page