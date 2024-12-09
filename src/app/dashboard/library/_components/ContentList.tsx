import React, { useEffect, useState } from 'react'

import Select from '@/components/Select'

import { ContentInterface } from '@/services/ContentInterface'
import { getDateFormatted } from '@/utils/datetime'
import { deleteContent } from '@/firebaseFunctions/user/contentFunctions/deleteContent'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import DropDown from '@/app/admin/_components/DropDown'

interface ContentTableProps {
    content: ContentInterface[],
    showSelect?: boolean,
    showHeader?: boolean,
    onContentClick: (content: ContentInterface) => void
}

const ContentList: React.FC<ContentTableProps> = ({ content, showSelect = false, showHeader = true, onContentClick }) => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const [actionsOpen, setActionsOpen] = useState(-1)
    const [allSelected, setAllSelected] = useState(false)
    const [selectedContent, setSelectedContent] = useState<{ [key: number]: boolean }>({})

    const [anySelected, setAnySelected] = useState(false)

    useEffect(() => {
        const selectedCount = Object.keys(selectedContent).length
        setAnySelected(selectedCount > 0 || allSelected)

        if (selectedCount === content.length) {
            setAllSelected(true)
        } else if (selectedCount === 0) {
            setAllSelected(false)
        }
    }, [selectedContent, allSelected, content.length])

    const selectUser = (index: number) => {
        setSelectedContent(prev => {
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
            setSelectedContent(allIndexes)
        } else {
            // Deselect all
            setSelectedContent({})
        }
    }



    const deleteSelectedContent = async () => {
        if (!confirm("Are you sure you want to delete these content?")) return
        try {
            const deletePromises = Object.keys(selectedContent).map(index => {
                const contentId = content[parseInt(index)].content_id;
                return deleteContent(userId, contentId);
            });
            setSelectedContent({});
            setAllSelected(false);
            await Promise.all(deletePromises);
            alert("Content deleted successfully")
            // Clear selection after successful deletion

        } catch (error) {
            console.error("Error deleting content:", error);
        }
    }

    const getContentDropDownActions = (index: number) => {
        return [
            {
                title: "Delete",
                onClick: () => {
                    if (!confirm("Are you sure you want to delete this content?")) return
                    deleteContent(userId, content[index].content_id)
                    setActionsOpen(-1)
                }
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
                {showHeader && <thead>
                    <tr className={`flex justify-between text-left pl-[25px] pr-[50px] py-[25px] text-ellipsis overflow-hidden  bg-primaryColorLight font-semibold text-white text-[18px]`}>
                        {showSelect && <>
                            <th className='flex gap-[30px] items-center justify-start' style={{ width: anySelected ? "200px" : "30px" }}>
                                {/* All Select */}
                                <Select selected={allSelected} onSelect={selectAll} />
                                {anySelected && <div className='font-medium text-[18px]'>{Object.keys(selectedContent).length} Selected</div>}
                            </th>
                        </>}
                        {!anySelected ?
                            <>
                                {/* <th className='w-[20px]'>#</th> */}
                                <th className='w-[400px] font-medium'>Content Title</th>
                                <th className='w-[150px] font-medium'>Date Modified</th>
                                <th className='w-[150px] font-medium'>Type</th>
                                <th className='w-[50px] font-medium'>Action</th>
                            </>
                            :
                            <>
                                <th className='flex items-center font-medium gap-[15px]'>

                                    <button onClick={deleteSelectedContent} className='text-[18px] font-medium flex items-center gap-[10px]'>
                                        <img src="/assets/trash.svg" alt="Delete" />
                                        Delete
                                    </button>
                                </th>
                            </>
                        }

                    </tr>
                </thead>
                }
                <tbody>
                    {content.map((cont, index) => (
                        <tr
                            onClick={(e) => {
                                // Don't navigate if clicking the actions button
                                if (!(e.target as HTMLElement).closest('button')) {
                                    onContentClick(cont)
                                }
                            }}
                            key={index}
                            className={`flex justify-between items-center text-left pl-[25px] pr-[50px] py-[10px] text-ellipsis  font-medium  rounded-[15px]  cursor-pointer border-[1px] border-solid border-transparent hover:border-primaryColorLight transition-all duration-200 group`}>
                            {showSelect && <td className='w-[30px]'>
                                <Select selected={selectedContent[index] || allSelected} onSelect={(e) => {
                                    e.stopPropagation(); // Prevent tr click
                                    selectUser(index);
                                }} color='#CBD5E4' />
                            </td>}
                            {/* <td className='w-[20px]'>{index < 10 ? `0${index + 1}` : index + 1}</td> */}
                            <td className='w-[400px] text-ellipsis overflow-hidden flex items-center gap-[25px]'>
                                <img className='w-[100px] h-[60px] object-cover rounded-[10px] bg-accentColorLight' src={cont.thumbnail} alt="" />
                                <span className='flex-1 '>{cont.title}</span></td>
                            <td className='w-[150px] text-ellipsis overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-200'>{getDateFormatted(cont.date_updated)}</td>
                            <td className='w-[150px] text-ellipsis overflow-hidden flex items-center gap-[10px] opacity-50 group-hover:opacity-100 transition-opacity duration-200'>{getContentType(cont.type)} </td>
                            <td className='w-[50px] flex justify-center items-center relative'>
                                <button onClick={(e) => {
                                    e.stopPropagation(); // Prevent tr click
                                    index == actionsOpen ? setActionsOpen(-1) : setActionsOpen(index)
                                }} className=' py-[10px]'>
                                    <img src="/assets/dots.svg" alt="" />
                                </button>
                                {index == actionsOpen && <DropDown actions={getContentDropDownActions(index)} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ContentList