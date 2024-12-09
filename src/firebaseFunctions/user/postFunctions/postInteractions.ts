import { doc, updateDoc, arrayUnion, arrayRemove, increment, getDoc } from 'firebase/firestore';
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


export const savePost = async (postId: string, userId: string): Promise<boolean> => {
    try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            saved_by: arrayUnion(userId)
        });
        return true;
    } catch (error) {
        console.error('Error saving post:', error);
        return false;
    }
};

export const unsavePost = async (postId: string, userId: string): Promise<boolean> => {
    try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            saved_by: arrayRemove(userId)
        });
        return true;
    } catch (error) {
        console.error('Error unsaving post:', error);
        return false;
    }
};


export const updatePostPermissions = async (
    postId: string,
    userId: string,
    permissions: {
        like_allowed: boolean,
        comment_allowed: boolean,
        share_allowed: boolean,
        is_private: boolean
    }
): Promise<boolean> => {
    try {
        const postRef = doc(db, 'posts', postId);

        // Get post data to verify ownership
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) {
            console.error('Post not found');
            return false;
        }

        const postData = postSnap.data();
        if (postData.user_id !== userId) {
            console.error('User not authorized to update permissions');
            return false;
        }

        // Update permissions
        await updateDoc(postRef, {
            permissions: {
                like_allowed: permissions.like_allowed,
                comment_allowed: permissions.comment_allowed,
                share_allowed: permissions.share_allowed,
                is_private: permissions.is_private
            }
        });

        return true;
    } catch (error) {
        console.error('Error updating post permissions:', error);
        return false;
    }
};
