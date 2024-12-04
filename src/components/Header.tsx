import React, { useState } from 'react'
import ProfileModal from './modals/ProfileModal';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    // const router = useRouter()
    const [showProfileModal, setShowProfileModal] = useState(false)
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-[5px]'>
                <h2 className='text-[28px] font-semibold capitalize flex items-center gap-[20px]'>
                    {title}
                </h2>
                <p className='text-[16px] opacity-[50%] font-medium'>{subtitle}</p>
            </div>
            <div className='flex items-center gap-[15px] relative'>
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

export default Header