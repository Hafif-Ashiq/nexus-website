"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header'
import Guides from './_components/Guides'
import GraphInfo from '../_components/GraphInfo'
import StatPerformance from './_components/StatPerformance'
import UsersList from '../_components/UsersList'
import { listenToUsersList } from '@/firebaseFunctions/users'

import { setAllUsersList } from '@/redux/slices/adminSlice'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const page = () => {

    const dispatch = useDispatch()

    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)


    useEffect(() => {



        let unsubscribeUsers = listenToUsersList((result) => {
            console.log(result);
            dispatch(setAllUsersList(result))

        });


        return () => unsubscribeUsers();

    }, [])


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
                <GraphInfo data={dataUsers} title='Active Users' value='6245' change='5.4%' increase />
                <StatPerformance />
            </div>
            <UsersList users={allUsersList.slice(0, 2)} />
        </div>
    )
}

export default page