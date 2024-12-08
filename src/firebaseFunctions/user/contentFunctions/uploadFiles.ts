import { db } from "@/services/firebase";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToStorage } from "@/firebaseFunctions/admin/utils";


export const uploadContentFile = async (userId: string, file: File, content_id: string): Promise<string> => {
    try {

        // Upload file using utility function
        const downloadUrl = await uploadFileToStorage(file, `users/${userId}/content/${content_id}`);


        // Update the content document with the file link
        const contentDocRef = doc(db, 'users', userId, 'content', content_id);
        await updateDoc(contentDocRef, {
            link: downloadUrl
        });

        return downloadUrl;

    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
