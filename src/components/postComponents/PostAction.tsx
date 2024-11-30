import React from 'react'

interface PostActionInterface {
    icon: any,
    text?: string,

    primary?: boolean,
    onClick: () => void
}

const PostAction = ({ icon, text, primary, onClick }: PostActionInterface) => {
    return (
        <div className={`flex items-center gap-[5px] font-medium ${primary ? "text-primaryColorLight" : "text-black"}`}>
            <button onClick={onClick}>
                {icon}
            </button>
            {text && <span>{text}</span>}
        </div>
    )
}

export default PostAction