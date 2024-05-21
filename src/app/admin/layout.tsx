"use client"

import SideBar from "./_components/SideBar";

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
