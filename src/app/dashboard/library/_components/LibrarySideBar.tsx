import HeaderButton from '@/components/HeaderButton'
import IconButton from '@/components/IconButton'
import { FolderInterface } from '@/services/FoldersInterface'
import React from 'react'

interface LibrarySideBarProps {
    folders: FolderInterface[],
    onFolderClick: (folder: FolderInterface) => void
}

const LibrarySideBar = ({ folders, onFolderClick }: LibrarySideBarProps) => {

    const showFolders = (folder: FolderInterface) => {
        return (
            <button key={folder.folder_id} className='flex flex-col gap-[2px]' onClick={() => onFolderClick(folder)}>
                <div className={`flex flex-col justify-start items-start gap-[15px] overflow-hidden p-[15px] rounded-[15px] bg-accentColorLight w-full text-left border-[1px] border-solid border-transparent hover:border-primaryColorLight transition-all duration-200 `}>
                    <img src="/assets/folder-minus.svg" alt="folder icon" className='w-[32px] h-[32px]' />
                    <p className='font-medium text-[16px] max-h-[48px] overflow-hidden w-full text-ellipsis'>{folder.title}</p>

                </div>

            </button>
        )
    }

    return (
        <div className='basis-[30%] bg-white rounded-2xl'>
            <div className='shadow-normal bg-white h-full rounded-[15px] py-[20px] flex flex-col gap-[15px]'>
                <div className='flex justify-between items-center px-[20px]'>
                    {/* left */}
                    <div className='flex justify-start items-center gap-[15px]  '>
                        <HeaderButton icon='/assets/add-blue.svg' title='Folder' onClick={() => { }} />
                    </div>
                    {/* Right */}
                    <div className='flex justify-end items-center gap-[15px]'>
                        {/* buttons */}
                        <IconButton icon='/assets/menu-blue.svg' onClick={() => { }} />
                    </div>
                </div>
                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                <div className='flex flex-col gap-[15px] px-[20px]'>
                    <p className='font-semibold text-[16px] text-textColorDarkBlue'>Folders</p>
                    <div className='grid grid-cols-2 gap-[15px]'>
                        {folders.map((folder, index) => (
                            showFolders(folder)
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LibrarySideBar