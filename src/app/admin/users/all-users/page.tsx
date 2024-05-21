"use client"

import React, { useEffect, useState } from 'react'
import Search from '../../_components/Search'
import UsersList from '../../_components/UsersList'
import { fetchAllUsers } from '@/firebaseFunctions/users'

const page = () => {
    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])


    useEffect(() => {
        setIsLoading(true)
        fetchAllUsers().then((result: any) => {
            setAllUsers(result)
            setIsLoading(false)

        })

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
                <UsersList users={allUsers} showSelect showViewAll={false} />
            </div>

        </div>
    )
}

export default page