
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Select from '@/components/Select'
import DropDown from '../../_components/DropDown'
import { SupportInterface } from '@/services/SupportInterface'
import { getStatusColor } from '@/utils/support'

interface SupportChatTableProps {
    issues: SupportInterface[],
    showSelect?: boolean,
    showViewAll?: boolean
}

const SupportChatLists: React.FC<SupportChatTableProps> = ({ issues, showSelect = false, showViewAll = true }) => {



    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<any>({})
    const [key, setKey] = useState(0)

    const [anySelected, setAnySelected] = useState(false)
    /*
    useEffect(() => {
        // Object.keys(selectedUsers).length === 0 && !allSelected ? setAnySelected(false) : setAnySelected(true)
        // Object.keys(selectedUsers).length === users.length ? setAllSelected(true) : setAllSelected(false)
        // console.log(Object.keys(selectedUsers).length)
    }, [key])

    const selectUser = (index: number) => {

        const sels = selectedUsers
        if (sels[index]) {
            delete sels[index]
            allSelected ? setAllSelected(false) : null
        }
        else {
            sels[index] = true
        }
        setSelectedUsers(sels)
        setKey(key + 1)
    }

    const selectAll = () => {
        setAllSelected(!allSelected)
        // setSelectedUsers({})
        setKey(key + 1)
    }
*/



    const getUserDropDownActions = (index: number) => {


        return [
            {
                title: "Activate Account",
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



    const selectUser = (index: number) => { }

    return (
        <div className='flex flex-col gap-[15px] h-full'>


            <table className='bg-white w-full flex-1 h-full'>
                <thead>
                    <tr className={`flex justify-around text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis overflow-hidden  bg-primaryColorLight text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                {/* All Select */}
                                <Select selected={allSelected} onSelect={() => { }} />
                                {anySelected && <div className='font-semibold text-[18px]'>{issues.length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                <th className='w-[100px]'>#</th>
                                <th className='w-[200px]'>User ID</th>
                                <th className='w-[200px]'>Username</th>
                                <th className='w-[200px]'>Category</th>
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
                    {issues.map((issue, index) => (
                        <tr key={index} className='flex justify-around text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis  font-semibold  rounded-[15px] hover:border-borderColor border-[1.5px] border-solid border-white'>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedUsers[index] || allSelected} onSelect={() => selectUser(index)} color='black' />
                            </td>}
                            <td className='w-[100px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.user_id}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.user_name}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.issue_category} </td>
                            <td className='w-[100px] text-ellipsis overflow-hidden' style={{
                                color: getStatusColor(issue.issue_status)
                            }}>{issue.issue_status}</td>
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

export default SupportChatLists