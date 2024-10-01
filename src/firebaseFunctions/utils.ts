import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Upload file function
export const uploadFileToStorage = (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Initialize Firebase Storage
        const storage = getStorage();
        // Create a storage reference
        const storageRef = ref(storage, `${path}/${file.name}`); // You can customize the folder path and file name

        // Create a file upload task
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Monitor upload progress
        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress handling (optional)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle any errors
                console.error("Error during file upload:", error);
                reject(error);
            },
            () => {
                // Handle successful uploads
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL); // Return the file's download URL
                });
            }
        );
    });
}
