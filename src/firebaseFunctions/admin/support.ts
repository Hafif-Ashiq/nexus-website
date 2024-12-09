import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

import { SupportInterface } from '@/services/SupportInterface';
import { onSnapshot, collection } from 'firebase/firestore';

// Set up a listener for support chats
export const listenToSupportChats = (
    setSupportChatLists: React.Dispatch<React.SetStateAction<SupportInterface[]>>,
    userId?: string
) => {
    const supportCollection = collection(db, 'support');

    // Subscribe to updates
    const unsubscribe = onSnapshot(supportCollection, async (snapshot) => {
        const supportChatLists: SupportInterface[] = await Promise.all(
            snapshot.docs
                .filter(docSnapshot => {
                    const data = docSnapshot.data();
                    // Filter by userId if provided
                    return !userId || data.user_id === userId;
                })
                .map(async (docSnapshot) => {
                    const data = docSnapshot.data();

                    const chat: Partial<SupportInterface> = {
                        user_id: data.user_id,
                        issue_id: data.issue_id,
                        issue_opened_time: data.issue_opened_time,
                        issue_closed_time: data.issue_closed_time,
                        issue_category: data.issue_category,
                        issue_status: data.issue_status,
                        conversation: data.conversation,
                    };

                    if (!chat.user_id) {
                        throw new Error("Missing required fields in Firestore document");
                    }

                    // Fetch user name based on user_id
                    const user_name = await fetchUserName(chat.user_id);

                    return {
                        ...chat,
                        id: docSnapshot.id,
                        user_name: user_name || 'Unknown',
                    } as SupportInterface;
                })
        );

        // Update the state with the new list of support chats
        setSupportChatLists(supportChatLists);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};



// Fetch user name based on user_id
export const fetchUserName = async (user_id: string): Promise<string | null> => {
    try {
        const userDocRef = doc(db, "users", user_id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData?.first_name + " " + userData?.last_name || null;
        } else {
            console.log("No such user found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user name: ", error);
        return null;
    }
};



// Change status of a support issue
export const updateSupportStatus = async (issueId: string, newStatus: "Pending" | "Closed" | "Resolved"): Promise<boolean> => {
    try {
        const supportDocRef = doc(db, "support", issueId);

        await updateDoc(supportDocRef, {
            issue_status: newStatus
        });

        console.log(`Successfully updated status to ${newStatus}`);
        return true;

    } catch (error) {
        console.error("Error updating support status: ", error);
        return false;
    }
};
