import { getFirestore, collection, query, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { AiChatInterface } from '../../services/AiChatInterface';
import { db } from '@/services/firebase';
import { AiModelInterface } from '@/services/AiModelsInterface';
import { SummarizationConfig } from '@/services/Configs';
import { TranslationConfig } from '@/services/Configs';
import { AiChatMessageInterface } from "@/services/AiChatInterface";

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
    modelId: string,
    responseStatus: {
        is_liked: boolean,
        is_disliked: boolean
    }
) => {
    try {
        // Get chat document
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

        // Get previous response status
        const previousStatus = conversation[messageIndex].response_status || {
            is_liked: false,
            is_disliked: false
        };

        // Get model document
        const modelRef = doc(db, 'models', modelId);
        const modelDoc = await getDoc(modelRef);

        if (!modelDoc.exists()) {
            throw new Error('Model document does not exist');
        }

        const modelData = modelDoc.data() as AiModelInterface;
        let upVotes = modelData.total_up_votes || 0;
        let downVotes = modelData.total_down_votes || 0;

        // Update votes based on previous and new status
        if (previousStatus.is_liked && !responseStatus.is_liked) {
            upVotes--;
        } else if (!previousStatus.is_liked && responseStatus.is_liked) {
            upVotes++;
        }

        if (previousStatus.is_disliked && !responseStatus.is_disliked) {
            downVotes--;
        } else if (!previousStatus.is_disliked && responseStatus.is_disliked) {
            downVotes++;
        }

        // Update the response status in conversation
        conversation[messageIndex] = {
            ...conversation[messageIndex],
            response_status: responseStatus
        };

        // Update both documents
        await Promise.all([
            updateDoc(chatRef, {
                conversation: conversation
            }),
            updateDoc(modelRef, {
                total_up_votes: upVotes,
                total_down_votes: downVotes
            })
        ]);

    } catch (error) {
        console.error('Error updating message response status:', error);
        throw error;
    }
};

export const updateAiChatConfig = async (chatType: string, newConfig: SummarizationConfig | TranslationConfig, userId: string, chatId: string) => {
    try {
        const chatRef = doc(db, 'users', userId, 'chat', chatId); // Assuming chatId is available in the scope
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat document does not exist');
        }

        const chatData = chatDoc.data();
        let updatedConfig;

        if (chatType === 'Summarization') {
            updatedConfig = {
                ...chatData.summarization_config,
                ...newConfig
            };
        } else if (chatType === 'Translation') {
            updatedConfig = {
                ...chatData.translation_config,
                ...newConfig
            };
        } else {
            throw new Error('Invalid chat type');
        }

        await updateDoc(chatRef, {
            [chatType.toLowerCase() + '_config']: updatedConfig
        });

    } catch (error) {
        console.error('Error updating config:', error);
        throw error;
    }
};


export const addOriginalMessage = async (userId: string, chatId: string, originalText: string) => {
    try {
        const chatRef = doc(db, 'users', userId, 'chat', chatId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat document does not exist');
        }

        const chatData = chatDoc.data();
        const currentConversation = chatData.conversation || [];

        // Create original message
        const originalMessage: AiChatMessageInterface = {
            text: originalText,
            message_type: "original",
            datetime: new Date().toISOString(),

        };

        // Add message to conversation
        const updatedConversation = [...currentConversation, originalMessage];

        await updateDoc(chatRef, {
            conversation: updatedConversation
        });

        return updatedConversation.length - 1; // Return index of added message

    } catch (error) {
        console.error('Error adding original message:', error);
        throw error;
    }
};

export const addResponseMessage = async (userId: string, chatId: string, responseText: string) => {
    try {
        const chatRef = doc(db, 'users', userId, 'chat', chatId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            throw new Error('Chat document does not exist');
        }

        const chatData = chatDoc.data();
        const currentConversation = chatData.conversation || [];

        // Create translated message
        const translatedMessage: AiChatMessageInterface = {
            text: responseText,
            message_type: "response",
            datetime: new Date().toISOString(),
            response_status: {
                is_liked: false,
                is_disliked: false
            }
        };

        // Add message to conversation
        const updatedConversation = [...currentConversation, translatedMessage];

        await updateDoc(chatRef, {
            conversation: updatedConversation
        });

        return updatedConversation.length - 1; // Return index of added message

    } catch (error) {
        console.error('Error adding response message:', error);
        throw error;
    }
};
