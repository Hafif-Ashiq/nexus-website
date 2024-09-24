import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import HeaderBreadCrumb from './HeaderBreadCrumb'

interface HeadCrumbHeaderProps {

    subtitle: string;
}

const HeadCrumbHeader: React.FC<HeadCrumbHeaderProps> = ({ subtitle }) => {

    return (
        <div className='flex flex-col gap-[5px]'>
            <HeaderBreadCrumb />
            <p className='text-[16px] opacity-[50%] font-medium'>{subtitle}</p>
        </div>
    )
}

export default HeadCrumbHeader