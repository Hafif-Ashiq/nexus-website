"use client"
import React, { useEffect, useState } from 'react'
import GraphInfo from '../_components/GraphInfo'
import LargeButton from '../_components/LargeButton'
import UsersList from '../_components/UsersList'
import { listenToUsersList } from '@/firebaseFunctions/users'
import { UserProfile } from '@/services/UserInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setAllUsersList } from '@/redux/slices/adminSlice'

const page = () => {

    const dispatch = useDispatch()

    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)

    const [activeTile, setActiveTile] = useState(0)

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

    useEffect(() => {
        let unsubscribeUsers = listenToUsersList((result) => {
            console.log(result);
            dispatch(setAllUsersList(result))
        });

        return () => unsubscribeUsers();

    }, [])


    const tiles = [
        {
            title: "Active Users",
            value: "12.5k",
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "5.4%",
            data: {
                labels: labelsUsers,
                datasets: [
                    {
                        label: '',
                        data: [62, 100, 500, 650, 30, 324, 234],
                        borderColor: '#2A4E8F',
                        backgroundColor: '#93AAFD30',
                        fill: true
                    }
                ],
            }
        },
        {
            title: "Premium Users",
            value: "3.56k",
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "2.14%",
            data: {
                labels: labelsUsers,
                datasets: [
                    {
                        label: '',
                        data: [62, 100, 500, 650, 30, 724, 1044],
                        borderColor: '#2A4E8F',
                        backgroundColor: '#93AAFD30',
                        fill: true
                    }
                ],
            }
        },
        {
            title: "Issues Reported",
            value: "567",
            activeSvg: "issues-white",
            inActiveSvg: "issues-blue",
            increase: false,
            change: "1.24%",
            data: {
                labels: labelsUsers,
                datasets: [
                    {
                        label: '',
                        data: [262, 100, 50, 250, 30, 34, 64],
                        borderColor: '#2A4E8F',
                        backgroundColor: '#93AAFD30',
                        fill: true
                    }
                ],
            }
        },
    ]

    return (

        <div className="flex flex-col gap-[30px] flex-1 ">

            <div className='basis-[75%] flex flex-col gap-[20px]'>
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
                <GraphInfo data={tiles[activeTile].data} title={tiles[activeTile].title} value={tiles[activeTile].value} change={tiles[activeTile].change} increase={tiles[activeTile].increase} />
                <UsersList users={allUsersList.slice(0, 3)} clickEnabled />

            </div>

        </div>
    )
}

export default page