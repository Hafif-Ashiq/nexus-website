import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { GuideInterface } from "@/services/GuideInterface";

const addGuideToFirebase = async (
    file: File | null,
    thumbnailFile: File | null,
    guideData: Omit<GuideInterface, "id" | "link" | "thumbnail">
) => {
    try {
        // Initialize Firebase services
        const storage = getStorage();
        const firestore = getFirestore();

        // Generate a unique ID for the guide
        // const guideId = uuidv4();

        // Initialize placeholders for video/image URLs
        let videoUrl: string | null = null;
        let thumbnailUrl: string | null = null;

        // Check if a file was provided for the video or image
        if (file) {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            const isVideo = ["mp4", "mov", "avi", "webm"].includes(fileExtension!);
            const fileRef = ref(
                storage,
                `guides/${isVideo ? "video" : "image"}.${fileExtension}`
            );

            // Upload the video or image file
            await uploadBytes(fileRef, file);
            const fileUrl = await getDownloadURL(fileRef);

            // Set the link or thumbnail depending on file type
            if (isVideo) {
                videoUrl = fileUrl;
            } else {
                thumbnailUrl = fileUrl;
            }
        }

        // Upload the thumbnail image if provided and not already set
        if (thumbnailFile) {
            const thumbnailExtension = thumbnailFile.name.split(".").pop()?.toLowerCase();
            const thumbnailRef = ref(
                storage,
                `guides/thumbnail.${thumbnailExtension}`
            );
            await uploadBytes(thumbnailRef, thumbnailFile);
            thumbnailUrl = await getDownloadURL(thumbnailRef);
        }

        // Prepare the guide object
        const guide: Omit<GuideInterface, "id"> = {
            is_visible: guideData.is_visible,
            title: guideData.title,
            description: guideData.description,
            likedBy: guideData.likedBy,
            viewedBy: guideData.viewedBy,
            link: videoUrl || "", // Empty if no video is provided
            thumbnail: thumbnailUrl || "", // Empty if no thumbnail is provided
            total_likes: guideData.total_likes,
        };

        // Save the guide to Firestore (ID will be auto-generated)
        const guidesCollectionRef = collection(firestore, "guides");
        const docRef = await addDoc(guidesCollectionRef, guide);

        console.log("Guide added successfully:", guide);
        return true
    } catch (error) {
        console.error("Error adding guide to Firebase:", error);
        return false
    }
};

const getGuidesFromFirebase = async (): Promise<GuideInterface[]> => {
    try {
        // Initialize Firestore
        const firestore = getFirestore();

        // Reference to the guides collection
        const guidesCollectionRef = collection(firestore, "guides");

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
        // Initialize Firestore
        const firestore = getFirestore();

        // Reference to the guide document
        const guideDocRef = doc(firestore, "guides", guideId);

        // Delete the document
        await deleteDoc(guideDocRef);

        console.log(`Guide with ID ${guideId} has been deleted successfully.`);
        return true
    } catch (error) {
        console.error("Error deleting guide from Firebase:", error);
        return false
    }
};

export { addGuideToFirebase, getGuidesFromFirebase, deleteGuideFromFirebase };
