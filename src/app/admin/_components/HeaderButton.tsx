import React from 'react'
import Logo from '../../../../public/assets/arrow-down.svg';

interface HeaderButtonProps {

    title: string;
    icon: string;
    onClick: () => void;
    isDropdown?: boolean;
}


const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, title, onClick, isDropdown = false }) => {
    return (
        <button onClick={onClick} className='py-[10.5px] text-primaryColorLight px-5 border-borderColor border-[2px] border-solid rounded-xl flex justify-center items-center  gap-[7px] font-semibold text-[16px]'>
            {!isDropdown ? <img src={icon} alt={title} /> :
                <div className='w-[8px] h-[8px] rounded-full bg-primaryColorLight'></div>
            }
            <p>{title}</p>
            {isDropdown ? <img src='/assets/small-arrow-down-light-blue.svg' alt='arrow-down' /> : <></>}

        </button>
    )
}



export default HeaderButton