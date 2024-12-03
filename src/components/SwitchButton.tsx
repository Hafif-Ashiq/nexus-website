import React, { useState } from 'react';

interface ToggleSwitchProps {
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

const SwitchButton: React.FC<ToggleSwitchProps> = ({ initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    return (
        <label className="relative inline-block w-10 h-6 cursor-pointer">
            <input
                type="checkbox"
                className="hidden peer"
                checked={isChecked}
                onChange={handleToggle}
            />
            <div
                className={`absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full shadow-inner transition-colors
                    duration-300 ease-in-out ${isChecked ? 'bg-green-500' : ''}`}
            ></div>
            <div
                className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
                    ease-in-out ${isChecked ? 'translate-x-4' : ''}`}
            ></div>
        </label>
    );
};

export default SwitchButton;