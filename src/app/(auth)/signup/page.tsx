'use client'

import { useState } from 'react'
import { auth, googleProvider, db } from '@/services/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, UserProfile, UserCredential, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { addNewUser } from '@/firebaseFunctions/admin/users'
import { getInitialUserProfile } from '@/utils/auth'
import Carousel from '../_components/Carousel'

const SignupPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
        confirmPassword: false
    })
    const [isLoading, setIsLoading] = useState({
        email: false,
        google: false
    })

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const validatePassword = (password: string) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= 8 && hasSpecialChar;
    }
    const validateName = (name: string) => name.length >= 2
    const validateConfirmPassword = (password: string, confirmPassword: string) =>
        password === confirmPassword && password.length > 0

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })

        switch (name) {
            case 'first_name':
                setErrors({ ...errors, first_name: !validateName(value) })
                break
            case 'last_name':
                setErrors({ ...errors, last_name: !validateName(value) })
                break
            case 'email':
                setErrors({ ...errors, email: !validateEmail(value) })
                break
            case 'password':
                setErrors({
                    ...errors,
                    password: !validatePassword(value),
                    confirmPassword: !validateConfirmPassword(value, formData.confirmPassword)
                })
                break
            case 'confirmPassword':
                setErrors({
                    ...errors,
                    confirmPassword: !validateConfirmPassword(formData.password, value)
                })
                break
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading({ ...isLoading, email: true })
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )

            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))

            if (!userDoc.exists()) {
                const initialUserProfile = await getInitialUserProfile(userCredential.user.uid, formData.first_name, formData.last_name, formData.email)
                await addNewUser(initialUserProfile);
            }

            router.push('/dashboard')
        } catch (error: any) {
            console.error('Signup error:', error.message)
        } finally {
            setIsLoading({ ...isLoading, email: false })
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading({ ...isLoading, google: true })
        try {
            const result = (await signInWithPopup(auth, googleProvider)) as UserCredential & {
                additionalUserInfo?: {
                    isNewUser: boolean;
                };
            };

            const user = result.user

            const userDoc = await getDoc(doc(db, 'users', user.uid))

            if (!userDoc.exists() && user.email) {
                console.log(user.displayName);

                const initialUserProfile = await getInitialUserProfile(
                    user.uid,
                    user.displayName ? user.displayName.split(' ')[0] : '',
                    user.displayName ? user.displayName.split(' ')[1] || '' : '',
                    user.email,
                    user?.photoURL || ''
                )
                await addNewUser(initialUserProfile);
            }

            router.push('/dashboard')
        } catch (error: any) {
            console.error('Google signup error:', error.message)
        } finally {
            setIsLoading({ ...isLoading, google: false })
        }
    }

    return (
        <div className='max-w-[1440px] mx-auto min-h-screen flex items-center justify-between bg-accentColor p-[25px] gap-[25px] relative'>
            <div className='flex flex-col items-stretch justify-between gap-[25px] h-[80vh]'>
                <div className=''>
                    <img src="/assets/logo-black.svg" alt="" className='h-[32px]' />
                </div>
                <div className='h-[600px] w-[600px] p-[25px] rounded-[25px]'>
                    <Carousel />
                </div>
                <div></div>
            </div>

            <div className='w-[500px] h-[80vh] bg-white p-[34px] rounded-[15px] flex flex-col justify-center items-stretch'>
                <div className='flex flex-col gap-[28px]'>
                    <div className='flex justify-center items-center'>
                        <img src="/assets/character.svg" alt="" className='w-[100px] h-[100px]' />
                    </div>
                    <div className='flex flex-col justify-between items-start gap-[15px]'>
                        <span className='text-[24px] font-semibold'>
                            Register
                        </span>
                        <span className='text-[14px] text-[#89898B]'>Create an account to get started</span>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-[21px]'>

                        <label htmlFor="first_name" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Name</p>
                            <div className='flex justify-between items-center gap-[15px]'>
                                <input
                                    type="text"
                                    name='first_name'
                                    className='input-field w-full'
                                    style={{
                                        borderColor: errors.first_name ? '#B50202' : ''
                                    }}
                                    value={formData.first_name}
                                    placeholder='First name'
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    name='last_name'
                                    className='input-field w-full'
                                    style={{
                                        borderColor: errors.last_name ? '#B50202' : ''
                                    }}
                                    value={formData.last_name}
                                    placeholder='Last name'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </label>


                        <label htmlFor="email" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Email</p>
                            <input
                                type="email"
                                name='email'
                                className='input-field w-full'
                                style={{
                                    borderColor: errors.email ? '#B50202' : ''
                                }}
                                value={formData.email}
                                placeholder='Enter your email'
                                onChange={handleInputChange}
                            />
                        </label>

                        <label htmlFor="password" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Password</p>
                            <input
                                type="password"
                                name='password'
                                className='input-field w-full'
                                style={{
                                    borderColor: errors.password ? '#B50202' : ''
                                }}
                                value={formData.password}
                                placeholder='Enter your password'
                                onChange={handleInputChange}
                            />
                            <p className='text-sm text-gray-500'>
                                Password must be at least 8 characters long and contain at least one special character
                            </p>
                        </label>

                        <label htmlFor="confirmPassword" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Confirm Password</p>
                            <input
                                type="password"
                                name='confirmPassword'
                                className='input-field w-full'
                                style={{
                                    borderColor: errors.confirmPassword ? '#B50202' : ''
                                }}
                                value={formData.confirmPassword}
                                placeholder='Confirm your password'
                                onChange={handleInputChange}
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={Object.values(errors).some(error => error) ||
                                Object.values(formData).some(value => !value) ||
                                isLoading.email}
                            className='bg-primaryColorLight py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50'
                        >
                            {isLoading.email ? 'Creating Account...' : 'Register'}
                        </button>

                        <div className='flex items-center gap-[15px]'>
                            <div className='h-[2px] bg-borderColor flex-1'></div>
                            <span className='text-[#89898B]'>Or Login With</span>
                            <div className='h-[2px] bg-borderColor flex-1'></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            disabled={isLoading.google}
                            className='w-full bg-accentColorLight py-[14px] rounded-[15px] flex items-center justify-center gap-[10px] border-[2px] border-transparent hover:border-[#2a4d8f77] transition-colors disabled:opacity-50'
                        >
                            <img src="/assets/google.svg" alt="Google" className='w-[20px] h-[20px]' />
                            <span className='text-[16px] font-semibold'>
                                {isLoading.google ? 'Signing up...' : 'Continue with Google'}
                            </span>
                        </button>


                    </form>
                </div>
            </div>
        </div >
    )
}

export default SignupPage
