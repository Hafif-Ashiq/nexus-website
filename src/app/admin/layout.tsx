"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import SideBar from "./_components/SideBar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div className="relative flex w-full">
            <SideBar />
            <div className="ml-[360px] px-[50px] py-[45px] w-full">
                {children}
            </div>
        </div>
    );
}
