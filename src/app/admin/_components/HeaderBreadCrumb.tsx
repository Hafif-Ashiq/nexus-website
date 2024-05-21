import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderBreadCrumb = () => {
    const path = usePathname().split("/")
    return (
        <h2 className='text-[28px] font-semibold capitalize flex items-center gap-[20px]'>{path.slice(2).map((link, index) => (
            <div key={index} className='flex gap-[20px] items-center'>
                <Link href={`${path.slice(0, index + 3).join("/")}`} className={`${index + 2 !== path.length - 1 ? "opacity-50" : ""} hover:opacity-100`}>
                    {link}
                </Link>
                <div className={`${index + 2 == path.length - 1 ? "hidden" : "block"}`}>
                    <img src="/assets/small-arrow-right-black.svg" alt="" />
                </div>
            </div>
        ))}</h2>
    )
}

export default HeaderBreadCrumb