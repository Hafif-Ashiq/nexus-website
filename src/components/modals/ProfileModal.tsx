import React from 'react'

import DarkIcon from '../../../public/assets/moon.svg'
import AppNotifIcon from '../../../public/assets/app-notif.svg'
import CommunityNotifIcon from '../../../public/assets/community-filled.svg'
import ManageAccountIcon from '../../../public/assets/manage-account-menu.svg'
import HelpIcon from '../../../public/assets/support-menu.svg'
import SwitchButton from '../SwitchButton'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'

const ProfileModal = () => {
    const router = useRouter()

    const user = useSelector((state: RootState) => state.userReducer.user)

    const settings = [
        {
            title: 'Toggle theme',
            icon: DarkIcon,
            onChange: () => { }
        },
        {
            title: 'App notifications',
            icon: AppNotifIcon,
            onChange: () => { }
        },
        {
            title: 'Community notifications',
            icon: CommunityNotifIcon,
            onChange: () => { }
        }
    ]


    const accountOptions = [
        {
            title: 'Manage Account',
            icon: ManageAccountIcon,
            onClick: () => { }
        },
        {
            title: 'Help & Support',
            icon: HelpIcon,
            onClick: () => {
                router.push("/dashboard/support")
            }
        }
    ]

    const handleLogout = async () => {
        try {
            await signOut(auth)
            router.push('/login')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <div className='w-[330px] bg-white rounded-[15px] border-[1px] border-borderColorLight py-[20px] shadow-md flex flex-col gap-[15px]'>
            {/* Top div */}
            <button onClick={() => {
                router.push("/dashboard/profile")
            }} className='w-full flex items-center justify-betweeen px-[20px]'>
                <div className='flex items-center gap-[15px]'>
                    <img src={user?.profile_pic || "/admin-image.jpg"} alt='profile' className='w-[40px] h-[40px] rounded-full' />
                    <div className='flex flex-col justify-start items-start '>
                        <p className='text-[16px] font-semibold'>{user?.first_name} {user?.last_name}</p>
                        <p className='text-[14px] opacity-50'>View Profile</p>
                    </div>
                </div>
                <div className='flex-1 flex items-center justify-end'>
                    <img src="/assets/small-arrow-right-black.svg" alt="arrow" />
                </div>
            </button>
            <div className='w-full h-[1px] bg-borderColorLight'></div>
            {/* Settings */}
            <div className='px-[20px] flex flex-col gap-[10px]'>
                <span className='text-[16px] font-medium opacity-50'>Settings</span>
                <div className='flex flex-col gap-[10px] text-[14px] text-[#757575]'>
                    {settings.map((item, index) => (
                        <div key={index} className='flex items-center justify-between py-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <item.icon style={{ width: '20px', height: '20px', color: 'transparent' }} stroke="#757575" />
                                <p className='text-[14px] font-medium'>{item.title}</p>
                            </div>
                            <div>
                                <SwitchButton initialChecked={false} onChange={item.onChange} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full h-[1px] bg-borderColorLight'></div>
            {/* Account */}
            <div className='px-[20px] flex flex-col gap-[10px]'>
                <span className='text-[16px] font-medium opacity-50'>Account</span>
                <div className='flex flex-col gap-[10px] text-[14px] text-[#757575]'>
                    {accountOptions.map((item, index) => (
                        <button key={index} onClick={item.onClick} className='flex items-center justify-between py-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <item.icon style={{ width: '20px', height: '20px', color: 'transparent' }} stroke="#757575" />
                                <p className='text-[14px] font-medium'>{item.title}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-full h-[1px] bg-borderColorLight'></div>

            {/* Logout */}
            <button onClick={handleLogout} className='flex items-center gap-[10px] px-[20px]'>
                <img src="/assets/logout2.svg" alt="logout" />
                <span className='text-[#757575] py-[10px] rounded-[15px] text-[16px] font-medium'>Logout</span>
            </button>
        </div>
    )
}

export default ProfileModal