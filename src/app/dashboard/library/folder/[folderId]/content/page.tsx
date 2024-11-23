"use client"
import { useRouter } from 'next/dist/client/components/navigation'
import { useEffect } from 'react'

const page = () => {

    const router = useRouter()

    useEffect(() => {
        router.push("/dashboard/library")
    }, [])

    return null
}

export default page