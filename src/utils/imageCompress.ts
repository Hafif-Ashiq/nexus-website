import imageCompression from 'browser-image-compression';

interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    quality?: number;
}

export async function compressImage(
    imageFile: File,
    options: CompressionOptions = {}
): Promise<File> {
    const {
        maxSizeMB = 1,
        maxWidthOrHeight = 1920,
        useWebWorker = true,
    } = options;

    try {
        const compressedFile = await imageCompression(imageFile, {
            maxSizeMB,
            maxWidthOrHeight,
            useWebWorker
        });

        // Create new File object with compressed data
        return new File(
            [compressedFile],
            imageFile.name.replace(/\.[^/.]+$/, "_compressed$&"),
            { type: imageFile.type }
        );

    } catch (error: any) {
        throw new Error(`Image compression failed: ${error.message}`);
    }
}
