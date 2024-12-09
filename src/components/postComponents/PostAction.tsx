import React from 'react'

interface PostActionInterface {
    icon: any,
    text?: string,

    primary?: boolean,
    onClick: () => void,
    disabled?: boolean
}

const PostAction = ({ icon, text, primary, onClick, disabled }: PostActionInterface) => {
    return (
        <div className={`flex items-center gap-[5px] font-medium ${primary ? "text-primaryColorLight" : "text-black"} ${disabled ? "opacity-50" : ""}`}>
            <button onClick={onClick} disabled={disabled}>
                {icon}
            </button>
            {text && <span>{text}</span>}
        </div>
    )
}

export default PostAction