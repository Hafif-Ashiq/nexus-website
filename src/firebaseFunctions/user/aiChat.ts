import { getFirestore, collection, query, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { AiChatInterface } from '../../services/AiChatInterface';
import { db } from '@/services/firebase';

export const listenToAiChatHistory = (
    userId: string,
    setAiChatHistory: React.Dispatch<React.SetStateAction<AiChatInterface[]>>
) => {
    try {
        const userChatsRef = collection(db, 'users', userId, 'chat');
        const chatsQuery = query(userChatsRef);

        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            try {
                const chats: AiChatInterface[] = querySnapshot.docs.map((doc) => {
                    const chatData = doc.data() as AiChatInterface;
                    return {
                        id: doc.id,
                        chat_id: chatData.chat_id,
                        user_id: chatData.user_id || userId,
                        conversation: chatData.conversation || [],
                        chat_type: chatData.chat_type || 'default',
                        summarization_config: chatData.summarization_config || { type: '', length: '' },
                        translation_config: chatData.translation_config || {}
                    };
                });

                setAiChatHistory(chats);
            } catch (error) {
                console.error('Error processing chat data:', error);
                setAiChatHistory([]); // Set empty array on error
            }
        }, (error) => {
            console.error('Error fetching AI chats:', error);
            setAiChatHistory([]); // Set empty array on error
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error setting up chat listener:', error);
        return () => { }; // Return empty function if setup fails
    }
};


export const updateMessageResponseStatus = async (
    userId: string,
    chatId: string,
    messageIndex: number,
    responseStatus: {
        is_liked: boolean,
        is_disliked: boolean
    }
) => {
    try {
        const chatRef = doc(db, 'users', userId, 'chat', chatId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat document does not exist');
        }

        const chatData = chatDoc.data() as AiChatInterface;
        const conversation = [...chatData.conversation];

        if (messageIndex >= conversation.length) {
            throw new Error('Message index out of bounds');
        }

        // Update the response status
        conversation[messageIndex] = {
            ...conversation[messageIndex],
            response_status: responseStatus
        };

        // Update the document
        await updateDoc(chatRef, {
            conversation: conversation
        });

        console.log("updated from function")

    } catch (error) {
        console.error('Error updating message response status:', error);
        throw error;
    }
};
