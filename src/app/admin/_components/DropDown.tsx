import React from 'react'


interface DropDownProps {
    actions: {
        title: string,
        onClick: () => void;
    }[]
}

const DropDown: React.FC<DropDownProps> = ({ actions }) => {
    return (
        <div className='absolute top-[25px] right-0 bg-accentColorLight shadow-2xl rounded-[10px] flex flex-col justify-between items-center gap-[15px] py-[15px] w-[250px] z-10'>
            {actions.map((act, index) => (
                <>
                    <button key={index} onClick={act.onClick} className='text-[18px] font-medium hover:text-primaryColorLight '>{act.title}</button>
                    {
                        index !== actions.length - 1 && <div key={index} className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                    }
                </>
            ))}

        </div>
    )
}

export default DropDown