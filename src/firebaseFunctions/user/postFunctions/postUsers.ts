import { UserProfile } from '@/services/UserInterface';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const getUserDataForPost = async (userId: string): Promise<Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'profile_pic'>>> => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', userId); // Assuming 'users' is the collection name
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
        const { first_name, last_name, email, profile_pic } = userSnapshot.data() as UserProfile;
        return { first_name, last_name, email, profile_pic };
    } else {
        console.log('No such user!');
        return {} as Partial<Pick<UserProfile, 'first_name' | 'last_name' | 'email' | 'profile_pic'>>;
    }
};

