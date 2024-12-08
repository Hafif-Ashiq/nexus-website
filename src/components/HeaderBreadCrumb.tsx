import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ProfileModal from './modals/ProfileModal'

const HeaderBreadCrumb = () => {
    const path = usePathname().split("/")
    const router = useRouter()
    const [showProfileModal, setShowProfileModal] = useState(false)
    return (
        <div className='flex items-center justify-between'>
            <h2 className='text-[28px] font-semibold capitalize flex items-center gap-[20px]'>{path.slice(2).map((link, index) => (
                <div key={index} className='flex gap-[20px] items-center'>
                    <Link href={`${path.slice(0, index + 3).join("/")}`} className={`${index + 2 !== path.length - 1 ? "opacity-50" : ""} hover:opacity-100`}>
                        {link.split("-").join(" ")}
                    </Link>
                    <div className={`${index + 2 == path.length - 1 ? "hidden" : "block"}`}>
                        <img src="/assets/small-arrow-right-black.svg" alt="" />
                    </div>
                </div>
            ))}</h2>
            <div className='flex items-center gap-[15px]'>

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

export default HeaderBreadCrumb