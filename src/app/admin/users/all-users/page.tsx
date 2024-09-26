"use client"

import React, { useEffect, useState } from 'react'
import Search from '../../_components/Search'
import UsersList from '../../_components/UsersList'
import { listenToUsersList } from '@/firebaseFunctions/users'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAllUsersList } from '@/redux/slices/adminSlice'

const page = () => {

    const dispatch = useDispatch()

    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)

    const [searchText, setSearchText] = useState("")


    useEffect(() => {
        let unsubscribeUsers = listenToUsersList((result) => {
            console.log(result);
            dispatch(setAllUsersList(result))
        });
        return () => unsubscribeUsers();

    }, [])


    return (
        <div className='flex flex-col gap-[25px]'>
            <div className='flex items-center justify-start gap-[15px]'>
                <Search text={searchText} onChange={(text) => setSearchText(text)} placeholder="Search users..." />
                <button className='p-[8px] border-borderColor border-[1px] border-solid rounded-full'>
                    <img src="/assets/sort.svg" alt="" />
                </button>
                <button className='p-[8px] border-borderColor border-[1px] border-solid rounded-full'>
                    <img src="/assets/setting-2.svg" alt="" />
                </button>
            </div>
            <div>
                <UsersList users={allUsersList} showSelect showViewAll={false} clickEnabled />
            </div>

        </div>
    )
}

export default page