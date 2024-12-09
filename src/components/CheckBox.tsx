import React from 'react';

interface CheckBoxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked = false, onChange }) => {
    return (
        <div className="relative inline-block w-[30px] h-[30px] group">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked)}
                className="absolute w-full h-full left-0 top-0 m-0 opacity-0 cursor-pointer appearance-none"
            />
            <svg viewBox="0 0 35.6 35.6" className="pointer-events-none">
                <circle
                    className={`${checked ? 'fill-primaryColorLight' : 'fill-white'} transition-all duration-600  shadow-md `}
                    cx="17.8"
                    cy="17.8"
                    r="17.8"
                />
                <circle
                    className={`fill-none  stroke-[2] ${checked ? 'stroke-dashoffset-0 stroke-white' : 'stroke-primaryColorLight stroke-dashoffset-[100]'} stroke-dasharray-[100] transition-all duration-600`}
                    cx="17.8"
                    cy="17.8"
                    r="14.37"
                />
                <polyline
                    className={`fill-none stroke-white stroke-[2] stroke-linecap-round stroke-linejoin-round ${checked ? 'stroke-dashoffset-0' : 'stroke-dashoffset-[22]'} stroke-dasharray-[22] transition-all duration-600 group-hover:stroke-dashoffset-0`}
                    points="11.78 18.12 15.55 22.23 25.17 12.87"
                />
            </svg>
        </div>
    );
};

export default CheckBox;
