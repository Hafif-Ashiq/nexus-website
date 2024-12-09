import React from 'react'


interface LargeButtonProps {
    activeIcon: string;
    inActiveIcon: string;
    text: string;
    onClick: () => void;
    active?: boolean;
    increase?: boolean;
    change?: string;
    title?: string;
    styles?: string;
    disabled?: boolean;
}


const LargeButton: React.FC<LargeButtonProps> = ({ activeIcon, inActiveIcon, text, onClick, active = false, increase = false, change = "", title, styles, disabled = false }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`shadow-normal flex flex-col justify-start gap-[10px] p-[20px] h-[155px] ${active ? "text-white bg-primaryColorLight" : "bg-white"} rounded-[15px] w-full ${styles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} >
            <div className='w-full flex justify-between items-center'>
                <img src={`/assets/${active ? activeIcon : inActiveIcon}.svg`} alt="" className='w-[38px] h-[38px] fill-white' />
                <div className='flex justify-end items-center gap-[5px]'>{
                    change !== "" ?
                        (<>
                            <img src={`/assets/${increase ? "green-arrow-up" : "red-arrow-down"}.svg`} alt="" />
                            <p className='text-[14px] font-medium' style={{ color: increase ? "#04CE00" : "#FF0707" }}>{change}</p>
                        </>)
                        :
                        (<></>)
                }</div>
            </div>
            <div className='flex flex-col text-left'>
                {title ? <p className='font-medium text-[16px]' style={{ color: active ? "#FFFFFF50" : "#2A4E8F50" }}>{title}</p> : <></>}
                <p className='w-[130px] text-left font-semibold text-[24px]'>{text}</p>
            </div>
        </button>
    )
}



export default LargeButton