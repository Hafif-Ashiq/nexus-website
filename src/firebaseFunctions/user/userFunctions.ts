import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { UserProfile } from "@/services/UserInterface";

export const getUserData = async (userId: string): Promise<UserProfile | null> => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
};
