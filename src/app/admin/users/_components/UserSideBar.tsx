import React, { useEffect, useState } from 'react'
import AccountDetailsSide from './AccountDetailsSide'
import BillingDetails from './BillingDetails'

import SubscriptionPlanSide from './SubscriptionPlanSide';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { addNewUser, deleteUser, handleProfileFileUpload, updateUser, updateUserImages } from '@/firebaseFunctions/admin/users';
import { setCurrentUser } from '@/redux/slices/adminSlice';
import { mockUser } from '@/constants/data';
import AddUserModal from './AddUserModal';
import Loader from '@/components/Loader';
import ImageModal from '@/components/modals/ImageModal';
import ImageConfirmModal from '@/app/dashboard/library/_components/ImageConfirmModal';

enum CardDisplay {
    userInfo, billingInfo, subscriptionInfo
}

const UserSideBar = () => {

    const user = useSelector((state: RootState) => state.adminReducer.currentUser)
    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)

    const dispatch = useDispatch()

    const [activeCard, setActiveCard] = useState(CardDisplay.userInfo)
    const [addUser, setAddUser] = useState(false)


    const [backgroundImageLoading, setBackgroundImageLoading] = useState(true);
    const [profileImageLoading, setProfileImageLoading] = useState(true);

    useEffect(() => {
        if (user?.background_pic) {
            setBackgroundImageLoading(true); // Set loading to true when a new image is selected
            const img = new Image();
            img.src = user.background_pic;
            img.onload = () => setBackgroundImageLoading(false);
            img.onerror = () => setBackgroundImageLoading(false); // Handle error case
        }
    }, [user?.background_pic]);

    useEffect(() => {
        if (user?.profile_pic) {
            setProfileImageLoading(true); // Set loading to true when a new image is selected
            const img = new Image();
            img.src = user.profile_pic;
            img.onload = () => setProfileImageLoading(false);
            img.onerror = () => setProfileImageLoading(false); // Handle error case
        }
    }, [user?.profile_pic]);

    // useEffect(() => {
    //     setAddUser(false)
    // }, [user])

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
        setShowImageModal(false);
        setSelectedImage(null);

        if (selectedFile && user?.user_id) {
            const image_link = await handleProfileFileUpload(selectedFile, user.user_id, isProfilePic);
            if (isProfilePic) {
                updateUserImages(user.user_id, image_link, user?.background_pic || "");
            } else {
                updateUserImages(user.user_id, user?.profile_pic || "", image_link);
            }
        }
        setSelectedFile(null);
    };

    const handleProfilePicClick = () => handleImageSelect(true);
    const handleBackgroundPicClick = () => handleImageSelect(false);


    return (
        <div className='flex flex-col gap-[20px] h-[80vh]'>
            <div className='flex gap-[15px]'>
                <button onClick={() => {
                    setAddUser(true)
                    setActiveCard(CardDisplay.userInfo)
                }} className='flex-1 shadow-normal bg-primaryColorLight text-white px-[25px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/add.svg" alt="" />
                    <p>Add New User</p>
                </button>
                <button className='flex-1 shadow-normal bg-white text-black px-[25px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/arrow-down-black.svg" alt="" />
                    <p>Download Report</p>
                </button>
            </div>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[13px] relative'>
                    <button onClick={handleBackgroundPicClick} className='w-full h-[150px] rounded-[10px] overflow-hidden shadow-normal group relative bg-accentColorLight'>
                        {backgroundImageLoading ? <div className='w-full h-full bg-accentColorLight flex justify-center items-center'>
                            <Loader />
                        </div> : <img src={user?.background_pic ? user.background_pic : ""} alt="" className='w-full h-full object-cover' />}
                        <div className='absolute p-[9px] bg-[#00000070] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                    <div>
                        <div className='flex justify-start items-center gap-[10px]'>
                            <p className='text-[16px] font-semibold text-black'>{user.first_name + " " + user.last_name}</p>
                            <img src="/assets/tick-circle-blue.svg" alt="" />
                        </div>
                        <p className='text-[14px] font-medium text-[#7A7B7C]'>{user.email}</p>
                    </div>
                    <button onClick={handleProfilePicClick} className='shadow-normal absolute right-[15px] bottom-0 border-white border-[4px] border-solid rounded-[20px] overflow-hidden group bg-accentColorLight'>
                        <div className='w-[120px] h-[120px] rounded-[18px]'>
                            {profileImageLoading ? <div className='w-full h-full bg-accentColorLight flex justify-center items-center'>
                                <Loader />
                            </div> : <img src={user?.profile_pic ? user.profile_pic : ""} alt="" className='object-cover w-full h-full' />}
                        </div>
                        <div className='absolute p-[9px] bg-[#00000070] bottom-[6px] right-[6px] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                </div>
                <div className='w-full h-[1px] border-borderColorLight border-[1px] border-solid'></div>
                <div className='flex-1'>
                    {
                        activeCard == CardDisplay.userInfo && <AccountDetailsSide
                            onAddClick={(user) => {

                            }}
                            onDeleteClick={() => {
                                if (!(confirm("Are you sure to delete this user?"))) {
                                    return
                                }
                                deleteUser(user.user_id)
                                dispatch(setCurrentUser(mockUser))
                            }}
                            onUpdateClick={(first, last, mail, bio) => {
                                updateUser(user.user_id, {
                                    first_name: first,
                                    last_name: last,
                                    email: mail,
                                    biography: bio
                                })

                            }}
                            onBillingClick={() => setActiveCard(CardDisplay.billingInfo)}
                            onSubsClick={() => setActiveCard(CardDisplay.subscriptionInfo)}
                            addUser={false}
                            user_id={user.user_id}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            biography={user.biography}
                            email={user.email}
                            password={user.password}
                        />
                    }
                    {
                        activeCard == CardDisplay.billingInfo && <BillingDetails
                            onBack={() => setActiveCard(CardDisplay.userInfo)}
                            user={user}
                        />
                    }
                    {
                        activeCard == CardDisplay.subscriptionInfo && <SubscriptionPlanSide user={user} onBack={() => setActiveCard(CardDisplay.userInfo)} />
                    }
                    {
                        addUser && <AddUserModal onCloseClick={() => setAddUser(false)} />
                    }
                    {
                        showImageModal && selectedImage && <ImageConfirmModal imageSelected={selectedImage} onClose={() => setShowImageModal(false)} onConfirm={handleImageConfirm} />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserSideBar