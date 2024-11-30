import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '@/services/firebase';

export const likeComment = async (postId: string, commentId: string, userId: string): Promise<boolean> => {
    try {
        const commentRef = doc(db, 'posts', postId, 'comments', commentId);
        await updateDoc(commentRef, {
            liked_by: arrayUnion(userId),
            total_likes: increment(1)
        });
        return true;
    } catch (error) {
        console.error('Error liking comment:', error);
        return false;
    }
};

export const unlikeComment = async (postId: string, commentId: string, userId: string): Promise<boolean> => {
    try {
        const commentRef = doc(db, 'posts', postId, 'comments', commentId);
        await updateDoc(commentRef, {
            liked_by: arrayRemove(userId),
            total_likes: increment(-1)
        });
        return true;
    } catch (error) {
        console.error('Error unliking comment:', error);
        return false;
    }
};

