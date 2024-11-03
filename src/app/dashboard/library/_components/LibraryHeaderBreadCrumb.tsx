import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const LibraryHeaderBreadCrumb = ({ subtitle }: { subtitle: string }) => {
    const pathSegments = usePathname().split("/")
    const content = useSelector((state: RootState) => state.libraryReducer.currentContent)
    const folder = useSelector((state: RootState) => state.libraryReducer.folderContent)

    const isFolder = pathSegments.includes('folder')
    const isContent = pathSegments.includes('content')
    const folderId = isFolder ? pathSegments[pathSegments.indexOf('folder') + 1] : null
    const contentId = isContent ? pathSegments[pathSegments.indexOf('content') + 1] : null

    return (
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
                        <Link href={`/dashboard/library/folder/${folderId}`} className={`opacity-50 hover:opacity-100 ${!isContent ? 'opacity-100' : ''}`}>
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
    )
}

export default LibraryHeaderBreadCrumb