"use client"
import React from 'react'
import Header from './_components/Header'
import Guides from './_components/Guides'
import ActiveUsers from '../_components/ActiveUsers'
import StatPerformance from './_components/StatPerformance'
import RecentUsers from '../_components/RecentUsers'

const page = () => {


    const labelsUsers = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const dataUsers = {
        labels: labelsUsers,
        datasets: [
            {
                label: '',
                data: [62, 100, 500, 650, 230, 324, 234],
                borderColor: '#2A4E8F',
                backgroundColor: '#93AAFD30',
                fill: true
            }
        ],
    };

    return (
        <div className="flex flex-col gap-[40px]">
            <Header />
            <Guides />
            <div className='flex gap-[20px]'>
                <ActiveUsers data={dataUsers} title='Active Users' value='6245' change='5.4%' increase />
                <StatPerformance />
            </div>
            <RecentUsers />
        </div>
    )
}

export default page