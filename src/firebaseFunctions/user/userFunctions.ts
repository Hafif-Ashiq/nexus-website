import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";
import { UserProfile } from "@/services/UserInterface";

export const listenToUserData = (userId: string, callback: (user: UserProfile | null) => void) => {
    try {
        const userRef = doc(db, "users", userId);

        // Set up real-time listener
        const unsubscribe = onSnapshot(userRef, (userSnap) => {
            if (userSnap.exists()) {
                callback(userSnap.data() as UserProfile);
            } else {
                callback(null);
            }
        }, (error) => {
            console.error("Error listening to user data:", error);
            callback(null);
        });

        // Return unsubscribe function to clean up listener
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up user data listener:", error);
        callback(null);
        return () => { };
    }
};
