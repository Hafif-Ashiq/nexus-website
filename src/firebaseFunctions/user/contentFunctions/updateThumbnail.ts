import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { uploadFileToStorage } from "@/firebaseFunctions/utils";

// Upload thumbnail file to Firebase Storage
export const uploadThumbnail = async (userId: string, contentId: string, file: File) => {
    try {
        // Upload file using utility function
        const path = `users/${userId}/content/${contentId}`;
        const downloadURL = await uploadFileToStorage(file, path, "image");
        return downloadURL;
    } catch (error) {
        console.error("Error uploading thumbnail:", error);
        throw error;
    }
};

// Update thumbnail URL in content document
export const updateThumbnailURL = async (userId: string, contentId: string, thumbnailURL: string) => {
    try {
        const contentRef = doc(db, "users", userId, "content", contentId);

        await updateDoc(contentRef, {
            thumbnail: thumbnailURL
        });

        return true;
    } catch (error) {
        console.error("Error updating thumbnail URL:", error);
        throw error;
    }
};
