'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { getInitialUserProfile } from '@/utils/auth'
import { addNewUser } from '@/firebaseFunctions/admin/users'
// import { getInitialUserProfile, addNewUser } from '@/utils/user'

const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const validatePassword = (password: string) => password.length >= 8

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setEmail(value)
        setErrors({ ...errors, email: !validateEmail(value) })
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setPassword(value)
        setErrors({ ...errors, password: !validatePassword(value) })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setAuthError('')

        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/dashboard') // Redirect to dashboard after successful login
        } catch (error: any) {
            console.error('Login error:', error)
            setAuthError(
                error.code === 'auth/invalid-credential'
                    ? 'Invalid email or password'
                    : 'An error occurred during login'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setAuthError('')

        try {
            const provider = new GoogleAuthProvider()
            const result = (await signInWithPopup(auth, provider)) as UserCredential
            console.log(result);

            const user = result.user

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid))

            if (!userDoc.exists() && user.email) {
                const initialUserProfile = await getInitialUserProfile(
                    user.uid,
                    user.displayName ? user.displayName.split(' ')[0] : '',
                    user.displayName ? user.displayName.split(' ')[1] || '' : '',
                    user.email,
                    user?.photoURL || ''
                )
                await addNewUser(initialUserProfile)
            }

            router.push('/dashboard')
        } catch (error: any) {
            console.error('Google sign-in error:', error)
            setAuthError('An error occurred during Google sign-in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-white p-[25px]'>
            <div className='w-full max-w-[500px] bg-white p-[25px] rounded-[25px] border-[2px] border-borderColor'>
                <div className='flex justify-between items-center pb-[20px]'>
                    <div className='text-[24px] font-semibold'>
                        Login
                    </div>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] pt-[25px]'>
                    {authError && (
                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                            {authError}
                        </div>
                    )}

                    <label htmlFor="email" className='flex flex-col gap-[10px]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Email</p>
                        <input
                            type="email"
                            name='email'
                            className='input-field w-full'
                            style={{
                                borderColor: errors.email ? '#B50202' : ''
                            }}
                            value={email}
                            placeholder='Enter your email'
                            onChange={handleEmailChange}
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
                            value={password}
                            placeholder='Enter your password'
                            onChange={handlePasswordChange}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!validateEmail(email) || !validatePassword(password) || loading}
                        className='bg-primaryColorLight py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50 mt-[10px]'
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className='flex items-center gap-[15px] my-[10px]'>
                        <div className='h-[2px] bg-borderColor flex-1'></div>
                        <span className='text-gray-500'>or</span>
                        <div className='h-[2px] bg-borderColor flex-1'></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className='w-full border-[2px] border-borderColor py-[14px] rounded-[15px] flex items-center justify-center gap-[10px] hover:bg-gray-50 transition-colors disabled:opacity-50'
                    >
                        <img src="/assets/google.svg" alt="Google" className='w-[20px] h-[20px]' />
                        <span className='text-[16px] font-semibold'>
                            {loading ? 'Signing in...' : 'Continue with Google'}
                        </span>
                    </button>

                    <div className='text-center mt-[15px]'>
                        <span className='text-gray-500'>Don&apos;t have an account?</span>
                        <a
                            href="/signup"
                            className='text-primaryColorLight font-semibold ml-[5px] hover:underline'
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage