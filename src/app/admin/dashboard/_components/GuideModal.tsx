import React, { useState } from 'react'
import LargeButton from '../../_components/LargeButton'
import MediumButton from '../../_components/MediumButton'
import { title } from 'process'
import { addGuideToFirebase } from '@/firebaseFunctions/guide'

interface GuideModalProps {
    onCloseClick: () => void,

}

const GuideModal = ({ onCloseClick }: GuideModalProps) => {

    const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false)

    const [selectedFileType, setSelectedFileType] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    const [file, setFile] = useState<File | null>(null)


    const [status, setStatus] = useState<"Visible" | "Hidden">("Visible")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [errors, setErrors] = useState({
        title: false,
        description: false
    })

    const onImageClick = async () => {
        if (selectedFileType == "image") {
            return
        }
        try {
            // Open file picker
            const [fileHandle] = await (window as any).showOpenFilePicker({
                types: [
                    {
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.jpg', '.jpeg'],
                        },
                    },
                ],
            });

            const validExtensions = ['png', 'jpg', 'jpeg']
            // Get the selected file
            const file: File = await fileHandle.getFile();
            console.log(file);
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select an image file.');
                return
            }
            const imageUrl = URL.createObjectURL(file);

            setFile(file)
            setImageSrc(imageUrl);
            setSelectedFileType("image")

        }

        catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }


    const onVideoClick = async () => {
        if (selectedFileType == "video") {
            return
        }
        try {
            // Open file picker
            const [fileHandle] = await (window as any).showOpenFilePicker({
                types: [
                    {
                        description: 'Videos',
                        accept: {
                            'video/*': ['.mp4', '.mov', '.avi', '.webm'],
                        },
                    },
                ],
            });

            const validExtensions = ['mp4', 'mov', 'avi', 'webm'];
            // Get the selected file
            const file: File = await fileHandle.getFile();
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select a video file.');
                return;
            }

            // Create a URL for the video file and update state
            const videoUrl = URL.createObjectURL(file);
            setFile(file)
            setVideoSrc(videoUrl);
            setSelectedFileType("video")

        } catch (error) {
            console.error('Error selecting file:', error);
        }
    };


    const onCreateClick = () => {
        if (title == "" || description == "" || file == null) {
            alert("Fill in all the fields")
            return
        }

        setLoadingSuccess(true)
        addGuideToFirebase(file, file, {
            title: title,
            description: description,
            total_likes: 0,
            likedBy: [],
            viewedBy: [],
            is_visible: status == "Visible"
        }).then(res => {
            if (res) {
                alert("Created Guide Successfully")
            }
            else {
                alert("Error in creating Guide ")
            }
            setTitle("")
            setDescription("")
            setSelectedFileType("")
            setImageSrc("")
            setVideoSrc("")
            setStatus("Visible")
            setLoadingSuccess(false)
        })

    }


    return (

        <div className='absolute inset-0 bg-[#00000090] overflow-hidden flex justify-center items-center'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px] overflow-hidden flex flex-col'>

                {/* Top Div */}
                <div className='flex justify-between items-center pb-[20px]'>
                    <div className='text-[24px] font-semibold'>
                        Create Guide
                    </div>
                    {/* Cross */}
                    <button onClick={onCloseClick} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Bottom part */}
                <div className='flex justify-between items-stretch gap-[25px] flex-1 overflow-hidden'>
                    <div className='flex-1 py-[25px] flex flex-col gap-[30px] '>
                        {/* image/video */}
                        <div className='flex gap-[20px]'>
                            <MediumButton activeIcon='image-large-white' inActiveIcon='image-large-bluw' text='Image' active={selectedFileType == "image"} onClick={onImageClick} />
                            <MediumButton activeIcon='video-large-white' inActiveIcon='video-large-blue' text='Video' active={selectedFileType == "video"} onClick={onVideoClick} />
                        </div>
                        {/* guide details */}
                        <div>
                            <label htmlFor="title" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Title</p>
                                <input
                                    type="text"
                                    name='title'
                                    className={`input-field w-full`}
                                    style={{
                                        borderColor: errors.title ? '#B50202' : ""
                                    }}
                                    value={title}
                                    placeholder='Title'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Descrition</p>
                                <input
                                    type="text"
                                    name='description'
                                    className={`input-field w-full`}
                                    style={{
                                        borderColor: errors.description ? '#B50202' : ""
                                    }}
                                    value={description}
                                    placeholder='Description'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Descrition</p>
                                <select

                                    name='description'
                                    className={`input-field w-full `}
                                    style={{
                                        color: status == "Visible" ? "#2B9F03" : "#B50202"
                                    }}
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value == "Visible" ? e.target.value : "Hidden")}
                                >
                                    <option value={"Visible"} className='text-primaryColorLight font-semibold'>Visible</option>
                                    <option value={"Hidden"} className='text-primaryColorLight font-semibold'>Hidden</option>
                                </select>
                            </label>


                        </div>
                        <button
                            onClick={onCreateClick}
                            disabled={loadingSuccess}
                            className={`bg-primaryColorLight py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}
                        >
                            {loadingSuccess ? "Loading..." : "Create Guide"}

                        </button>
                    </div>
                    <div className='h-full w-[2px] bg-borderColor'></div>

                    <div className='flex-1 overflow-hidden my-[25px] h-full rounded-[15px] bg-accentColorLight'>
                        {
                            selectedFileType == "image" && imageSrc && <img src={imageSrc} alt="Selected" className='object-cover  h-full rounded-[15px]' />
                        }
                        {
                            selectedFileType == "video" && videoSrc && <video src={videoSrc} className='object-cover  h-full rounded-[15px]' />
                        }
                    </div>

                </div>


            </div>

        </div>
    )
}

export default GuideModal