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
                    user_id: data.user_id,
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
                    billing_infos: data.billing_infos,
                    start_date: data.start_date,
                    last_payment_date: data.last_payment_date,
                    subscription_plan: data.subscription_plan,

                };

                // if (!chat.user_id || !chat.issue_id || !chat.issue_opened_time || !chat.conversation) {
                //     throw new Error("Missing required fields in Firestore document");
                // }

                // Fetch user name based on user_id


                return {
                    ...chat,
                    user_id: docSnapshot.id,
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
        const userId = docRef.id;

        // Update the document with the ID
        await updateDoc(docRef, {
            user_id: userId
        });

        console.log("Document written with ID: ", userId);
        alert("User added");
        return userId;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e; // Re-throw to handle error in calling code
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

export const handleProfileFileUpload = async (file: File, userId: string, isProfilePic: boolean) => {
    try {
        // Upload file to storage with user-specific path and fixed filename
        const downloadURL = await uploadFileToStorage(
            file,
            `users/${userId}/${isProfilePic ? "picture" : "background"}`
        );
        console.log(`${isProfilePic ? "Profile" : "Cover"} picture uploaded successfully:`, downloadURL);
        return downloadURL;
    } catch (error) {
        console.error(`Error uploading ${isProfilePic ? "profile" : "cover"} picture:`, error);
        return "";
    }
};

export const updateUserImages = async (userId: string, profilePicUrl: string, coverPicUrl: string) => {
    const updates: Partial<UserProfile> = {};
    if (profilePicUrl) updates.profile_pic = profilePicUrl;
    if (coverPicUrl) updates.background_pic = coverPicUrl;

    await updateDoc(doc(db, 'users', userId), updates);
};



export const updateUserAccountStatus = async (userId: string, isDeactivated: boolean) => {
    try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
            "account_status.is_deactivated": isDeactivated
        });
        console.log(`User account ${isDeactivated ? "deactivated" : "activated"} successfully`);
        // alert(`User ${isDeactivated ? "deactivated" : "activated"} successfully`);
    } catch (e) {
        console.error("Error updating account status: ", e);
        throw e;
    }
};

export const updateUserSubscriptionPlan = async (userId: string, planId: string) => {
    try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
            subscription_plan: planId
        });
        console.log("User subscription plan updated successfully");
        alert("Subscription plan updated successfully");
    } catch (e) {
        console.error("Error updating subscription plan: ", e);
        throw e;
    }
};

