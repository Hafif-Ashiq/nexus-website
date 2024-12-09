"use client"
import Header from '@/components/Header'
import Search from '@/components/Search'
import { useEffect, useState } from 'react'
import HeaderButton from '@/components/HeaderButton'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToFolderContent } from '@/firebaseFunctions/user/content'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ContentList from '../../_components/ContentList'
import { useParams, useRouter } from 'next/dist/client/components/navigation'
import HeaderBreadCrumb from '@/components/HeaderBreadCrumb'
import LibraryHeaderBreadCrumb from '../../_components/LibraryHeaderBreadCrumb'
import { setCurrentContent } from '@/redux/slices/librarySlice'

const page = () => {
    const params = useParams();
    const folderId = params.folderId as string;
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const router = useRouter()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')

    const [content, setContent] = useState<ContentInterface[]>([])


    useEffect(() => {
        listenToFolderContent(userId, folderId, setContent)
    }, [userId])

    return (
        <div className='flex flex-col gap-[40px]'>
            {/* <Header title='Library' subtitle='Navigate through the library of content' /> */}
            <LibraryHeaderBreadCrumb subtitle='Navigate through the library of content' />
            <div className="flex gap-[40px] flex-1">
                <main className='basis-[70%] flex flex-col gap-[20px] bg-white  rounded-2xl w-full'>
                    <div className='flex flex-col gap-[22px] py-[22px]'>
                        <div className='flex items-center justify-between gap-[15px] px-[22px]'>
                            <Search text={searchText} onChange={(text) => { setSearchText(text) }} placeholder="Search Content.." />
                            <div className='flex justify-end items-center gap-[15px] '>
                                {/* Report Download Button */}
                                {/* <HeaderButton icon='/assets/arrow-down.svg' title='Report' onClick={() => { }} /> */}
                                {/* Filter button */}
                                <HeaderButton icon='/assets/sort.svg' title='Filter' onClick={() => { }} />

                            </div>

                        </div>
                        <div className='flex-1 min-h-[70vh]'>

                            <ContentList content={content} showSelect onContentClick={(cont) => {
                                dispatch(setCurrentContent(cont))
                                router.push(`/dashboard/library/folder/${folderId}/content/${cont.content_id}`)
                            }} />
                        </div>

                    </div>
                </main>

                <aside className='basis-[30%]'>

                </aside>

            </div>
        </div>

    )
}

export default page