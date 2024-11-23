
import HeaderButton from '@/components/HeaderButton'
import IconButton from '@/components/IconButton'
import { updateContent } from '@/firebaseFunctions/user/content'
import { listenToUserFolders } from '@/firebaseFunctions/user/folder'
import { setAllFolders } from '@/redux/slices/librarySlice'
import { RootState } from '@/redux/store'
import { ContentInterface } from '@/services/ContentInterface'
import { FolderInterface } from '@/services/FoldersInterface'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface ContentSideBarProps {
    content: ContentInterface,
}

const ContentSideBar = ({ content }: ContentSideBarProps) => {

    const [title, setTitle] = useState<string>("")
    const [folder, setFolder] = useState<string>("")
    const [tagInput, setTagInput] = useState<string>("")
    const [changed, setChanged] = useState(false)

    const dispatch = useDispatch()

    const folders = useSelector((state: RootState) => state.libraryReducer.allFolders)

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    useEffect(() => {
        if (folders.length == 0) {
            listenToUserFolders(userId, (folders) => dispatch(setAllFolders(folders)))
        }
        setTitle(content.title)
        setFolder(content.folder_id)
    }, [])

    useEffect(() => {
        if (title !== content.title || folder !== content.folder_id) {
            setChanged(true)
        }
        else {
            setChanged(false)
        }
    }, [title, folder, content.title, content.folder_id])


    const deleteContent = () => {

    }

    const updateCurrentContent = () => {
        const updates: {
            title?: string,
            folder_id?: string,

        } = {}
        if (title !== content.title)
            updates["title"] = title
        if (folder !== content.folder_id)
            updates["folder_id"] = folder


        updateContent(userId, content.content_id, updates).then(res => {
            alert("Updated Content")
        })

    }

    const addContentTag = () => {
        if (tagInput == "")
            return

        const updates = {
            tags: [...content.tags, tagInput]
        }

        updateContent(userId, content.content_id, updates)
        setTagInput("")
    }

    const deleteContentTag = (tag: number) => {
        const newTags = content.tags.filter((_, index) => index !== tag)
        const updates = {
            tags: newTags
        }

        updateContent(userId, content.content_id, updates)
    }

    return (
        <div className='basis-[30%] bg-white rounded-2xl'>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>

                <div className='relative overflow-hidden min-h-[200px] rounded-[15px] w-full'>
                    {/* View  */}
                    <img className='absolute inset-0 w-full h-full' src="/book.png" alt="background-content" />
                    <div>View Doc</div>
                </div>

                <div className='flex-1 flex flex-col gap-[20px]'>
                    <label htmlFor="title" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Content Title</p>
                        <input
                            type="text"
                            name='title'
                            className='input-field w-full'
                            value={title}
                            placeholder='Content'
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </label>
                    <label htmlFor="folderSelected" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Folder Selected</p>
                        <select

                            name='folderSelected'
                            className={`input-field w-full `}
                            style={{
                                opacity: content?.folder_id == "" ? "50%" : "100%"
                            }}
                            value={folder}
                            onChange={(e) => { setFolder(e.target.value) }}
                        >
                            <option value={""} className='text-primaryColorLight font-semibold opacity-50'>Select Folder</option>
                            {
                                folders.map(fol => (
                                    <option key={fol.folder_id} value={fol.folder_id} className='text-primaryColorLight font-semibold'>{fol.title}</option>
                                ))
                            }
                            {/* {folders} */}
                        </select>
                    </label>
                    <div className='flex flex-col items-stretch gap-[15px]'>
                        <label htmlFor="title" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Content Tags</p>
                            <div className='flex justify-between items-center gap-[10px]'>
                                <input
                                    type="text"
                                    name='title'
                                    className='input-field w-full '
                                    value={tagInput}
                                    placeholder='Add a new Tag'
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            addContentTag()
                                        }
                                    }}
                                />
                                <IconButton icon='/assets/arrow-up-white.svg' disabled={tagInput == ""} filled
                                    onClick={addContentTag} />
                            </div>
                        </label>
                        <div className='flex flex-wrap gap-[7px] '>
                            {content.tags.map((tag, index) => (
                                <button key={index} onClick={() => deleteContentTag(index)} className='flex bg-accentColorLight p-[10px] text-primaryColorLight font-medium rounded-[10px]'>
                                    <img src="/assets/add-blue.svg" alt="" className='rotate-45' />
                                    <span>
                                        {tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <button

                        onClick={changed ? updateCurrentContent : deleteContent}
                        className={`${changed ? "bg-primaryColorLight" : "bg-warningColor"} py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}>
                        {changed ? "Update Content" : "Delete Content"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContentSideBar