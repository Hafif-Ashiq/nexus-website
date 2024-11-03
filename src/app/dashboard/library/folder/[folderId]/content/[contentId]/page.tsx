"use client"
import Header from '@/components/Header'
import Search from '@/components/Search'
import { useEffect, useState } from 'react'
import HeaderButton from '@/components/HeaderButton'
import { ContentInterface } from '@/services/ContentInterface'
import { listenToFolderContent } from '@/firebaseFunctions/user/content'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { useParams } from 'next/dist/client/components/navigation'
import HeaderBreadCrumb from '@/components/HeaderBreadCrumb'
import LibraryHeaderBreadCrumb from '../../../../_components/LibraryHeaderBreadCrumb'


const page = () => {
    const params = useParams();
    const contentId = params.contentId as string;

    return (
        <div className='flex flex-col gap-[40px]'>
            {/* <Header title='Library' subtitle='Navigate through the library of content' /> */}
            <LibraryHeaderBreadCrumb subtitle='Navigate through the library of content' />
            <div>{contentId}</div>

        </div>

    )
}

export default page