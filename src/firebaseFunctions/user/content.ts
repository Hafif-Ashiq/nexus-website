import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { ContentInterface } from '../../services/ContentInterface';
import { db } from '@/services/firebase';

export const listenToUserContent = (
    userId: string,
    setContent: React.Dispatch<React.SetStateAction<ContentInterface[]>>
) => {
    const userContentRef = collection(db, 'users', userId, 'content');
    const contentQuery = query(userContentRef);

    // Subscribe to updates
    const unsubscribe = onSnapshot(contentQuery, (querySnapshot) => {
        const content: ContentInterface[] = querySnapshot.docs.map((doc) => {
            const contentData = doc.data() as ContentInterface;
            return {
                id: doc.id,
                ...contentData
            };
        });

        // Update the state with the new list of content
        setContent(content);
    }, (error) => {
        console.error('Error fetching content:', error);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};
