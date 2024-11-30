import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '@/services/firebase';

export const likePost = async (postId: string, userId: string): Promise<boolean> => {
    try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            liked_by: arrayUnion(userId),
            total_likes: increment(1)
        });
        return true;
    } catch (error) {
        console.error('Error liking post:', error);
        return false;
    }
};

export const unlikePost = async (postId: string, userId: string): Promise<boolean> => {
    try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            liked_by: arrayRemove(userId),
            total_likes: increment(-1)
        });
        return true;
    } catch (error) {
        console.error('Error unliking post:', error);
        return false;
    }
};


