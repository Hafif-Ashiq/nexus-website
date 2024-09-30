"use client"

import React, { useEffect, useState } from 'react'
import Search from '../../_components/Search'
import UsersList from '../../_components/UsersList'
import { listenToUsersList } from '@/firebaseFunctions/users'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAllUsersList, setCurrentUser } from '@/redux/slices/adminSlice'
import HeaderButton from '../../_components/HeaderButton'
import { UserProfile } from '@/services/UserInterface'
import { mockUser } from '@/constants/data'

const page = () => {

    const dispatch = useDispatch()

    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)
    const currentUser = useSelector((state: RootState) => state.adminReducer.currentUser)

    const [searchText, setSearchText] = useState("")

    const [usersList, setUsersList] = useState<UserProfile[]>([])


    useEffect(() => {
        let unsubscribeUsers = listenToUsersList((result) => {
            console.log(result);
            dispatch(setAllUsersList(result))
        });
        return () => unsubscribeUsers();

    }, [])

    useEffect(() => {
        if (allUsersList.length == 0) {
            return
        }

        if (mockUser.id == currentUser.id) {

            dispatch(setCurrentUser(allUsersList[0]));
        }
        else {
            const newSupport = allUsersList.find(user => user.id == currentUser.id)
            dispatch(setCurrentUser(newSupport));
        }
    }, [allUsersList])

    useEffect(() => {
        const filteredUsers = getUsers()
        setUsersList(filteredUsers)
    }, [allUsersList, searchText])


    const getUsers = () => {
        if (searchText == "") {
            return allUsersList
        }

        const usersList: UserProfile[] = allUsersList.filter(
            user => user.first_name.toLowerCase().includes(searchText.toLowerCase())
                ||
                user.last_name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())
        )
        console.log(usersList);

        return usersList
    }


    return (
        <div className='flex flex-col gap-[20px] bg-white rounded-[15px] h-full'>
            <div className='flex items-center justify-between gap-[15px] px-[20px] pt-[20px]'>
                <Search text={searchText} onChange={(text) => setSearchText(text)} placeholder="Search users..." />
                <HeaderButton title='Filter' icon='/assets/sort.svg' onClick={() => { }} />
            </div>
            <div className='flex-1'>
                <UsersList users={usersList} showSelect showViewAll={false} clickEnabled fullList />
            </div>

        </div>
    )
}

export default page