import { AiModelInterface } from "@/services/AiModelsInterface";
import { db } from "@/services/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { onSnapshot } from 'firebase/firestore';

export const listenToAllModels = (setModels: React.Dispatch<React.SetStateAction<AiModelInterface[]>>) => {
    try {
        // Get reference to the 'model' collection
        const modelCollectionRef = collection(db, 'models');

        // Subscribe to updates
        const unsubscribe = onSnapshot(modelCollectionRef, (querySnapshot) => {
            const models: AiModelInterface[] = querySnapshot.docs.map((doc) => ({
                model_id: doc.data().model_id,
                model_name: doc.data().model_name,
                endpoint: doc.data().endpoint,
                languages: doc.data().languages,
                active_status: doc.data().active_status,
                total_up_votes: doc.data().total_up_votes,
                total_down_votes: doc.data().total_down_votes,
            }));

            console.log(models);
            // Filter out the model with ID DiSUp3yEVucYO6EPU5r1

            setModels(models);
        }, (error) => {
            console.error("Error fetching models: ", error);
            setModels([]); // Set empty array on error
        });

        return unsubscribe; // Return the unsubscribe function
    } catch (error) {
        console.error("Error setting up model listener: ", error);
        return () => { }; // Return empty function if setup fails
    }
}

export async function updateModel(model_id: string, updatedFields: Partial<AiModelInterface>) {
    try {
        // Get the document reference
        const modelDocRef = doc(db, 'models', model_id);

        // Update the document with the provided fields
        await updateDoc(modelDocRef, updatedFields);

        console.log(`Model with ID ${model_id} updated successfully!`);
    } catch (error) {
        console.error(`Error updating model with ID ${model_id}:`, error);
    }
}

export async function updateEndpointPrefix(newPrefix: string) {
    try {
        const modelCollectionRef = collection(db, 'models');
        const querySnapshot = await getDocs(modelCollectionRef);

        const updatePromises = querySnapshot.docs.map(async (doc) => {
            const modelData = doc.data() as AiModelInterface;
            const currentEndpoint = modelData.endpoint;

            // Update the endpoint by replacing the base URL while preserving the path
            const url = new URL(currentEndpoint);
            const updatedEndpoint = `${newPrefix}${url.pathname}`;
            await updateDoc(doc.ref, { endpoint: updatedEndpoint.trim() });
            console.log(`Updated endpoint for model ID ${modelData.model_id}: ${updatedEndpoint.trim()}`);

        });

        await Promise.all(updatePromises);
        console.log("All applicable endpoints updated successfully!");
    } catch (error) {
        console.error("Error updating endpoints: ", error);
    }
}
