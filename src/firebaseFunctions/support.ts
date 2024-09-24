// import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { SupportInterface } from '@/services/SupportInterface';


// export const fetchAllSupportChats = async () => {
//     try {
//         const supportCollection = collection(db, 'support');
//         const usersSnapshot = await getDocs(supportCollection);
//         let supportChatLists = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


//         supportChatLists = supportChatLists.map((chat) => {

//             fetchUserName(chat?.user_id).then(name => {
//                 console.log(name);

//                 return {
//                     ...chat,
//                     user_name: name
//                 }
//             })
//             return chat

//         })

//         console.log(supportChatLists);
//         return supportChatLists;
//     } catch (error) {
//         console.error("Error fetching Support Chats:", error);
//     }
// };

// export const fetchUserName = async (user_id: string) => {
//     try {
//         // Reference to the document in the users collection
//         const userDocRef = doc(db, "users", user_id);

//         // Fetch the document
//         const userDoc = await getDoc(userDocRef);

//         // Check if the document exists
//         if (userDoc.exists()) {
//             // Extract the name from the document data
//             const userData = userDoc.data();
//             return userData?.name || null; // Return the name or null if not found
//         } else {
//             console.log("No such user found!");
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching user name: ", error);
//         return null;
//     }

// }

import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Adjust your Firebase imports

// Fetch all support chats
export const fetchAllSupportChats = async (): Promise<SupportInterface[]> => {
    try {
        const supportCollection = collection(db, 'support');
        const usersSnapshot = await getDocs(supportCollection);

        // Fetch support chats
        const supportChatLists: SupportInterface[] = await Promise.all(
            usersSnapshot.docs.map(async (docSnapshot) => {
                const data = docSnapshot.data();

                // Type assertion to ensure data aligns with SupportInterface
                const chat: Partial<SupportInterface> = {
                    user_id: data.user_id,
                    issue_id: data.issue_id,
                    issue_opened_time: data.issue_opened_time,
                    issue_closed_time: data.issue_closed_time,
                    issue_category: data.issue_category,
                    issue_status: data.issue_status,
                    conversation: data.conversation,
                };

                // Check if all necessary fields exist
                if (!chat.user_id || !chat.issue_id || !chat.issue_opened_time || !chat.conversation) {
                    throw new Error("Missing required fields in Firestore document");
                }

                // Fetch user name based on user_id
                const user_name = await fetchUserName(chat.user_id);

                return {
                    ...chat,
                    id: docSnapshot.id,   // Adding Firestore document id
                    user_name: user_name || 'Unknown',  // Assign user_name or default 'Unknown'
                } as SupportInterface;
            })
        );

        console.log(supportChatLists);
        return supportChatLists;
    } catch (error) {
        console.error("Error fetching Support Chats:", error);
        return [];
    }
};

// Fetch user name based on user_id
export const fetchUserName = async (user_id: string): Promise<string | null> => {
    try {
        // Reference to the document in the users collection
        const userDocRef = doc(db, "users", user_id);

        // Fetch the document
        const userDoc = await getDoc(userDocRef);

        // Check if the document exists
        if (userDoc.exists()) {
            // Extract the name from the document data
            const userData = userDoc.data();
            return userData?.first_name + " " + userData?.last_name || null; // Return the name or null if not found
        } else {
            console.log("No such user found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user name: ", error);
        return null;
    }
};
