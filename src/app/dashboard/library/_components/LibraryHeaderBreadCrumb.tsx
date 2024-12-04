import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ProfileModal from '@/components/modals/ProfileModal'

const LibraryHeaderBreadCrumb = ({ subtitle }: { subtitle: string }) => {
    const router = useRouter()
    const pathSegments = usePathname().split("/")
    const content = useSelector((state: RootState) => state.libraryReducer.currentContent)
    const folder = useSelector((state: RootState) => state.libraryReducer.folderContent)

    const isFolder = pathSegments.includes('folder')
    const isContent = pathSegments.includes('content')
    const folderId = isFolder ? pathSegments[pathSegments.indexOf('folder') + 1] : null
    const contentId = isContent ? pathSegments[pathSegments.indexOf('content') + 1] : null

    const [showProfileModal, setShowProfileModal] = useState(false)
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-[5px]'>
                <h2 className='text-[28px] font-semibold capitalize flex items-center gap-[20px]'>
                    <div className='flex gap-[20px] items-center'>
                        <Link href="/dashboard/library" className={`opacity-50 hover:opacity-100 ${!isFolder && !isContent ? 'opacity-100' : ''}`}>
                            Library
                        </Link>
                        {(isFolder || isContent) && <img src="/assets/small-arrow-right-black.svg" alt="" />}
                    </div>
                    {isFolder && (
                        <div className='flex gap-[20px] items-center'>
                            <Link href={`/dashboard/library/folder/${folderId}`} className={` hover:opacity-100 ${!isContent ? 'opacity-100' : 'opacity-50'}`}>
                                {folder?.title || folderId}

                            </Link>
                            {isContent && <img src="/assets/small-arrow-right-black.svg" alt="" />}
                        </div>
                    )}
                    {isContent && (
                        <div className='flex gap-[20px] items-center'>
                            <Link href={`/dashboard/library/folder/${folderId}/content/${contentId}`} className="opacity-100">
                                {content?.title || contentId}
                            </Link>
                        </div>
                    )}
                </h2>
                <p className='text-[16px] opacity-[50%] font-medium'>{subtitle}</p>
            </div>
            <div className='flex items-center gap-[15px]'>
                <button className='bg-primaryColorLight text-white pl-[15px] pr-[20px] py-[10px] rounded-[15px] font-medium text-[14px] flex items-center gap-[5px]'>
                    <img src="/assets/add.svg" alt="upload icon" />
                    <span>Upload</span>
                </button>
                <button onClick={() => {
                    setShowProfileModal(!showProfileModal)
                }} className='w-[55px] h-[55px] rounded-full overflow-hidden'>
                    <img src="/admin-image.jpg" alt="admin image" className='object-cover w-full h-full ' />
                </button>
                {showProfileModal &&
                    <div className='absolute top-[60px] right-[0px] '>
                        <ProfileModal />
                    </div>
                }
            </div>
        </div>
    )
}

export default LibraryHeaderBreadCrumb