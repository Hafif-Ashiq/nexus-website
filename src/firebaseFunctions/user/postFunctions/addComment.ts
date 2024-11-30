import { doc, setDoc, collection, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { PostCommentInterface } from '@/services/PostCommentInterface';

export const addComment = async (postId: string, commentText: string, userId: string): Promise<boolean> => {
    try {
        const commentId = doc(collection(db, 'posts', postId, 'comments')).id; // Generate a new comment ID
        const commentData: PostCommentInterface = {
            comment_id: commentId,
            user_id: userId,
            text: commentText,
            liked_by: [],
            total_likes: 0,
            date_created: new Date().toLocaleDateString()
        };

        const commentRef = doc(db, 'posts', postId, 'comments', commentId);
        await setDoc(commentRef, commentData);

        // Increment the total comments in the post object
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            total_comments: increment(1)
        });

        return true;
    } catch (error) {
        console.error('Error adding comment:', error);
        return false;
    }
};
