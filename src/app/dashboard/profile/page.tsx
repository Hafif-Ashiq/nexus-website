'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PostsSection from '@/components/postComponents/PostsSection'
import CreatePost from '../community/_components/CreatePost'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { listenToPosts } from '@/firebaseFunctions/user/postFunctions/getPosts'
import { PostInterface } from '@/services/PostInterface'
import { setUser } from '@/redux/slices/userSlice'
import { getUserData } from '@/firebaseFunctions/user/userFunctions'
import Loader from '@/components/Loader'
import ImageConfirmModal from '../library/_components/ImageConfirmModal'
import { handleProfileFileUpload, updateUserImages } from '@/firebaseFunctions/admin/users'
// import ImageConfirmModal from '@/components/ImageConfirmModal'

const page = () => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const user = useSelector((state: RootState) => state.userReducer.user)

    // useEffect(() => {
    //     if (!user) {
    //         getUserData(userId).then((user) => {
    //             dispatch(setUser(user))
    //         })
    //     }
    // }, [userId])

    // if (!user) {

    //     return <div className='flex justify-center items-center h-screen'>
    //         <Loader />
    //     </div>
    // }

    const [posts, setPosts] = useState<PostInterface[]>([])
    const [loadingPosts, setLoadingPosts] = useState(true);

    const [postLimit, setPostLimit] = useState(10);

    const router = useRouter()
    const dispatch = useDispatch()

    const content = useSelector((state: RootState) => state.libraryReducer.allContent)

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isProfilePic, setIsProfilePic] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSelect = async (isProfile: boolean) => {
        try {
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

            const file: File = await fileHandle.getFile();
            const validExtensions = ['png', 'jpg', 'jpeg'];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                alert('Invalid file type selected. Please select an image file.');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setSelectedImage(imageUrl);
            setIsProfilePic(isProfile);
            setShowImageModal(true);
        } catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    };

    const handleImageConfirm = async () => {
        // Handle the image upload here
        console.log("Confirmed image:", selectedFile);
        setShowImageModal(false);
        setSelectedImage(null);
        setSelectedFile(null);
        if (selectedFile) {
            const image_link = await handleProfileFileUpload(selectedFile, userId, isProfilePic)
            if (isProfilePic) {
                updateUserImages(userId, image_link, user?.background_pic || "")
            } else {
                updateUserImages(userId, user?.profile_pic || "", image_link)
            }
        }

    };

    // Update the click handlers
    const handleProfilePicClick = () => handleImageSelect(true);
    const handleBackgroundPicClick = () => handleImageSelect(false);

    useEffect(() => {
        listenToPosts((newPosts) => {
            setPosts(newPosts);
            setLoadingPosts(false);
        }, postLimit, undefined, true, userId);
    }, [userId, dispatch])

    const loadMorePosts = () => {
        setLoadingPosts(true);
        console.log("more posts loading");

        if (posts.length < postLimit) {
            console.log("No more posts to load");
            setLoadingPosts(false);
            return;
        }

        setPostLimit(prevLimit => prevLimit + 10);
    }

    return (
        <div className='flex flex-col gap-[40px]'>

            <Header title='Profile' subtitle='Manage your profile and settings' />

            {/* top div */}
            <div className='w-[70%] flex flex-col gap-[20px]  rounded-[15px] '>
                <div className='flex flex-col gap-[20px] bg-white rounded-[15px] pb-[20px]'>
                    <div className='flex flex-col gap-[13px] relative'>
                        <button onClick={handleBackgroundPicClick} className='w-full h-[180px] rounded-t-[10px] overflow-hidden shadow-normal group relative bg-accentColorLight'>
                            <img src={user?.background_pic} alt="" className='w-full h-full object-cover' />
                            <div className='absolute p-[9px] bg-[#00000070] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full hidden group-hover:block'>
                                <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                            </div>
                        </button>
                        <button onClick={handleProfilePicClick} className='shadow-normal absolute left-[15px] top-[70%] border-white border-[4px] border-solid rounded-[20px] overflow-hidden group'>
                            <div className='w-[120px] h-[120px] rounded-[18px] bg-accentColorLight'>
                                <img src={user?.profile_pic} alt="" className='object-cover w-full h-full' />
                            </div>
                            <div className='absolute p-[9px] bg-[#00000070] bottom-[6px] right-[6px] rounded-full hidden group-hover:block'>
                                <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                            </div>
                        </button>


                    </div>
                    <div className='flex flex-col gap-[10px] mt-[70px] px-[20px]'>
                        <div className='flex flex-col gap-[10px]'>
                            <div className='flex items-center gap-[10px]'>
                                <p className='text-[24px] font-semibold text-black'>{user?.first_name + " " + user?.last_name}</p>
                                <img src="/assets/tick-circle-blue.svg" alt="" />
                            </div>
                            <p className='text-[16px] font-medium text-gray-500'>{user?.biography}</p>
                            <div className='flex items-center gap-[15px] text-[14px] font-medium text-gray-500'>
                                <p>{user?.email}</p>
                                <div className='w-[4px] h-[4px] rounded-full bg-gray-500'></div>
                                <p>Joined {user?.start_date ? new Date(user?.start_date).toLocaleDateString() : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <CreatePost userImage='/admin-image.jpg' />

                {/* Posts */}
                <div className='py-[20px] rounded-[15px] flex flex-col gap-[20px]'>
                    <PostsSection posts={posts} loading={loadingPosts} onLoadMore={loadMorePosts} isOwner={true} />

                </div>

            </div>

            {/* Add the modal */}
            {showImageModal && (
                <ImageConfirmModal
                    imageSelected={selectedImage || undefined}
                    onClose={() => setShowImageModal(false)}
                    onConfirm={handleImageConfirm}
                />
            )}

        </div>
    )
}

export default page