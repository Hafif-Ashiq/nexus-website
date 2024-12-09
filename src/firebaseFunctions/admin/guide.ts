import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

import { GuideInterface } from "@/services/GuideInterface";
import { getCurrentTimeFormatted } from "@/utils/datetime";
import { db } from "@/services/firebase"; // Import the already initialized Firestore
import { deleteFileFromStorage, uploadFileToStorage } from "../utils";

const addGuideToFirebase = async (
    file: File | null,
    thumbnailFile: File | null,
    guideData: Omit<GuideInterface, "guide_id" | "link" | "thumbnail">
) => {
    try {
        // Create the guide document first to get the ID
        const guidesCollectionRef = collection(db, "guides");
        const docRef = await addDoc(guidesCollectionRef, {
            is_visible: guideData.is_visible,
            title: guideData.title,
            type: guideData.type,
            description: guideData.description,
            liked_by: guideData.liked_by,
            viewed_by: guideData.viewed_by,
            link: "",
            thumbnail: "",
            total_likes: guideData.total_likes,
            date_posted: getCurrentTimeFormatted()
        });

        const guideId = docRef.id;
        console.log(guideId)
        let fileUrl: string | null = null;
        let thumbnailUrl: string | null = null;

        // Upload files using the guide ID in the path
        if (file) {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            const isVideo = ["mp4", "mov", "avi", "webm"].includes(fileExtension!);
            const fileName = `${isVideo ? "video" : "image"}.${fileExtension}`;

            fileUrl = await uploadFileToStorage(file, `guides/${guideId}`, fileName);
            console.log(fileUrl)
        }

        if (thumbnailFile) {
            const thumbnailExtension = thumbnailFile.name.split(".").pop()?.toLowerCase();
            const thumbnailFileName = `thumbnail.${thumbnailExtension}`;

            thumbnailUrl = await uploadFileToStorage(thumbnailFile, `guides/${guideId}`, thumbnailFileName);
            console.log(thumbnailUrl)
        }

        // Update the document with the URLs and guide_id
        await updateDoc(docRef, {
            guide_id: guideId,
            link: fileUrl || "",
            thumbnail: thumbnailUrl || ""
        });

        return true;
    } catch (error) {
        console.error("Error adding guide to Firebase:", error);
        return false;
    }
};

const getGuidesFromFirebase = async (): Promise<GuideInterface[]> => {
    try {
        // Initialize Firestore
        // const firestore = getFirestore(); // Removed as Firestore is now imported from @firebase

        // Reference to the guides collection
        const guidesCollectionRef = collection(db, "guides"); // Using the imported Firestore instance

        // Fetch all documents from the guides collection
        const guideSnapshot = await getDocs(guidesCollectionRef);

        // Map the document data to GuideInterface
        const guides: GuideInterface[] = guideSnapshot.docs.map(doc => ({
            id: doc.id, // The document ID as the guide ID
            ...doc.data() as Omit<GuideInterface, 'id'> // Type assertion for the document data
        }));

        console.log("Guides fetched successfully:", guides);
        return guides;
    } catch (error) {
        console.error("Error fetching guides from Firebase:", error);
        return [];
    }
};
const deleteGuideFromFirebase = async (guideId: string) => {
    try {
        // Reference to the guide document
        const guideDocRef = doc(db, "guides", guideId);

        // Get the document data before deleting to get file paths
        const guideDoc = await getDoc(guideDocRef);
        if (guideDoc.exists()) {
            // Delete the main guide file
            await deleteFileFromStorage(`guides/${guideId}/${guideDoc.data().type}`);

            // Delete the thumbnail
            await deleteFileFromStorage(`guides/${guideId}/thumbnail`);
        }

        // Delete the document
        await deleteDoc(guideDocRef);

        console.log(`Guide with ID ${guideId} has been deleted successfully.`);
        return true;
    } catch (error) {
        console.error("Error deleting guide from Firebase:", error);
        return false;
    }
};

export { addGuideToFirebase, getGuidesFromFirebase, deleteGuideFromFirebase };
