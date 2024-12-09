
import React, { useEffect, useState } from 'react'

import Select from '@/components/Select'
import DropDown from '../../_components/DropDown'
import { SupportInterface } from '@/services/SupportInterface'
import { getStatusColor } from '@/utils/support'
import { useDispatch } from 'react-redux'
import { setSupportChat } from '@/redux/slices/adminSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { updateSupportStatus } from '@/firebaseFunctions/admin/support'

interface SupportChatTableProps {
    issues: SupportInterface[],
    showSelect?: boolean,
    showViewAll?: boolean
}

const SupportChatLists: React.FC<SupportChatTableProps> = ({ issues, showSelect = false, showViewAll = true }) => {

    const currentSupportChat = useSelector((state: RootState) => state.adminReducer.currentSupportChat)

    const dispatch = useDispatch()

    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: boolean }>({})
    const [key, setKey] = useState(0)
    const [anySelected, setAnySelected] = useState(false)

    useEffect(() => {
        const selectedCount = Object.keys(selectedUsers).length
        setAnySelected(selectedCount > 0 || allSelected)

        if (selectedCount === issues.length) {
            setAllSelected(true)
        } else if (selectedCount === 0) {
            setAllSelected(false)
        }
    }, [selectedUsers, allSelected, issues.length])

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
            const allIndexes = issues.reduce((acc, _, index) => {
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
        return [
            {
                title: "Mark as Resolved",
                onClick: () => {
                    updateSupportStatus(issues[index].issue_id, "Resolved")
                    setActionsOpen(-1)
                }
            },
            {
                title: "Mark as Closed",
                onClick: () => {
                    updateSupportStatus(issues[index].issue_id, "Closed")
                    setActionsOpen(-1)
                }
            }
        ]
    }



    return (
        <div className='flex flex-col gap-[15px] h-full flex-1'>

            <table className='bg-white w-full flex-1 h-full'>
                <thead>
                    <tr className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis overflow-hidden  bg-primaryColorLight text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                {/* All Select */}
                                <Select selected={allSelected} onSelect={selectAll} />
                                {anySelected && <div className='font-semibold text-[18px]'>{Object.keys(selectedUsers).length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[200px]'>User ID</th>
                                <th className='w-[200px]'>Username</th>
                                <th className='w-[200px]'>Category</th>
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
                <tbody key={key}>
                    {issues.map((issue, index) => (
                        <tr
                            onClick={(e) => {
                                if (!(e.target as HTMLElement).closest('button')) {
                                    dispatch(setSupportChat(issue))
                                }
                            }}
                            key={issue.issue_id + "_" + index}
                            className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis  font-semibold  rounded-[15px]  border-[1.5px] border-solid  cursor-pointer ${issue.issue_id == currentSupportChat.issue_id ? "border-primaryColorLight" : "hover:border-borderColor border-white"}`}>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedUsers[index] || allSelected} onSelect={(e) => {
                                    e.stopPropagation();
                                    selectUser(index)
                                }} color='#CBD5E4' />
                            </td>}
                            <td className='w-[20px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.user_id}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.user_name}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden'>{issue.issue_category} </td>
                            <td className='w-[130px] text-ellipsis overflow-hidden' style={{
                                color: getStatusColor(issue.issue_status)
                            }}>{issue.issue_status}</td>
                            <td className='w-[50px] flex justify-center items-center relative'>
                                <button onClick={() => index == actionsOpen ? setActionsOpen(-1) : setActionsOpen(index)} className=' py-[5px]'>
                                    <img src="/assets/dots.svg" alt="" />
                                </button>
                                {index == actionsOpen && <DropDown key={issue.issue_id + "_" + index + "_dropdown"} actions={getUserDropDownActions(index)} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default SupportChatLists