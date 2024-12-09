"use client"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { listenToUserContent } from "@/firebaseFunctions/user/content";
import { listenToUserFolders } from '@/firebaseFunctions/user/folder'
import { setAllContent, setAllFolders } from "@/redux/slices/librarySlice";
import { FolderInterface } from "@/services/FoldersInterface";

export default function LibraryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.userReducer.userId);

    useEffect(() => {
        // Set up listeners for content and folders
        const unsubscribeContent = listenToUserContent(userId, (content) => {
            dispatch(setAllContent(content));
        });

        const unsubscribeFolders = listenToUserFolders(userId, (folders) => {
            dispatch(setAllFolders(folders));
        });

        // Cleanup listeners on unmount
        return () => {
            unsubscribeContent();
            unsubscribeFolders();
        };
    }, []);

    return (
        <div className="w-full">
            {children}
        </div>
    );
}
