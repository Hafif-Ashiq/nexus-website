"use client"
import React from 'react'
import Header from './_components/Header'
import Guides from './_components/Guides'
import ActiveUsers from '../_components/ActiveUsers'
import StatPerformance from './_components/StatPerformance'
import RecentUsers from '../_components/RecentUsers'

const page = () => {
    return (
        <div className="flex flex-col gap-[40px]">
            <Header />
            <Guides />
            <div className='flex gap-[20px]'>
                <ActiveUsers />
                <StatPerformance />
            </div>
            <RecentUsers />
        </div>
    )
}

export default page