import { db, storage } from "@/services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";

export const deleteContent = async (userId: string, contentId: string) => {
    try {
        // Delete content folder from storage
        const contentFolderRef = ref(storage, `users/${userId}/content/${contentId}`);

        // List all files in the content folder
        const filesList = await listAll(contentFolderRef);

        // Delete each file in the folder
        const deletePromises = filesList.items.map(fileRef => {
            return deleteObject(fileRef);
        });

        // Wait for all files to be deleted
        await Promise.all(deletePromises);

        // Delete the content document from Firestore
        const contentRef = doc(db, "users", userId, "content", contentId);
        await deleteDoc(contentRef);

        return true;
    } catch (error) {
        console.error("Error deleting content:", error);
        throw error;
    }
}
