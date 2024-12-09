'use client'

import { useState } from 'react'
import { auth, googleProvider, db } from '@/services/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, UserProfile, UserCredential, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { addNewUser } from '@/firebaseFunctions/admin/users'
import { getInitialUserProfile } from '@/utils/auth'

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
            // Check if user already exists in your database
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))

            if (!userDoc.exists()) {
                // Create initial user profile structure only if user doesn't exist
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

            // Check both Google's isNewUser flag and Firestore
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
        <div className='min-h-screen flex items-center justify-center bg-white p-[25px]'>
            <div className='w-full max-w-[500px] bg-white p-[25px] rounded-[25px] border-[2px] border-borderColor'>
                <div className='flex justify-between items-center pb-[20px]'>
                    <div className='text-[24px] font-semibold'>
                        Sign Up
                    </div>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] pt-[25px]'>
                    <label htmlFor="first_name" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>First Name</p>
                        <input
                            type="text"
                            name='first_name'
                            className='input-field w-full'
                            style={{
                                borderColor: errors.first_name ? '#B50202' : ''
                            }}
                            value={formData.first_name}
                            placeholder='Enter your first name'
                            onChange={handleInputChange}
                        />
                    </label>

                    <label htmlFor="last_name" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Last Name</p>
                        <input
                            type="text"
                            name='last_name'
                            className='input-field w-full'
                            style={{
                                borderColor: errors.last_name ? '#B50202' : ''
                            }}
                            value={formData.last_name}
                            placeholder='Enter your last name'
                            onChange={handleInputChange}
                        />
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
                        className='bg-primaryColorLight py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50 mt-[10px]'
                    >
                        {isLoading.email ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Sign up'
                        )}
                    </button>

                    <div className='flex items-center gap-[15px] my-[10px]'>
                        <div className='h-[2px] bg-borderColor flex-1'></div>
                        <span className='text-gray-500'>or</span>
                        <div className='h-[2px] bg-borderColor flex-1'></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isLoading.google}
                        className='w-full border-[2px] border-borderColor py-[14px] rounded-[15px] flex items-center justify-center gap-[10px] hover:bg-gray-50 transition-colors disabled:opacity-50'
                    >
                        {isLoading.google ? (
                            <div className="w-6 h-6 border-2 border-primaryColorLight border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <img src="/assets/google.svg" alt="Google" className='w-[20px] h-[20px]' />
                                <span className='text-[16px] font-semibold'>Continue with Google</span>
                            </>
                        )}
                    </button>

                    <div className='text-center mt-[15px]'>
                        <span className='text-gray-500'>Already have an account?</span>
                        <a
                            href="/login"
                            className='text-primaryColorLight font-semibold ml-[5px] hover:underline'
                        >
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
