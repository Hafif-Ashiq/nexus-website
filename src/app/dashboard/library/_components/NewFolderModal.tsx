import React, { useState } from 'react'

import { createFolder } from '@/firebaseFunctions/user/folder'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { folderIcons } from '@/constants/data'


const NewFolderModal = ({ onCloseClick }: { onCloseClick: () => void }) => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [folderName, setFolderName] = useState("")
    const [folderIcon, setFolderIcon] = useState(0)

    const handleCreateFolder = async () => {
        const folderId = await createFolder(userId, { title: folderName, icon: folderIcon })
        onCloseClick()
    }




    const CurrentFolder = () => {
        const CurrentFolderIcon = folderIcons[folderIcon].component
        return <CurrentFolderIcon style={{
            color: "#2a4e8f",
            width: "100px",
            height: "100px"
        }} />
    }


    return (
        <div className='absolute inset-0 bg-[#00000090] overflow-hidden flex justify-center items-center'>
            <div className='w-[900px] h-[450px] bg-white py-[25px] rounded-[25px] overflow-hidden flex flex-col gap-[20px]'>
                {/* Top Div */}
                <div className='flex justify-between items-center px-[20px]'>
                    <div className='text-[24px] font-semibold'>
                        Create Folder
                    </div>
                    {/* Cross */}
                    <button onClick={onCloseClick} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>
                <div className='flex flex-1  gap-[20px] px-[20px]'>
                    <div className='flex flex-1 flex-col gap-[15px] justify-between'>

                        <input
                            type="text"
                            name='folderName'
                            className={`input-field w-full placeholder:text-primaryColorLight`}
                            value={folderName}
                            placeholder='Folder Name'
                            onChange={(e) => setFolderName(e.target.value)}
                        />

                        <div className='flex flex-wrap gap-[15px] justify-between items-center'>
                            {folderIcons.map((icon, index) => (
                                <button onClick={() => setFolderIcon(index)} key={index} className={`w-[50px] h-[50px] rounded-full border-borderColor border-[2px] border-solid flex justify-center items-center ${folderIcon === index ? "bg-primaryColorLight" : "bg-accentColorLight"}`}>
                                    <icon.component style={{
                                        color: folderIcon === index ? "#fff" : "#2a4e8f",
                                        width: "24px",
                                        height: "24px"
                                    }} />
                                </button >
                            ))}
                        </div>

                    </div>
                    <div className='flex flex-col flex-1 gap-[15px] justify-center bg-accentColorLight'>
                        <div className='flex justify-center items-center '>
                            <CurrentFolder />
                        </div>
                        <span className='text-[20px] font-medium text-center '>
                            {folderName ? folderName : "Folder Name"}
                        </span>
                    </div>
                </div>
                <div className='w-full h-[2px] bg-borderColor'></div>

                <div className='flex justify-end items-center gap-[15px] px-[20px] pb-[20px]'>
                    <button onClick={onCloseClick} className='flex-1 border-borderColor border-[3px] border-solid  px-[20px] py-[10px] rounded-[15px] font-semibold text-[16px] text-primaryColorLight hover:border-primaryColorLight transition-all duration-300'>
                        Cancel
                    </button>
                    <button onClick={handleCreateFolder} className='flex-1 bg-primaryColorLight text-white px-[20px] py-[10px] rounded-[15px] font-semibold text-[16px]'>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewFolderModal