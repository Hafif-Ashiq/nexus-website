import React, { useEffect, useState } from 'react'
import DropDown from '../../_components/DropDown';
import { UserProfile } from '@/services/UserInterface';

interface DetailProps {
    addUser?: boolean;
    firstName: string;
    lastName: string;
    biography: string;
    email: string;
    password: string;
    user_id: string;
    onBillingClick: () => void;
    onSubsClick: () => void;
    onAddClick: (user: UserProfile) => void;
    onDeleteClick: () => void;
    onUpdateClick: (first: string, last: string, mail: string, bio: string) => void;
}

const AccountDetailsSide: React.FC<DetailProps> = ({ user_id, firstName, lastName, biography, email, password, onBillingClick, onSubsClick, addUser = false, onAddClick, onDeleteClick, onUpdateClick }) => {

    const [moreOpen, setMoreOpen] = useState(false)

    const [first, setFirst] = useState<string>("")
    const [last, setLast] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [updateShow, setUpdateShow] = useState<boolean>(false)
    const [updateEnabled, setUpdateEnabled] = useState<boolean>(false)


    useEffect(() => {
        if (!addUser) {
            setFirst(firstName)
            setLast(lastName)
            setBio(biography)
            setMail(email)
            setPass(password)
        }
        else {
            setFirst("")
            setLast("")
            setMail("")
            setBio("")
            setPass("")
        }
    }, [addUser, firstName, lastName, biography, email, password])


    useEffect(() => {
        if (
            first == firstName &&
            last == lastName &&
            bio == biography &&
            email == mail
        ) {
            setUpdateShow(false)
            return
        }

        setUpdateShow(true)
        if (!
            (validateEmail(mail) &&
                validateBio(bio) &&
                validateName(first) &&
                validateName(last) &&
                first !== "" &&
                last !== "" &&
                mail !== "" &&
                bio !== "")
        ) {
            setUpdateEnabled(false)
            return
        }
        setUpdateEnabled(true)

    }, [first, last, mail, bio])


    const addUserClicked = () => {

        if (!validateName(first) && !validateName(last) && !validateEmail(mail) && !validateBio(bio) && !validatePassword(pass)) {
            alert("Invalid information")
            return
        }

        const user: UserProfile = {
            user_id: "",
            email: mail,
            password: pass,
            first_name: first,
            last_name: last,
            account_status: {
                is_premium: false,
                is_deactivated: false
            },
            profile_pic: "",
            background_pic: "",
            biography: bio,
            app_customization: {
                is_dark: false,
                notification_settings: {
                    community_notis_enabled: true,
                    app_notis_enabled: true
                }
            },
            community: {
                posts: [],
                saved_posts: []
            },
            guides: {
                viewed_guides: []
            },
            start_date: new Date().toISOString(),
            last_payment_date: new Date().toISOString(),
            subscription_plan: "Free",
            billing_infos: []
        }
        onAddClick(user)
        setFirst("")
        setLast("")
        setMail("")
        setBio("")
        setPass("")
    }

    const dropDownActions = [
        {
            title: "Billing Information",
            onClick: onBillingClick
        },
        {
            title: "Subscription Info",
            onClick: onSubsClick
        },
    ]


    const [errors, setErrors] = useState({
        first: '',
        last: '',
        bio: '',
        mail: '',
        pass: ''
    });

    // Validation functions
    const validateName = (name: string) => /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name);
    const validateBio = (biography: string) => biography.length >= 10;
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) => password.length >= 8;

    // Handle changes and validation
    const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFirst(value);
        setErrors({ ...errors, first: validateName(value) ? '' : 'Invalid first name' });
    };

    const handleLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLast(value);
        setErrors({ ...errors, last: validateName(value) ? '' : 'Invalid last name' });
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBio(value);
        setErrors({ ...errors, bio: validateBio(value) ? '' : 'Biography should be at least 10 characters' });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMail(value);
        setErrors({ ...errors, mail: validateEmail(value) ? '' : 'Invalid email address' });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPass(value);
        setErrors({ ...errors, pass: validatePassword(value) ? '' : 'Password must be at least 8 characters' });
    };


    const isError = () => {
        if (errors.first || errors.last || errors.mail || errors.bio || errors.pass)
            return true

        if (!validateName(first) && !validateName(last) && !validateEmail(mail) && !validateBio(bio) && !validatePassword(pass))
            return true
        return false
    }

    return (
        <div className='flex flex-col gap-[10px] h-full justify-between box-content'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-semibold text-black'>Account Details</h3>
                <div className='flex items-center justify-end gap-[20px] relative'>
                    <button>
                        <img src="/assets/support.svg" alt="" />
                    </button>
                    <button onClick={() => setMoreOpen(!moreOpen)}>
                        <img src="/assets/more-circle.svg" alt="" />
                    </button>
                    {moreOpen && <DropDown actions={dropDownActions} />}
                </div>
            </div>
            <div className='flex flex-col gap-[14px] '>
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
                            value={first}
                            placeholder='First Name'
                            onChange={handleFirstChange}
                        />
                        <input
                            type="text"
                            className={`input-field w-full`}
                            value={last}
                            style={{
                                borderColor: errors.last ? '#B50202' : ""
                            }}
                            name="username2"
                            placeholder='Last Name'
                            onChange={handleLastChange}
                        />
                    </div>
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
                        value={bio}
                        placeholder='About'
                        onChange={handleBioChange}
                    />
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
                        value={mail}
                        placeholder='email@gmail.com'
                        onChange={handleEmailChange}
                    />

                </label>

                <label htmlFor="password" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Password</p>
                    <input
                        type="password"
                        name='password'
                        className={`input-field w-full `}
                        style={{
                            borderColor: errors.pass ? '#B50202' : ""
                        }}
                        value={pass}
                        placeholder='*********'
                        disabled={true}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>

            <button
                disabled={(user_id == "Bd4umkyLqOLnMpdOLZ0E") || isError() || (updateShow && !updateEnabled)}
                onClick={updateShow ? () => {
                    onUpdateClick(first, last, email, bio)
                    setUpdateShow(false)
                    setUpdateEnabled(false)
                } : onDeleteClick}
                className={`${updateShow ? "bg-primaryColorLight" : "bg-warningColor"} py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}>
                {updateShow ? "Update User" : "Delete User"}
            </button>

            {/* Add User Modal */}

        </div>
    )
}

export default AccountDetailsSide