"use client"

import UserSideBar from "./_components/UserSideBar";
import Header from "./_components/Header";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-[30px] h-full">
            <Header />
            <div className="flex gap-[40px]">
                <div className='basis-[75%] flex flex-col gap-[20px]'>
                    {children}
                </div>
                <div className='basis-[25%]'>
                    <UserSideBar />
                </div>
            </div>
        </div>
    );
}
