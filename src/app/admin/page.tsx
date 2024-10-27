"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
const page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin/dashboard'); // Client-side navigation to /another-page
    }, []);



    return null;
}

export default page