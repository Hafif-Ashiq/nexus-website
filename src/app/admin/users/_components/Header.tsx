import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import HeaderBreadCrumb from '../../_components/HeaderBreadCrumb'

const Header = () => {
    const path = usePathname().split("/")
    return (
        <div className='flex flex-col gap-[5px]'>
            <HeaderBreadCrumb />
            <p className='text-[16px] opacity-[50%] font-medium'>Checkout the user's performance</p>
        </div>
    )
}

export default Header