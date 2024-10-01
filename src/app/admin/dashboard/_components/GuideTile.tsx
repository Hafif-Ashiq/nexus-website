
import React, { useEffect, useState } from 'react'

interface GuideTileProps {
    title: string;
    onDeleteClick: () => void;
    image: string;

}

const GuideTile: React.FC<GuideTileProps> = ({ title, onDeleteClick, image }) => {
    return (
        <div className=' min-w-[485px] min-h-[155px] relative rounded-[15px] overflow-hidden px-[20px] py-[15px] flex flex-col justify-between items-start'>
            <img src={image} alt="" className='absolute z-[-1] inset-0 w-full h-full object-cover ' />
            {/* : <video src={image} className='absolute z-[-1] inset-0 w-full h-full object-cover ' />} */}
            {/* <img src={image} alt="" className='absolute z-[-1] inset-0 w-full h-full object-cover ' /> */}
            <div className='flex justify-between w-full'>
                <p className='text-[20px] font-medium text-white'>Guide</p>
                <button onClick={onDeleteClick} className='p-[7px] bg-[#00000050] rounded-full'>
                    <img src="/assets/trash.svg" alt="" />
                </button>

            </div>
            <div className='text-[24px] font-semibold text-white'>
                <p className='w-[200px]'>{title}</p>
            </div>
        </div>
    )
}

export default GuideTile