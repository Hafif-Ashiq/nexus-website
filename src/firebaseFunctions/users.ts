import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

export const fetchAllUsers = async () => {
    try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(usersList);
        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};