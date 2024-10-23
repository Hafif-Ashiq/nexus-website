"use client"

import UserSideBar from "./_components/UserSideBar";
import HeadCrumbHeader from "../_components/HeadCrumbHeader";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-[30px] h-full">
            <HeadCrumbHeader subtitle="Checkout the user's performance." />
            <div className="flex gap-[40px]">
                <div className='basis-[70%] flex flex-col gap-[20px]'>
                    {children}
                </div>
                <div className='basis-[30%]'>
                    <UserSideBar />
                </div>
            </div>
        </div>
    );
}
