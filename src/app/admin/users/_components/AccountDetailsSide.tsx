import React, { useEffect, useState } from 'react'
import DropDown from '../../_components/DropDown';

interface DetailProps {
    firstName: string;
    lastName: string;
    biography: string;
    email: string;
    password: string;
    onBillingClick: () => void;
    onSubsClick: () => void
}

const AccountDetailsSide: React.FC<DetailProps> = ({ firstName, lastName, biography, email, password, onBillingClick, onSubsClick }) => {

    const [moreOpen, setMoreOpen] = useState(false)

    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [bio, setBio] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")


    useEffect(() => {
        setFirst(firstName)
        setLast(lastName)
        setBio(biography)
        setMail(email)
        setPass(password)
    }, [])

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
                            className='input-field w-full'
                            value={first}
                            onChange={(event) => setFirst(event.target.value)}
                        />
                        <input
                            type="text"
                            className='input-field w-full'
                            value={last}
                            onChange={(event) => setLast(event.target.value)} />
                    </div>
                </label>
                <label htmlFor="biography" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Biography</p>
                    <input
                        type="text"
                        name='biography'
                        className='input-field w-full'
                        value={bio}
                        onChange={(event) => setBio(event.target.value)}
                    />
                </label>
                <label htmlFor="email" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Email</p>
                    <input
                        type="email"
                        name='email'
                        className='input-field w-full'
                        value={mail}
                        onChange={(event) => setMail(event.target.value)}
                    />
                </label>
                <label htmlFor="password" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Password</p>
                    <input
                        type="password"
                        name='password'
                        className='input-field w-full'
                        value={pass}
                        disabled
                        onChange={(event) => setPass(event.target.value)}
                    />
                </label>
            </div>

            <button className='bg-warningColor py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white'>Delete User</button>

        </div>
    )
}

export default AccountDetailsSide