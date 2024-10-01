import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { UserProfile } from '@/services/UserInterface';
import { uploadFileToStorage } from './utils';


export const listenToUsersList = (
    setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>
) => {
    const usersCollection = collection(db, 'users');

    // Subscribe to updates
    const unsubscribe = onSnapshot(usersCollection, async (snapshot) => {
        const users: UserProfile[] = await Promise.all(
            snapshot.docs.map(async (docSnapshot) => {
                const data = docSnapshot.data();

                const chat: Partial<UserProfile> = {
                    id: data.id,
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    account_status: data.account_status,
                    profile_pic: data.profile_pic,
                    background_pic: data.background_pic,
                    biography: data.biography,
                    community: data.community,
                    guides: data.guides,
                    app_customization: data.app_customization,
                };

                // if (!chat.user_id || !chat.issue_id || !chat.issue_opened_time || !chat.conversation) {
                //     throw new Error("Missing required fields in Firestore document");
                // }

                // Fetch user name based on user_id


                return {
                    ...chat,
                    id: docSnapshot.id,
                } as UserProfile;
            })
        );

        // Update the state with the new list of support chats
        setUsers(users);
    });

    // Return the unsubscribe function to stop listening
    return unsubscribe;
};



export const addNewUser = async (user: UserProfile) => {

    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
        alert("User added")
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const deleteUser = async (userId: string) => {
    try {
        // Get a reference to the user's document using their userId
        const userDocRef = doc(db, "users", userId);

        // Delete the user document
        await deleteDoc(userDocRef);

        console.log("Document successfully deleted with ID: ", userId);
        alert("User deleted");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};


export const updateUser = async (userId: string, updatedData: Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'biography'>>) => {
    try {
        const userDocRef = doc(db, "users", userId); // Reference to the user document
        await updateDoc(userDocRef, updatedData); // Update the document with new data
        console.log("Document successfully updated!");
        alert("User updated successfully");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};


export const handleProfileFileUpload = async (file: File) => {

    try {
        const downloadURL = await uploadFileToStorage(file, "userProfile");
        console.log('File uploaded successfully:', downloadURL);
        return downloadURL
    } catch (error) {
        console.error('Error uploading file:', error);
        return ""
    }

};
