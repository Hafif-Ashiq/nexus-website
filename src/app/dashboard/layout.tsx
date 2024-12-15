"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SideBar from "./_components/SideBar";
import { listenToAllModels } from "@/firebaseFunctions/admin/aiModels";
import { RootState, useAppDispatch } from "@/redux/store";
import { setAllModels } from "@/redux/slices/aiModelsSlice";
import { AiModelInterface } from "@/services/AiModelsInterface";
import { listenToUserData } from "@/firebaseFunctions/user/userFunctions";
import { useSelector } from "react-redux";
import { setUser, setUserId } from "@/redux/slices/userSlice";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch()
    const userId = useSelector((state: RootState) => state.userReducer.userId)
    const router = useRouter()

    useEffect(() => {
        const auth = getAuth();

        // Check authentication state
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/signup');
                return;
            }
            console.log(user.uid);

            dispatch(setUserId(user.uid))
            // Only fetch user data and models if authenticated
            listenToUserData(user.uid, async (user) => {
                console.log(user);
                if (user) {
                    dispatch(setUser(user))
                }
                else {
                    await signOut(auth)
                    router.push('/signup');
                    alert("User not found")
                }
            })

            const unsubscribeModels = listenToAllModels((models: AiModelInterface[] | ((prevModels: AiModelInterface[]) => AiModelInterface[])) => {
                dispatch(setAllModels(models as AiModelInterface[]));
            });

            return () => unsubscribeModels();
        });

        // Cleanup both subscriptions
        return () => {
            unsubscribeAuth();
        }
    }, [])

    return (
        <div className="relative flex w-full">
            <SideBar />
            <div className="ml-[360px] px-[50px] py-[45px] w-full">
                {children}
            </div>
        </div>
    );
}
