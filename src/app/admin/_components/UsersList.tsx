
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import { UserProfile } from '@/services/UserInterface'
import Select from '@/components/Select'
import { setCurrentUser } from '@/redux/slices/adminSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface recentUsersProps {
    users: UserProfile[],
    showSelect?: boolean,
    showViewAll?: boolean,
    clickEnabled?: boolean,
    fullList?: boolean
}

const UsersList: React.FC<recentUsersProps> = ({ users, showSelect = false, showViewAll = true, clickEnabled = false, fullList = false }) => {

    const currentUser = useSelector((state: RootState) => state.adminReducer.currentUser)
    const dispatch = useDispatch()

    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: boolean }>({})

    const [anySelected, setAnySelected] = useState(false)

    useEffect(() => {
        const selectedCount = Object.keys(selectedUsers).length
        setAnySelected(selectedCount > 0 || allSelected)

        if (selectedCount === users.length) {
            setAllSelected(true)
        } else if (selectedCount === 0) {
            setAllSelected(false)
        }
    }, [selectedUsers, allSelected, users.length])

    const selectUser = (index: number) => {
        setSelectedUsers(prev => {
            const updated = { ...prev }
            if (updated[index]) {
                delete updated[index]
            } else {
                updated[index] = true
            }
            return updated
        })
        setAllSelected(false)
    }

    const selectAll = () => {
        setAllSelected(prev => !prev)
        if (!allSelected) {
            // Select all users
            const allIndexes = users.reduce((acc, _, index) => {
                acc[index] = true
                return acc
            }, {} as { [key: number]: boolean })
            setSelectedUsers(allIndexes)
        } else {
            // Deselect all
            setSelectedUsers({})
        }
    }

    const getUserDropDownActions = (index: number) => {
        let deactivated = users[index].account_status.is_deactivated

        return [
            {
                title: deactivated ? "Activate Account" : "Deactivate Account",
                onClick: () => { }
            },
            {
                title: "Delete Account",
                onClick: () => { }
            },
            {
                title: "Open Support",
                onClick: () => { }
            },
        ]
    }

    return (
        <div className='flex flex-col gap-[15px] h-full'>
            {
                !fullList ?
                    // With Header 
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[24px] font-semibold text-textColorDarkBlue'>Recent Users {showViewAll}</h3>

                        {showViewAll && <Link href={"/admin/users/all-users"} className='flex justify-end items-center gap-[14px]'>
                            <p className='text-[16px] font-semibold text-primaryColorLight'>View all</p>
                            <img src="/assets/small-arrow-right.svg" alt="" />
                        </Link>}
                    </div> :

                    <></>
            }

            <table className='bg-white w-full rounded-[15px] flex-1 h-full'>
                <thead>
                    <tr className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis overflow-hidden ${fullList ? "" : "rounded-[15px]"} bg-primaryColorLight text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                <Select selected={allSelected} onSelect={selectAll} />
                                {anySelected && <div className='font-semibold text-[18px]'>{Object.keys(selectedUsers).length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[200px]'>User ID</th>
                                <th className='w-[200px]'>Email Address</th>
                                <th className='w-[200px]'>Username</th>
                                <th className='w-[130px]'>Status</th>
                                <th className='w-[50px]'>Action</th>
                            </>
                            :
                            <>
                                <th className='flex items-center gap-[15px]'>
                                    <button>Activate</button>
                                    <div className='w-[5px] h-[5px] bg-white rounded-full'></div>
                                    <button>Deactivate</button>
                                    <div className='w-[5px] h-[5px] bg-white rounded-full'></div>
                                    <button>Delete</button>
                                </th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            onClick={() => {
                                if (clickEnabled) {
                                    console.log('clicked');
                                    dispatch(setCurrentUser(user))
                                }
                            }}
                            key={index} className={` font-semibold flex justify-between text-left pl-[25px] pr-[50px] py-[25px] rounded-[15px]  border-[1.5px] border-solid  ${clickEnabled ? "cursor-pointer" : ""} ${user.id == currentUser.id ? "border-primaryColorLight" : "border-white hover:border-borderColor"}`}>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedUsers[index] || allSelected} onSelect={() => selectUser(index)} color='#CBD5E4' />
                            </td>}
                            <td className='w-[20px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.id}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.email}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.first_name + " " + user.last_name} </td>
                            <td className={`w-[130px] text-ellipsis overflow-hidden 
                                ${user.account_status.is_deactivated ? "text-warningColor" : "text-confirmColor"} `}
                            >
                                {user.account_status.is_deactivated ? "Deactivated" : "Activate"}
                            </td>
                            <td className='w-[50px] flex justify-center items-center relative'>
                                <button onClick={() => index == actionsOpen ? setActionsOpen(-1) : setActionsOpen(index)} className=' py-[5px]'>
                                    <img src="/assets/dots.svg" alt="" />
                                </button>
                                {index == actionsOpen && <DropDown actions={getUserDropDownActions(index)} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div >
    )
}

export default UsersList