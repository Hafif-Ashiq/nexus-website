"use client"
import Header from '@/components/Header'
import Search from '@/components/Search'
import { useEffect, useState } from 'react'
import HeaderButton from '@/components/HeaderButton'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToContent, listenToFolderContent } from '@/firebaseFunctions/user/content'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ContentList from '../../_components/ContentList'
import { useParams } from 'next/dist/client/components/navigation'
import HeaderBreadCrumb from '@/components/HeaderBreadCrumb'
import LibraryHeaderBreadCrumb from '../../_components/LibraryHeaderBreadCrumb'
import { setCurrentContent } from '@/redux/slices/librarySlice'
import router from 'next/router'

const page = () => {
    const params = useParams();
    const contentId = params.contentId as string;

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const dispatch = useDispatch()

    const [content, setContent] = useState<ContentInterface | null>(null)

    useEffect(() => {
        listenToContent(userId, contentId, setContent)
    }, [contentId])

    return (
        <div className='flex flex-col gap-[40px]'>
            {/* <Header title='Library' subtitle='Navigate through the library of content' /> */}
            <LibraryHeaderBreadCrumb subtitle='Navigate through the library of content' />
            <div>{content?.title}</div>
            <div className='flex gap-[20px]'>

                <main className='basis-[70%] flex flex-col gap-[20px]  rounded-2xl w-full '>
                    <div className='flex flex-col gap-[22px] py-[22px]'>
                        <div className='bg-white rounded-2xl p-[20px]'>
                            <div className='flex flex-col items-start justify-between gap-[15px] bg-accentColorLight p-[20px] rounded-lg opacity-50 cursor-pointer'>
                                <div className='font-semibold text-[16px] text-primaryColorLight'>
                                    Original Content
                                </div>
                                <div className='font-medium text-black text-justify'>
                                    {content?.extracted_text}
                                </div>

                            </div>
                        </div>
                        <div className=''>
                            <div className='flex flex-col items-start justify-between gap-[15px] p-[20px] rounded-lg opacity-50 cursor-pointer'>
                                { }
                            </div>
                        </div>
                    </div>
                </main>

                <aside className='basis-[30%] flex flex-col gap-[20px] bg-white  rounded-2xl w-full'>
                </aside>
            </div>
            {/* <LibrarySideBar folders={folders} onFolderClick={(folder) => {
                    dispatch(setFolderContent(folder))
                    router.push(`/dashboard/library/folder/${folder.folder_id}`)
                }} /> */}
        </div>

    )
}

export default page