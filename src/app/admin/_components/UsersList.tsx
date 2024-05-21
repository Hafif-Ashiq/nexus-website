
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import { UserProfile } from '@/services/UserInterface'
import Select from '@/components/Select'

interface recentUsersProps {
    users: UserProfile[],
    showSelect?: boolean,
    showViewAll?: boolean
}

const UsersList: React.FC<recentUsersProps> = ({ users, showSelect = false, showViewAll = true }) => {


    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<any>({})
    const [key, setKey] = useState(0)

    const [anySelected, setAnySelected] = useState(false)

    useEffect(() => {
        Object.keys(selectedUsers).length === 0 && !allSelected ? setAnySelected(false) : setAnySelected(true)
    }, [key])

    const selectUser = (index: number) => {
        console.log(selectedUsers[index]);

        const sels = selectedUsers
        if (sels[index]) {
            delete sels[index]

        }
        else {
            sels[index] = true
        }
        setSelectedUsers(sels)
        setKey(key + 1)
    }

    const selectAll = () => {
        setAllSelected(!allSelected)
        setSelectedUsers({})
        setKey(key + 1)
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
            <div className='flex justify-between items-center'>
                <h3 className='text-[24px] font-semibold text-textColorDarkBlue'>Recent Users {showViewAll}</h3>

                {showViewAll && <Link href={"/admin/users/all-users"} className='flex justify-end items-center gap-[14px]'>
                    <p className='text-[16px] font-semibold text-primaryColorLight'>View all</p>
                    <img src="/assets/small-arrow-right.svg" alt="" />
                </Link>}
            </div>

            <table className='bg-white w-full rounded-[15px] flex-1 h-full'>
                <thead>
                    <tr className={`flex ${allSelected ? "justify-between" : "justify-between"} text-left px-[100px] py-[17px] text-ellipsis overflow-hidden rounded-[15px] bg-primaryColorLight text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                <Select selected={allSelected} onSelect={selectAll} />
                                {anySelected && <div className='font-semibold text-[18px]'>{users.length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                <th className='w-[100px]'>#</th>
                                <th className='w-[200px]'>User ID</th>
                                <th className='w-[200px]'>Email Address</th>
                                <th className='w-[200px]'>Username</th>
                                <th className='w-[100px]'>Status</th>
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
                <tbody key={key}>
                    {users.map((user, index) => (
                        <tr key={index} className='flex justify-between text-left px-[100px] py-[17px] rounded-[15px] hover:border-borderColor border-[1.5px] border-solid border-white'>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedUsers[index] || allSelected} onSelect={() => selectUser(index)} color='black' />
                            </td>}
                            <td className='w-[100px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.id}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.email}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{user.first_name + " " + user.last_name} </td>
                            <td className='w-[100px] text-ellipsis overflow-hidden'>{user.account_status.is_deactivated ? "Deactivated " : "Activated"}</td>
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

        </div>
    )
}

export default UsersList