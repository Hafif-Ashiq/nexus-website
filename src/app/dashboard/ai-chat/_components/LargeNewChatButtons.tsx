import React from 'react'

interface LargeNewChatButtonProps {

    title: string;
    text: string;
    onClick: () => void;
    styles?: string;
}

const LargeNewChatButton: React.FC<LargeNewChatButtonProps> = ({ title, text, onClick, styles }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col justify-start gap-[10px] p-[20px] bg-accentColorLight rounded-[15px] w-full ${styles}`}
        >
            <div className='w-full flex items-center'>
                <img src={`/assets/sparkle-blue.svg`} alt="" className='w-[38px] h-[38px]' />
            </div>
            <div className='flex flex-col text-left'>
                <p className='text-left font-semibold text-[24px] text-black'>{title}</p>
                <p className='font-medium text-[16px] text-gray-500'>{text}</p>
            </div>
        </button>
    )
}

export default LargeNewChatButton

