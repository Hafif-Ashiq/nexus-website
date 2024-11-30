import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { PostInterface } from '@/services/PostInterface';

export const listenToPosts = (
    setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>,
    limitPosts: number = 10,
    lastPostTimestamp?: Date,
    getPrivate: boolean = false,
    userId?: string
) => {
    try {
        const postsRef = collection(db, 'posts');
        let postsQuery;

        if (userId) {
            // Get posts from a specific user
            postsQuery = query(
                postsRef,
                orderBy('date_created', 'desc'),
                where('user_id', '==', userId),
                limit(limitPosts)
            );
        } else {
            // Get public or all posts based on getPrivate flag
            postsQuery = query(
                postsRef,
                orderBy('date_created', 'desc'),
                limitPosts ? limit(limitPosts) : limit(10),
                where('permissions.is_private', '==', getPrivate)
            );


        }
        if (!getPrivate) {
            postsQuery = query(postsQuery, where('permissions.is_private', '==', false));
        }


        if (lastPostTimestamp) {
            postsQuery = query(
                postsQuery,
                startAfter(lastPostTimestamp)
            );
        }

        const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
            try {
                const posts: PostInterface[] = querySnapshot.docs.map((doc) => {
                    const postData = doc.data() as PostInterface;
                    return {
                        post_id: doc.id,
                        user_id: postData.user_id,
                        description: postData.description,
                        images: postData.images || [],
                        liked_by: postData.liked_by || [],
                        total_likes: postData.total_likes || 0,
                        date_created: postData.date_created,
                        total_comments: postData.total_comments || 0,
                        total_shares: postData.total_shares || 0,
                        permissions: postData.permissions || [],
                        saved_by: postData.saved_by || []
                    };
                });

                setPosts(prevPosts => {
                    if (lastPostTimestamp) {
                        return [...prevPosts, ...posts];
                    }
                    return posts;
                });
            } catch (error) {
                console.error('Error processing posts data:', error);
                setPosts([]); // Set empty array on error
            }
        }, (error) => {
            console.error('Error fetching posts:', error);
            setPosts([]); // Set empty array on error
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error setting up posts listener:', error);
        return () => { }; // Return empty function if setup fails
    }
};
