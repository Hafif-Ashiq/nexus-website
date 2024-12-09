import DropDown from '@/app/admin/_components/DropDown'
import HeaderButton from '@/components/HeaderButton'
import IconButton from '@/components/IconButton'
import AudioModal from '@/components/modals/AudioModal'
import ImageModal from '@/components/modals/ImageModal'
import VideoModal from '@/components/modals/VideoModal'
import { updateContent } from '@/firebaseFunctions/user/content'
import { listenToUserFolders } from '@/firebaseFunctions/user/folder'
import { setAllFolders } from '@/redux/slices/librarySlice'
import { RootState } from '@/redux/store'
import { ContentInterface } from '@/services/ContentInterface'
import { FolderInterface } from '@/services/FoldersInterface'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { uploadThumbnail, updateThumbnailURL } from '@/firebaseFunctions/user/contentFunctions/updateThumbnail'
import ImageConfirmModal from '@/app/dashboard/library/_components/ImageConfirmModal'
import Loader from '@/components/Loader'
import { deleteContent } from '@/firebaseFunctions/user/contentFunctions/deleteContent'
import { useRouter } from 'next/navigation'
interface ContentSideBarProps {
    content: ContentInterface,
}

const ContentSideBar = ({ content }: ContentSideBarProps) => {
    const router = useRouter()
    const [title, setTitle] = useState<string>("")
    const [folder, setFolder] = useState<string>("None")
    const [tagInput, setTagInput] = useState<string>("")
    const [changed, setChanged] = useState(false)

    const dispatch = useDispatch()

    const folders = useSelector((state: RootState) => state.libraryReducer.allFolders)

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [showModal, setShowModal] = useState<"audio" | "image" | "video" | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null)
    const [confirmImage, setConfirmImage] = useState<File | null>(null);
    const [thumbnailLoading, setThumbnailLoading] = useState(false)

    const [optionsOpen, setOptionsOpen] = useState(false)


    useEffect(() => {
        if (folders.length == 0) {
            listenToUserFolders(userId, (folders) => dispatch(setAllFolders(folders)))
        }
        setTitle(content.title)
        setFolder(content.folder_id)
    }, [])

    useEffect(() => {
        if (title !== content.title || folder !== content.folder_id) {
            setChanged(true)
        }
        else {
            setChanged(false)
        }
    }, [title, folder, content.title, content.folder_id])


    const deleteContentFromFirebase = () => {
        if (confirm("Are you sure you want to delete this content?")) {
            setOptionsOpen(false)
            deleteContent(userId, content.content_id).then(() => {

                router.push("/dashboard/library")
            })
        }
    }

    const updateCurrentContent = () => {
        const updates: {
            title?: string,
            folder_id?: string,

        } = {}
        if (title !== content.title)
            updates["title"] = title
        if (folder !== content.folder_id)
            updates["folder_id"] = folder


        updateContent(userId, content.content_id, updates).then(res => {
            alert("Updated Content")
        })

    }

    const addContentTag = () => {
        if (tagInput == "")
            return

        const updates = {
            tags: [...content.tags, tagInput]
        }

        updateContent(userId, content.content_id, updates)
        setTagInput("")
    }

    const deleteContentTag = (tag: number) => {
        const newTags = content.tags.filter((_, index) => index !== tag)
        const updates = {
            tags: newTags
        }

        updateContent(userId, content.content_id, updates)
    }

    const assetIcons = {
        "document": "/assets/contentTypes/document-white.svg",
        "image": "/assets/contentTypes/image-white.svg",
        "video": "/assets/contentTypes/video-white.svg",
        "audio": "/assets/contentTypes/audio-white.svg",
    }

    const handleViewContent = () => {
        if (content.type == "document") {
            window.open(content.link, "_blank")
        }
        else if (content.type == "image") {
            setShowModal("image")
        }
        else if (content.type == "video") {
            setShowModal("video")
        }
        else if (content.type == "audio") {
            setShowModal("audio")
        }
    }


    const uploadThumbnailImage = async () => {
        setOptionsOpen(false)
        try {
            // Open file picker for thumbnail upload
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

            const validExtensions = ['png', 'jpg', 'jpeg'];
            // Get the selected file
            const file: File = await fileHandle.getFile();
            console.log(file);
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select an image file.');
                return;
            }

            // Show confirmation modal with the selected image
            const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
            setConfirmImage(file); // Set the file to confirm upload
            setShowConfirmModal(imageUrl); // Set the image URL for the modal
        } catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }

    const handleConfirmUpload = async () => {
        if (confirmImage) {
            setThumbnailLoading(true)
            // Upload the thumbnail
            const thumbnailURL = await uploadThumbnail(userId, content.content_id, confirmImage);
            setConfirmImage(null); // Reset the confirmation state
            setShowConfirmModal(null); // Close the modal
            await updateThumbnailURL(userId, content.content_id, thumbnailURL);
            setThumbnailLoading(false)

        }
    }

    const dropDownActions = [
        {
            title: "Edit Thumbnail",
            onClick: uploadThumbnailImage
        },
        {
            title: "Delete Content",
            onClick: deleteContentFromFirebase
        }
    ]

    return (
        <div className='basis-[30%] bg-white rounded-2xl'>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>

                <div className='relative overflow-hidden min-h-[200px] rounded-[15px] w-full flex justify-end items-end p-[10px]'>
                    {/* View  */}
                    <div className='absolute inset-0 w-full h-full flex justify-center items-center object-cover'>
                        {thumbnailLoading ? <Loader /> : <img className='object-cover w-full h-full' src={content.thumbnail} alt="background-content" />}
                    </div>
                    <button onClick={handleViewContent} className='relative text-[16px] font-semibold text-white bg-black/50 p-[10px] rounded-[10px] w-full flex justify-between items-center'>
                        <span>View {content.type}</span>
                        <img src={assetIcons[content.type]} alt="arrow-up" />
                    </button>
                    {showModal == "image" && <ImageModal imageSelected={content.link} onClose={() => setShowModal(null)} />}
                    {showModal == "video" && <VideoModal videoSelected={content.link} onClose={() => setShowModal(null)} />}
                    {showModal == "audio" && <AudioModal audioSelected={content.link} onClose={() => setShowModal(null)} />}
                </div>

                <div className='flex-1 flex flex-col gap-[20px]'>
                    <div className='flex justify-between items-center'>
                        <span className='text-[20px] font-bold text-black'>Edit Details</span>
                        <div className='flex items-center gap-[10px] relative'>
                            <button onClick={() => setOptionsOpen(!optionsOpen)}>
                                <img src="/assets/more-circle.svg" alt="edit icon" />
                            </button>
                            {optionsOpen && <DropDown actions={dropDownActions} />}
                        </div>
                    </div>
                    <label htmlFor="title" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Content Title</p>
                        <input
                            type="text"
                            name='title'
                            className='input-field w-full'
                            value={title}
                            placeholder='Content'
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </label>
                    <label htmlFor="folderSelected" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Folder Selected</p>
                        <select

                            name='folderSelected'
                            className={`input-field w-full `}
                            style={{
                                opacity: content?.folder_id == "None" ? "50%" : "100%"
                            }}
                            value={folder}
                            onChange={(e) => { setFolder(e.target.value) }}
                        >
                            <option value={"None"} className='text-primaryColorLight font-semibold opacity-50'>Select Folder</option>
                            {
                                folders.map(fol => (
                                    <option key={fol.folder_id} value={fol.folder_id} className='text-primaryColorLight font-semibold'>{fol.title}</option>
                                ))
                            }
                            {/* {folders} */}
                        </select>
                    </label>
                    <div className='flex flex-col items-stretch gap-[15px]'>
                        <label htmlFor="title" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Content Tags</p>
                            <div className='flex justify-between items-center gap-[10px]'>
                                <input
                                    type="text"
                                    name='title'
                                    className='input-field w-full '
                                    value={tagInput}
                                    placeholder='Add a new Tag'
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            addContentTag()
                                        }
                                    }}
                                />
                                <IconButton icon='/assets/arrow-up-white.svg' disabled={tagInput == ""} filled
                                    onClick={addContentTag} />
                            </div>
                        </label>
                        <div className='flex flex-wrap gap-[7px] '>
                            {content.tags.map((tag, index) => (
                                <button key={index} onClick={() => deleteContentTag(index)} className='flex bg-accentColorLight p-[10px] text-primaryColorLight font-medium rounded-[10px]'>
                                    <img src="/assets/add-blue.svg" alt="" className='rotate-45' />
                                    <span>
                                        {tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <button

                        onClick={changed ? updateCurrentContent : deleteContentFromFirebase}
                        className={`${changed ? "bg-primaryColorLight" : "bg-warningColor"} py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}>
                        {changed ? "Update Content" : "Delete Content"}
                    </button>
                </div>


            </div>
            {showConfirmModal && (
                <ImageConfirmModal
                    imageSelected={showConfirmModal}
                    onClose={() => setShowConfirmModal(null)}
                    onConfirm={handleConfirmUpload}
                />
            )}
        </div>
    )
}

export default ContentSideBar