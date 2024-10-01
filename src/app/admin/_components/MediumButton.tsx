import React from 'react'


interface LargeButtonProps {
    activeIcon: string;
    inActiveIcon: string;
    text: string;
    onClick: () => void;
    active?: boolean;

}


const MediumButton: React.FC<LargeButtonProps> = ({ activeIcon, inActiveIcon, text, onClick, active = false, }) => {
    return (
        <button
            onClick={onClick} className={`shadow-normal flex flex-col justify-center items-center gap-[10px] p-[30px] flex-1 ${active ? "text-white bg-primaryColorLight" : "bg-accentColorLight"} rounded-[15px] w-full `} >
            <div className='w-full flex justify-center items-center'>
                <img src={`/assets/${active ? activeIcon : inActiveIcon}.svg`} alt="" className='w-[38px] h-[38px] fill-white' />

            </div>
            <div className='flex flex-col text-center'>
                <p className='text-center font-semibold text-[24px]'>{text}</p>
            </div>
        </button>
    )
}



export default MediumButton