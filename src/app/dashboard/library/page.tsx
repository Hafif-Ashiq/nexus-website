"use client"
import Header from '@/components/Header'
import ContentList from './_components/ContentList'
import Search from '@/components/Search'
import { useEffect, useState } from 'react'
import HeaderButton from '@/components/HeaderButton'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToUserContent } from '@/firebaseFunctions/user/content'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import LibrarySideBar from './_components/LibrarySideBar'
import { FolderInterface } from '@/services/FoldersInterface'
import { listenToUserFolders } from '@/firebaseFunctions/user/folder'
import { useRouter } from 'next/navigation'
import { setAllContent, setAllFolders, setCurrentContent, setFolderContent } from '@/redux/slices/librarySlice'

const page = () => {
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const router = useRouter()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')

    const folders = useSelector((state: RootState) => state.libraryReducer.allFolders);
    const content = useSelector((state: RootState) => state.libraryReducer.allContent);

    const [filteredContent, setFilteredContent] = useState<ContentInterface[]>(content)


    useEffect(() => {
        const filteredContent = getContent()
        setFilteredContent(filteredContent)
    }, [content, searchText])

    const getContent = () => {
        if (searchText == "") {
            return content
        }

        const contentList: ContentInterface[] = content.filter(cont => {
            const titleMatch = cont.title.toLowerCase().includes(searchText.toLowerCase());
            const tagMatch = cont.tags.some(tag =>
                tag.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(titleMatch, tagMatch);

            return titleMatch || tagMatch;
        });

        return contentList
    }

    useEffect(() => {
        listenToUserContent(userId, (content) => dispatch(setAllContent(content)))
        listenToUserFolders(userId, (folders) => dispatch(setAllFolders(folders)))
    }, [userId, dispatch])

    return (
        <div className='flex flex-col gap-[40px]'>
            <Header title='Library' subtitle='Navigate through the library of content' />
            <div className="flex gap-[40px] flex-1">
                <main className='basis-[70%] flex flex-col gap-[20px] bg-white  rounded-2xl w-full'>
                    <div className='flex flex-col gap-[22px] py-[22px]'>
                        <div className='flex items-center justify-between gap-[15px] px-[22px]'>
                            <Search text={searchText} onChange={(text) => { setSearchText(text) }} placeholder="Search Content.." />

                            <div className='flex justify-end items-center gap-[15px] '>

                                {/* Filter button */}
                                <HeaderButton icon='/assets/sort.svg' title='Filter' onClick={() => { }} />
                            </div>

                        </div>
                        <div className='flex-1 h-full min-h-[70vh]'>

                            <ContentList content={filteredContent} showSelect onContentClick={(cont) => {
                                dispatch(setCurrentContent(cont))
                                router.push(`/dashboard/library/content/${cont.content_id}`)
                            }} />
                        </div>

                    </div>
                </main>

                <LibrarySideBar folders={folders} onFolderClick={(folder) => {
                    dispatch(setFolderContent(folder))
                    router.push(`/dashboard/library/folder/${folder.folder_id}`)
                }} />

            </div>
        </div>

    )
}

export default page