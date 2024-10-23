
import React from 'react'

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <div className='flex flex-col gap-[5px]'>
            <h2 className='text-[28px] font-semibold capitalize flex items-center gap-[20px]'>
                {title}
            </h2>
            <p className='text-[16px] opacity-[50%] font-medium'>{subtitle}</p>
        </div>
    )
}

export default Header