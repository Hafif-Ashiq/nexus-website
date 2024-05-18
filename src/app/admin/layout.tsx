"use client"

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import SideBar from "./_components/SideBar";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <body className="font-poppins relative flex">
                <SideBar />
                <div className="ml-[360px] px-[50px] py-[45px]">
                    {children}
                </div>
            </body>
        </html>
    );
}
