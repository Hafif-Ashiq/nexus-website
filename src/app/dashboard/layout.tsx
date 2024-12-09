"use client"

import { useEffect } from "react";
import SideBar from "./_components/SideBar";
import { listenToAllModels } from "@/firebaseFunctions/admin/aiModels";
import { RootState, useAppDispatch } from "@/redux/store";
import { setAllModels } from "@/redux/slices/aiModelsSlice";
import { AiModelInterface } from "@/services/AiModelsInterface";
import { getUserData } from "@/firebaseFunctions/user/userFunctions";
import { useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch()
    const userId = useSelector((state: RootState) => state.userReducer.userId)

    useEffect(() => {
        getUserData(userId).then((user) => {
            dispatch(setUser(user))
        })
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
