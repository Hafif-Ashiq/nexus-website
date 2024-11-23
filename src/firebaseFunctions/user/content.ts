import { collection, query, onSnapshot, where, doc, updateDoc } from 'firebase/firestore';
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


export const listenToFolderContent = (
    userId: string,
    folderId: string,
    setContent: React.Dispatch<React.SetStateAction<ContentInterface[]>>
) => {
    const userContentRef = collection(db, 'users', userId, 'content');
    const contentQuery = query(userContentRef, where('folder_id', '==', folderId));

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
        console.error('Error fetching folder content:', error);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};


export const listenToContent = (
    userId: string,
    contentId: string,
    setContent: React.Dispatch<React.SetStateAction<ContentInterface | null>>
) => {
    const contentRef = doc(db, 'users', userId, 'content', contentId);

    // Subscribe to updates
    const unsubscribe = onSnapshot(contentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const contentData = docSnapshot.data() as ContentInterface;
            setContent({
                ...contentData
            });
        } else {
            setContent(null);
        }
    }, (error) => {
        console.error('Error fetching content:', error);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};

export const updateContent = async (
    userId: string,
    contentId: string,
    updates: {
        title?: string;
        folder_id?: string;
        tags?: string[]
    }
) => {
    try {
        const contentRef = doc(db, 'users', userId, 'content', contentId);
        await updateDoc(contentRef, updates);
    } catch (error) {
        console.error('Error updating content:', error);
        throw error;
    }
};
