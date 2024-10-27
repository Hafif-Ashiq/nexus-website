import React from 'react'
import Logo from '../../../../public/assets/arrow-down.svg';

interface IconButtonProps {
    icon: string;
    onClick: () => void;
    filled?: boolean;
    disabled?: boolean;
    opened?: boolean;
}


const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, filled = false, disabled = false, opened = false }) => {
    return (
        <button disabled={disabled} onClick={onClick} className=' p-[8px]  rounded-full flex justify-center items-center' style={{
            backgroundColor: filled ? "#2a4e8f" : opened ? "#EAEEF4" : "#ffffff",
            opacity: disabled ? 0.5 : 1,
            border: filled ? "none" : "3px solid #EAEEF4"
        }}>
            <img src={icon} alt="" />
        </button>
    )
}



export default IconButton