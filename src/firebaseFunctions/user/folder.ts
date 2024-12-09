import { collection, query, onSnapshot, getDocs, addDoc, updateDoc, doc, deleteDoc, where } from 'firebase/firestore';
import { FolderInterface } from '../../services/FoldersInterface';
import { db } from '@/services/firebase';

export const listenToUserFolders = (
    userId: string,
    setFolders: React.Dispatch<React.SetStateAction<FolderInterface[]>>
) => {
    const userFoldersRef = collection(db, 'users', userId, 'folder');
    const foldersQuery = query(userFoldersRef);

    // Subscribe to updates
    const unsubscribe = onSnapshot(foldersQuery, (querySnapshot) => {
        const folders: FolderInterface[] = querySnapshot.docs.map((doc) => {
            const folderData = doc.data() as FolderInterface;
            return {
                folder_id: doc.id,
                title: folderData.title,
                icon: folderData.icon,
                date_updated: folderData.date_updated
            };
        });

        // Update the state with the new list of folders
        setFolders(folders);
    }, (error) => {
        console.error('Error fetching folders:', error);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};

export const getFolderNames = async (userId: string): Promise<string[]> => {
    try {
        const userFoldersRef = collection(db, 'users', userId, 'folder');
        const foldersQuery = query(userFoldersRef);
        const querySnapshot = await getDocs(foldersQuery);

        const folderNames = querySnapshot.docs.map(doc => {
            const folderData = doc.data() as FolderInterface;
            return folderData.title;
        });

        return folderNames;
    } catch (error) {
        console.error('Error fetching folder names:', error);
        return [];
    }
};

export const createFolder = async (
    userId: string,
    folderData: {
        title: string;
        icon: number;
    }
): Promise<string> => {
    try {
        const userFoldersRef = collection(db, 'users', userId, 'folder');
        const docRef = await addDoc(userFoldersRef, {
            title: folderData.title,
            icon: folderData.icon,
            date_updated: new Date().toISOString()
        });

        // Update the document with its own ID
        await updateDoc(docRef, {
            folder_id: docRef.id
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
};


export const updateFolder = async (
    userId: string,
    folderId: string,
    folderData: {
        title?: string;
        icon?: number;
    }
): Promise<void> => {
    try {
        const folderRef = doc(db, 'users', userId, 'folder', folderId);

        const updateData = {
            ...folderData,
            date_updated: new Date().toISOString()
        };

        await updateDoc(folderRef, updateData);
    } catch (error) {
        console.error('Error updating folder:', error);
        throw error;
    }
};

export const deleteFolder = async (
    userId: string,
    folderId: string
): Promise<void> => {
    try {
        // First update all content documents that reference this folder
        const contentRef = collection(db, 'users', userId, 'content');
        const contentQuery = query(contentRef, where('folder_id', '==', folderId));
        const contentSnapshot = await getDocs(contentQuery);

        // Update each content document to set folder_id to "None"
        const updatePromises = contentSnapshot.docs.map(doc =>
            updateDoc(doc.ref, { folder_id: "None" })
        );
        await Promise.all(updatePromises);

        // Then delete the folder document
        const folderRef = doc(db, 'users', userId, 'folder', folderId);
        await deleteDoc(folderRef);
    } catch (error) {
        console.error('Error deleting folder:', error);
        throw error;
    }
};
