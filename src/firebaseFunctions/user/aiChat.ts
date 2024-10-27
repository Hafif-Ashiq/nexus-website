import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { AiChatInterface } from '../../services/AiChatInterface';
import { db } from '@/services/firebase';

export const listenToAiChatHistory = (
    userId: string,
    setAiChatHistory: React.Dispatch<React.SetStateAction<AiChatInterface[]>>
) => {
    // const db = getFirestore();
    const userChatsRef = collection(db, 'users', userId, 'chat');
    const chatsQuery = query(userChatsRef);

    // Subscribe to updates
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
        const chats: AiChatInterface[] = querySnapshot.docs.map((doc) => {
            const chatData = doc.data() as AiChatInterface;
            return {
                id: doc.id,
                user_id: chatData.user_id,
                conversation: chatData.conversation,
                chat_type: chatData.chat_type,
                summarization_config: chatData.summarization_config,
                translation_config: chatData.translation_config
            };
        });

        // Update the state with the new list of AI chats
        setAiChatHistory(chats);
    }, (error) => {
        console.error('Error fetching AI chats:', error);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};