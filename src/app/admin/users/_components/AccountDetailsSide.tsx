import React, { useEffect, useState } from 'react'

interface DetailProps {
    firstName: string;
    lastName: string;
    biography: string;
    email: string;
    password: string
}

const AccountDetailsSide: React.FC<DetailProps> = ({ firstName, lastName, biography, email, password }) => {
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

    return (
        <div className='flex flex-col gap-[10px] h-full justify-between'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[20px] font-semibold text-black'>Account Details</h3>
                <div className='flex items-center justify-end gap-[20px]'>
                    <button>
                        <img src="/assets/support.svg" alt="" />
                    </button>
                    <button>
                        <img src="/assets/more-circle.svg" alt="" />
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-[10px] '>
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