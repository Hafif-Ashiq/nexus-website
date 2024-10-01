import React, { useEffect, useState } from 'react'
import LargeButton from '../../_components/LargeButton'
import MediumButton from '../../_components/MediumButton'
import { title } from 'process'
import { addGuideToFirebase } from '@/firebaseFunctions/guide'
import { getCurrentTimeFormatted } from '@/utils/datetime'
import { UserProfile } from '@/services/UserInterface'
import { addNewUser, handleProfileFileUpload } from '@/firebaseFunctions/users'

interface GuideModalProps {
    onCloseClick: () => void,

}

const AddUserModal = ({ onCloseClick }: GuideModalProps) => {

    const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false)

    const [isProfileActive, setisProfileActive] = useState<boolean>(true)
    const [profileSrc, setProfileSrc] = useState<string | null>(null);
    const [coverSrc, setCoverSrc] = useState<string | null>(null);

    const [profileFile, setProfileFile] = useState<File | null>(null)
    const [coverFile, setCoverFile] = useState<File | null>(null)

    const [firebaseProfileSrc, setFirebaseProfileSrc] = useState<string>("");
    const [firebaseCoverSrc, setFirebaseCoverSrc] = useState<string>('');


    const [createEnabled, setCreateEnabled] = useState(false)

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        biography: "",
        password: ""
    })


    const [errors, setErrors] = useState({
        first: false,
        last: false,
        bio: false,
        password: false,
        mail: false
    })


    useEffect(() => {


        if (!
            (validateEmail(newUser.email) &&
                validateBio(newUser.biography) &&
                validateName(newUser.first_name) &&
                validateName(newUser.last_name) &&
                validatePassword(newUser.password) &&
                newUser.first_name !== "" &&
                newUser.last_name !== "" &&
                newUser.email !== "" &&
                newUser.biography !== "" &&
                newUser.password !== ""
            )
        ) {
            setCreateEnabled(false)
            return
        }
        setCreateEnabled(true)
    }, [newUser])

    const onImageClick = async () => {

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
            if (isProfileActive) {
                setProfileFile(file)
                setProfileSrc(imageUrl);
            }
            else {
                setCoverFile(file)
                setCoverSrc(imageUrl);
            }
            // setisProfileActive("image")

        }

        catch (error) {
            console.error('File selection was canceled or failed', error);
        }
    }




    const onCreateClick = async () => {
        setLoadingSuccess(true);

        try {
            // Upload profile and cover files if they exist
            const [profilePicUrl, coverPicUrl] = await Promise.all([
                profileFile ? handleProfileFileUpload(profileFile) : Promise.resolve(""), // Fallback to empty string if no file
                coverFile ? handleProfileFileUpload(coverFile) : Promise.resolve("") // Fallback to empty string if no file
            ]);

            // Set the uploaded URLs in the state
            setFirebaseProfileSrc(coverPicUrl);
            setFirebaseCoverSrc(profilePicUrl);

            // Create user object
            const user: UserProfile = {
                id: "",
                email: newUser.email,
                password: newUser.password,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                account_status: {
                    is_premium: false,
                    is_deactivated: false,
                },
                profile_pic: profilePicUrl, // Use uploaded profile pic URL
                background_pic: coverPicUrl, // Use uploaded cover pic URL
                biography: newUser.biography,
                app_customization: {
                    is_dark: false,
                    notification_settings: {
                        community_notis_enabled: true,
                        app_notis_enabled: true,
                    },
                },
                community: {
                    posts: [],
                    saved_posts: [],
                },
                guides: {
                    viewed_guides: [],
                },
            };

            // Add the new user to the database
            await addNewUser(user);

            // Reset states after successful creation
            setLoadingSuccess(false);
            setNewUser({
                first_name: "",
                last_name: "",
                email: "",
                biography: "",
                password: "",
            });
            setProfileFile(null);
            setProfileSrc("");
            setCoverFile(null);
            setCoverSrc("");

        } catch (error) {
            console.error("Error during user creation:", error);
            setLoadingSuccess(false);
        }
    };




    // Validation functions
    const validateName = (name: string) => /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name);
    const validateBio = (biography: string) => biography.length >= 10;
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) => password.length >= 8;

    // Handle changes and validation
    const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({ ...newUser, first_name: value });
        setErrors({ ...errors, first: validateName(value) ? false : true });
    };

    const handleLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({ ...newUser, last_name: value });

        setErrors({ ...errors, last: validateName(value) ? false : true });
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({ ...newUser, biography: value });

        setErrors({ ...errors, bio: validateBio(value) ? false : true });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({ ...newUser, email: value });

        setErrors({ ...errors, mail: validateEmail(value) ? false : true });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewUser({ ...newUser, password: value });

        setErrors({ ...errors, password: validatePassword(value) ? false : true });
    };


    return (

        <div className='absolute inset-0 bg-[#00000090] overflow-hidden flex justify-center items-center'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px] overflow-hidden flex flex-col'>

                {/* Top Div */}
                <div className='flex justify-between items-center pb-[20px]'>
                    <div className='text-[24px] font-semibold'>
                        Create User
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
                            <MediumButton
                                activeIcon='image-large-white'
                                inActiveIcon='image-large-bluw'
                                text='Cover Image'
                                active={isProfileActive}
                                onClick={() => setisProfileActive(true)} />
                            <MediumButton
                                activeIcon='image-large-white'
                                inActiveIcon='image-large-bluw'
                                text='Profile Image'
                                active={!isProfileActive}
                                onClick={() => setisProfileActive(false)} />
                        </div>
                        {/* guide details */}
                        <div className='flex flex-col items-stretch justify-between gap-[20px]'>
                            <label htmlFor="username" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Username</p>
                                <div className='flex justify-between gap-[10px]'>
                                    <input
                                        type="text"
                                        name='username'
                                        className={` input-field w-full`}
                                        style={{
                                            borderColor: errors.first ? '#B50202' : ""
                                        }}
                                        value={newUser.first_name}
                                        placeholder='First Name'
                                        onChange={handleFirstChange}
                                    />
                                    <input
                                        type="text"
                                        className={`input-field w-full`}
                                        value={newUser.last_name}
                                        style={{
                                            borderColor: errors.last ? '#B50202' : ""
                                        }}
                                        name="username2"
                                        placeholder='Last Name'
                                        onChange={handleLastChange}
                                    />
                                </div>
                            </label>
                            <label htmlFor="email" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Email</p>
                                <input
                                    type="email"
                                    name='email'
                                    className={`input-field w-full`}
                                    style={{
                                        borderColor: errors.mail ? '#B50202' : ""
                                    }}
                                    value={newUser.email}
                                    placeholder='Email'
                                    onChange={handleEmailChange}
                                />
                            </label>
                            <label htmlFor="biography" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Biography</p>
                                <input
                                    type="text"
                                    name='biography'
                                    className={`input-field w-full`}
                                    style={{
                                        borderColor: errors.bio ? '#B50202' : ""
                                    }}
                                    value={newUser.biography}
                                    placeholder='Biography'
                                    onChange={handleBioChange}
                                />
                            </label>
                            <label htmlFor="pass" className='flex flex-col gap-[10px]'>
                                <p className='text-[16px] font-bold text-primaryColorLight'>Password</p>
                                <input
                                    type="password"
                                    name='pass'
                                    className={`input-field w-full`}
                                    style={{
                                        borderColor: errors.password ? '#B50202' : ""
                                    }}
                                    value={newUser.password}
                                    placeholder='Password   '
                                    onChange={handlePasswordChange}
                                />
                            </label>



                        </div>
                        <button
                            onClick={onCreateClick}
                            disabled={loadingSuccess || !createEnabled}
                            className={`bg-primaryColorLight py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}
                        >
                            {loadingSuccess ? "Loading..." : "Create User"}

                        </button>
                    </div>
                    <div className='h-full w-[2px] bg-borderColor'></div>

                    <div className='flex-1 overflow-hidden my-[25px] h-full rounded-[15px] bg-accentColorLight flex justify-center items-center'>
                        {
                            isProfileActive && profileSrc && <img src={profileSrc} alt="Selected" className='object-cover  h-full rounded-[15px]' />
                        }
                        {
                            !isProfileActive && coverSrc && <img src={coverSrc} alt="Selected" className='object-cover  rounded-[15px]' />
                        }
                        {
                            (!profileSrc && isProfileActive) || (!isProfileActive && !coverSrc) ? <button onClick={onImageClick}>
                                <img src="/assets/add-circle.svg" alt="" />
                            </button> : <></>

                        }


                    </div>

                </div>


            </div>

        </div>
    )
}

export default AddUserModal