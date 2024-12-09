import { db } from "@/services/firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { uploadFileToStorage } from "@/firebaseFunctions/utils";
import { PostInterface } from "@/services/PostInterface";

interface CreatePostParams {
    userId: string;
    description: string;
    files: File[];
    permissions: {
        is_private: boolean;
        comment_allowed: boolean;
        like_allowed: boolean;
        share_allowed: boolean;
    };
}

export const createPost = async ({
    userId,
    description,
    files,
    permissions,
}: CreatePostParams): Promise<string> => {
    try {
        // Create initial post document without images
        const postData: PostInterface = {
            post_id: "",
            user_id: userId,
            description,
            date_created: new Date().toISOString(),
            images: [],
            total_likes: 0,
            total_comments: 0,
            total_shares: 0,
            permissions,
            liked_by: [],
            saved_by: []
        };

        // Add post to Firestore and get the auto-generated ID
        const postRef = doc(collection(db, 'posts'));
        const post_id = postRef.id;

        // Update the post data with the generated ID
        postData.post_id = post_id;
        await setDoc(postRef, postData);

        // Upload files and update the post with image URLs
        if (files.length > 0) {
            const imageUrls = await Promise.all(
                files.map(file =>
                    uploadFileToStorage(file, `posts/${post_id}`)
                )
            );

            // Update post with image URLs
            await updateDoc(postRef, {
                images: imageUrls
            });
        }

        return post_id;

    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
