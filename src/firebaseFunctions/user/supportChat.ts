import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { SupportInterface } from '@/services/SupportInterface';
import { getCurrentTimeFormatted } from '@/utils/datetime';

export async function createNewSupportChat({
    userId,
    issueCategory,
}: {
    userId: string;
    issueCategory: "AI Features" | "Community" | "Application" | "Custom";
}): Promise<SupportInterface> {
    try {
        const db = getFirestore();

        const newChat: SupportInterface = {
            user_id: userId,
            issue_id: '',
            issue_opened_time: getCurrentTimeFormatted(),
            issue_closed_time: '',
            issue_category: issueCategory,
            issue_status: "Pending",
            conversation: [
                {
                    sender_id: "bpReSCGFYZY9k1TuuCdW",
                    time_stamp: getCurrentTimeFormatted(),
                    message_type: 'text',
                    text: "Please describe this issue",
                    status: {
                        is_seen: false,
                        is_sent: true,
                    }
                }
            ]
        };

        const docRef = await addDoc(collection(db, 'support'), newChat);

        // Update the chat with the Firestore-generated ID
        await updateDoc(doc(db, 'support', docRef.id), {
            issue_id: docRef.id
        });

        // Get the updated document
        const updatedDocRef = await getDoc(doc(db, 'support', docRef.id));
        const updatedChat = updatedDocRef.data() as SupportInterface;

        return updatedChat;

    } catch (error) {
        console.error('Error creating new support chat:', error);
        throw error;
    }
}