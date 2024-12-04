import { AiModelInterface } from "@/services/AiModelsInterface";
import { db } from "@/services/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export async function getAllModels() {
    try {
        // Get reference to the 'model' collection
        const modelCollectionRef = collection(db, 'models');

        // Fetch all documents from the collection
        const querySnapshot = await getDocs(modelCollectionRef);
        console.log(querySnapshot);

        // Map through documents and format them to AiModelInterface
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

        return models;
    } catch (error) {
        console.error("Error fetching models: ", error);
        return [];
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
            await updateDoc(doc.ref, { endpoint: updatedEndpoint });
            console.log(`Updated endpoint for model ID ${modelData.model_id}: ${updatedEndpoint}`);

        });

        await Promise.all(updatePromises);
        console.log("All applicable endpoints updated successfully!");
    } catch (error) {
        console.error("Error updating endpoints: ", error);
    }
}
