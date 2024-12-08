import { db } from "@/services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ContentInterface } from "@/services/ContentInterface";
import { AiModelInterface } from "@/services/AiModelsInterface";

export const updateContentResponseStatus = async (
    userId: string,
    contentId: string,
    modelId: string,
    responseType: 'translation' | 'summarization',
    responseStatus: {
        is_liked: boolean,
        is_disliked: boolean
    }
) => {
    try {
        // Get content document
        const contentRef = doc(db, 'users', userId, 'content', contentId);
        const contentDoc = await getDoc(contentRef);

        if (!contentDoc.exists()) {
            throw new Error('Content document does not exist');
        }

        const contentData = contentDoc.data() as ContentInterface;

        // Get previous response status
        const previousStatus = contentData[responseType]?.status || {
            is_liked: false,
            is_disliked: false
        };

        // Get model document
        const modelRef = doc(db, 'models', modelId);
        const modelDoc = await getDoc(modelRef);

        if (!modelDoc.exists()) {
            throw new Error('Model document does not exist');
        }

        const modelData = modelDoc.data() as AiModelInterface;
        let upVotes = modelData.total_up_votes || 0;
        let downVotes = modelData.total_down_votes || 0;

        // Update votes based on previous and new status
        if (previousStatus.is_liked && !responseStatus.is_liked) {
            if (upVotes > 0) upVotes--;
        } else if (!previousStatus.is_liked && responseStatus.is_liked) {
            upVotes++;
        }

        if (previousStatus.is_disliked && !responseStatus.is_disliked) {
            if (downVotes > 0) downVotes--;
        } else if (!previousStatus.is_disliked && responseStatus.is_disliked) {
            downVotes++;
        }

        // Update both documents
        await Promise.all([
            updateDoc(contentRef, {
                [`${responseType}.status`]: responseStatus
            }),
            updateDoc(modelRef, {
                total_up_votes: upVotes,
                total_down_votes: downVotes
            })
        ]);

    } catch (error) {
        console.error('Error updating content response status:', error);
        throw error;
    }
};
