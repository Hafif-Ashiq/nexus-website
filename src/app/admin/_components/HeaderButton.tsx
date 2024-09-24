import React from 'react'
import Logo from '../../../../public/assets/arrow-down.svg';

interface HeaderButtonProps {

    title: string;
    icon: string;
    onClick: () => void;

}


const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, title, onClick }) => {
    return (
        <button onClick={onClick} className='py-[10.5px] text-primaryColorLight px-5 border-borderColor border-[2px] border-solid rounded-xl flex justify-center items-center  gap-[7px] font-semibold text-[16px]'>
            <img src={icon} alt="" />

            <p>{title}</p>
        </button>
    )
}



export default HeaderButton