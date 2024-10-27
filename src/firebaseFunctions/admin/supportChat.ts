
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


import { ConversationInterface } from '@/services/SupportInterface';
import { getCurrentTimeFormatted } from '@/utils/datetime';
import { updateDoc, arrayUnion, getFirestore, doc } from 'firebase/firestore';



export async function addTextMessage({
    message,
    documentId,
    senderId,
}: {
    message: string;
    documentId: string;
    senderId: string;
}): Promise<void> {
    try {
        const db = getFirestore(); // Initialize Firestore
        const docRef = doc(db, 'support', documentId); // Reference to the specific document

        const newMessage: ConversationInterface = {
            sender_id: senderId,
            time_stamp: getCurrentTimeFormatted(), // Use ISO string for timestamps
            image_link: '', // Placeholder for image link, you can adjust as needed
            message_type: 'text',
            text: message,
            status: {
                is_sent: true,
                is_seen: false,
            },
        };

        // Update the conversation field by adding the new message
        await updateDoc(docRef, {
            conversation: arrayUnion(newMessage), // Use arrayUnion to add the message to the array
        });

        console.log('Added successfully');
    } catch (e) {
        console.error('Error adding message:', e);
    }
}


export async function addImageMessage({
    imageFile, // File object in TypeScript (could be from <input type="file">)
    documentId,
    senderId,
}: {
    imageFile: File;
    documentId: string;
    senderId: string;
}): Promise<void> {
    try {
        const firestore = getFirestore();
        const storage = getStorage();

        // Reference to the Firestore document
        const docRef = doc(firestore, 'support', documentId);

        // Reference to the Firebase Storage folder
        const storageRef = ref(storage, `support/${documentId}`);

        // Generate a unique file name
        const filename = uuidv4();
        const imageRef = ref(storageRef, `${filename}.jpg`);

        // Upload the image to Firebase Storage
        await uploadBytes(imageRef, imageFile);
        const downloadUrl = await getDownloadURL(imageRef);

        // Create the message object
        const newMessage: ConversationInterface = {
            text: "",
            sender_id: senderId,
            time_stamp: getCurrentTimeFormatted(),
            message_type: 'image',
            status: {
                is_sent: true,
                is_seen: false,
            },
            image_link: downloadUrl, // Add the image link
        };

        // Update the Firestore document with the new message
        await updateDoc(docRef, {
            conversation: arrayUnion(newMessage),
        });

        console.log('Image added successfully');
    } catch (error) {
        console.error('Error adding image message:', error);
    }
}