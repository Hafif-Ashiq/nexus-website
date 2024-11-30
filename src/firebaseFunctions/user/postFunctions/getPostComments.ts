import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { PostCommentInterface } from '@/services/PostCommentInterface';



export const listenToPostComments = (
    postId: string,
    setComments: React.Dispatch<React.SetStateAction<PostCommentInterface[]>>
) => {
    try {
        const commentsRef = collection(db, 'posts', postId, 'comments');
        const commentsQuery = query(commentsRef, orderBy('date_created', 'desc'));

        const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
            try {
                const comments: PostCommentInterface[] = querySnapshot.docs.map((doc) => {
                    const commentData = doc.data() as PostCommentInterface;
                    return {
                        comment_id: doc.id,
                        user_id: commentData.user_id,
                        text: commentData.text,
                        liked_by: commentData.liked_by || [],
                        total_likes: commentData.total_likes || 0,
                        date_created: commentData.date_created
                    };
                });

                setComments(comments);
            } catch (error) {
                console.error('Error processing comments data:', error);
                setComments([]); // Set empty array on error
            }
        }, (error) => {
            console.error('Error fetching comments:', error);
            setComments([]); // Set empty array on error
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error setting up comments listener:', error);
        return () => { }; // Return empty function if setup fails
    }
};
