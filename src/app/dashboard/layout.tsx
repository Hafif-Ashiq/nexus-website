"use client"

import { useEffect } from "react";
import SideBar from "./_components/SideBar";
import { listenToAllModels } from "@/firebaseFunctions/admin/aiModels";
import { useAppDispatch } from "@/redux/store";
import { setAllModels } from "@/redux/slices/aiModelsSlice";
import { AiModelInterface } from "@/services/AiModelsInterface";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const unsubscribe = listenToAllModels((models: AiModelInterface[] | ((prevModels: AiModelInterface[]) => AiModelInterface[])) => {
            dispatch(setAllModels(models as AiModelInterface[]));
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [])

    return (
        <html lang="en">
            <head>
                <title>Nexus</title>
            </head>

            <body className="font-poppins relative flex">
                <SideBar />
                <div className="ml-[360px] px-[50px] py-[45px]">
                    {children}
                </div>
            </body>
        </html>
    );
}
