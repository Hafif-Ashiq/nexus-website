import React from 'react'
import Logo from '../../../../public/assets/arrow-down.svg';

interface IconButtonProps {
    icon: string;
    onClick: () => void;
    filled?: boolean;
    disabled?: boolean;
}


const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, filled = false, disabled = false }) => {
    return (
        <button onClick={onClick} className=' p-[8px]  rounded-full flex justify-center items-center' style={{
            backgroundColor: filled ? "#2a4e8f" : "#EAEEF4",
            opacity: disabled ? 0.5 : 1,
        }}>
            <img src={icon} alt="" />
        </button>
    )
}



export default IconButton