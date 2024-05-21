import React from 'react'

interface SelectProps {
    selected: boolean;
    onSelect: () => void;
    color?: string
}

const Select: React.FC<SelectProps> = ({ selected = false, color = "white", onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className='w-[24px] h-[24px] rounded-[7px] flex justify-center items-center'
            style={{ border: `2.5px solid ${color}` }}
        >
            {selected && (
                <img src={`/assets/tick-${color}.svg`} alt="" />
            )}
        </button>
    )
}

export default Select