import React from 'react'


interface DropDownProps {
    actions: {
        title: string,
        onClick: () => void;
    }[]
}

const DropDown: React.FC<DropDownProps> = ({ actions }) => {
    return (
        <div className='absolute top-[25px] right-0 bg-accentColorLight shadow-2xl rounded-[10px] flex flex-col justify-between items-center   w-[250px] z-10 overflow-hidden'>
            {actions.map((act, index) => (
                <>
                    <button key={index} onClick={act.onClick} className='py-[15px] text-[18px] w-full font-medium hover:bg-primaryColorLight hover:text-white'>{act.title}</button>
                    {
                        index !== actions.length - 1 && <div key={index} className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                    }
                </>
            ))}

        </div>
    )
}

export default DropDown