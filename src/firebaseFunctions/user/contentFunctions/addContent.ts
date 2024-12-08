import { db } from "@/services/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ContentInterface, ContentType } from "@/services/ContentInterface";
import { SummarizationConfig } from "@/services/Configs";
import { TranslationConfig } from "@/services/Configs";


export const addContent = async (userId: string, title: string, extracted_text: string, content_type: ContentType, isTranslation: boolean, isSummarization: boolean, config: TranslationConfig | SummarizationConfig) => {
    try {
        const contentCollectionRef = collection(db, 'users', userId, 'content');

        const newContent: Partial<ContentInterface> = {
            content_id: "",
            title: title,
            type: content_type,
            extracted_text: extracted_text,
            date_updated: new Date().toISOString(),
            thumbnail: "https://firebasestorage.googleapis.com/v0/b/nexus-ef4c1.appspot.com/o/mock_data%2Fcontent.png?alt=media&token=e4bbcb71-fa53-4f4f-8481-dde5c7a1e59b",
            link: null as unknown as string, // Allow null initially
            tags: [],
            folder_id: "None",
        };

        if (isTranslation) {
            newContent.translation = {
                text: "",
                status: {
                    is_liked: false,
                    is_disliked: false
                },
                translation_config: {
                    source_languages: ["English"],
                    target_languages: ["Urdu"],
                }
            }
        }

        if (isSummarization) {
            newContent.summarization = {
                text: "",
                status: {
                    is_liked: false,
                    is_disliked: false
                },
                summarization_config: config as SummarizationConfig
            }
        }
        const docRef = await addDoc(contentCollectionRef, newContent);

        // Update the content with the generated ID
        const contentWithId = {
            ...newContent,
            content_id: docRef.id
        };

        await updateDoc(docRef, {
            content_id: docRef.id
        });

        return contentWithId;

    } catch (error) {
        console.error("Error adding content: ", error);
        throw error;
    }
}
export const addSummarizationText = async (userId: string, content_id: string, summarization_text: string) => {
    try {
        const contentDocRef = doc(db, 'users', userId, 'content', content_id);

        await updateDoc(contentDocRef, {
            'summarization.text': summarization_text
        });

    } catch (error) {
        console.error("Error updating summarization text: ", error);
        throw error;
    }
}

export const addTranslationText = async (userId: string, content_id: string, translation_text: string) => {
    try {
        const contentDocRef = doc(db, 'users', userId, 'content', content_id);

        await updateDoc(contentDocRef, {
            'translation.text': translation_text
        });

    } catch (error) {
        console.error("Error updating translation text: ", error);
        throw error;
    }
}
