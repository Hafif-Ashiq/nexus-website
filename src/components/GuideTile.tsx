
import React, { useEffect, useState } from 'react'

interface GuideTileProps {
    title: string;
    onDeleteClick: () => void;
    image: string;
    editEnabled: boolean;
    onClick: () => void;
}

const GuideTile: React.FC<GuideTileProps> = ({ title, onDeleteClick, image, editEnabled, onClick }) => {

    const onOuterClick = () => {
        onClick()
    }

    return (
        <button onClick={onOuterClick} className=' min-w-[485px] min-h-[155px] relative rounded-[15px] overflow-hidden px-[20px] py-[15px] flex flex-col justify-between items-start bg-accentColorLight'>
            <img src={image} alt="" className='absolute inset-0 w-full h-full object-cover ' />
            <div className='bg-black opacity-25 absolute inset-0 z-1'></div>
            {/* : <video src={image} className='absolute z-[-1] inset-0 w-full h-full object-cover ' />} */}
            {/* <img src={image} alt="" className='absolute z-[-1] inset-0 w-full h-full object-cover ' /> */}
            <div className='flex justify-between w-full relative z-2'>
                <p className='text-[20px] font-medium text-white text-left'>Guide</p>
                {
                    editEnabled &&
                    <button onClick={onDeleteClick} className='p-[7px] bg-[#00000050] rounded-full'>
                        <img src="/assets/trash.svg" alt="" />
                    </button>
                }
            </div>
            <div className='text-[24px] font-semibold text-white relative z-2'>
                <p className='w-[200px]'>{title}</p>
            </div>
        </button>
    )
}

export default GuideTile