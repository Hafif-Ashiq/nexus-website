import React, { useEffect, useState } from 'react'

import Select from '@/components/Select'
import { useDispatch } from 'react-redux'
import { setSupportChat } from '@/redux/slices/adminSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { ContentInterface } from '@/services/ContentInterface'
import { getCurrentTimeFormatted, getDateFormatted } from '@/utils/datetime'

interface ContentTableProps {
    content: ContentInterface[],
    showSelect?: boolean,
    showViewAll?: boolean
}

const ContentList: React.FC<ContentTableProps> = ({ content, showSelect = false, showViewAll = true }) => {

    const dispatch = useDispatch()

    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: boolean }>({})

    const [anySelected, setAnySelected] = useState(false)

    useEffect(() => {
        const selectedCount = Object.keys(selectedUsers).length
        setAnySelected(selectedCount > 0 || allSelected)

        if (selectedCount === content.length) {
            setAllSelected(true)
        } else if (selectedCount === 0) {
            setAllSelected(false)
        }
    }, [selectedUsers, allSelected, content.length])

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
            const allIndexes = content.reduce((acc, _, index) => {
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


    const getContentType = (type: string) => {
        return (
            <>
                <img src={`/assets/contentTypes/${type}-blue.svg`} alt={type} />
                <div>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</div>
            </>
        )
    }

    return (
        <div className='flex flex-col gap-[15px] h-full flex-1'>

            <table className='bg-white w-full flex-1 h-full'>
                <thead>
                    <tr className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis overflow-hidden  bg-primaryColorLight font-semibold text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                {/* All Select */}
                                <Select selected={allSelected} onSelect={selectAll} />
                                {anySelected && <div className='font-medium text-[18px]'>{Object.keys(selectedUsers).length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[300px]'>Content Title</th>
                                <th className='w-[200px]'>Date Modified</th>
                                <th className='w-[200px]'>Type</th>
                                <th className='w-[50px]'>Action</th>
                            </>
                            :
                            <>
                                <th className='flex items-center font-semibold gap-[15px]'>
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
                    {content.map((cont, index) => (
                        <tr
                            onClick={() => {
                                dispatch(setSupportChat(cont))
                            }}
                            key={index}
                            className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis  font-medium  rounded-[15px]  cursor-pointer`}>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedUsers[index] || allSelected} onSelect={() => selectUser(index)} color='#CBD5E4' />
                            </td>}
                            <td className='w-[20px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[300px] text-ellipsis overflow-hidden'>{cont.title}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden opacity-50'>{getDateFormatted(cont.date_updated)}</td>
                            <td className='w-[200px] text-ellipsis overflow-hidden flex items-center gap-[10px] opacity-50'>{getContentType(cont.type)} </td>
                            <td className='w-[50px] flex justify-center items-center relative'>
                                <button onClick={() => index == actionsOpen ? setActionsOpen(-1) : setActionsOpen(index)} className=' py-[5px]'>
                                    <img src="/assets/dots.svg" alt="" />
                                </button>
                                {/* {index == actionsOpen && <DropDown actions={getUserDropDownActions(index)} />} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ContentList