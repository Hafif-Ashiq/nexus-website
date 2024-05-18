import React from 'react'

interface TileProps {
    text: string;
    color: string;
}

const PerformanceTitleTile: React.FC<TileProps> = ({ text, color }) => {
    return (
        <div className='px-[12px] py-2 rounded-lg border-[#E5E5EF] border-[1px] border-solid flex justify-center items-center gap-[6px]'>
            <div className={`w-[9px] h-[9px] rounded-full`} style={{ backgroundColor: color }}></div>
            <p className='text-textColorDarkBlue text-[14px] leading-[14px]'>{text}</p>
        </div>
    )
}

export default PerformanceTitleTile