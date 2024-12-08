import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number;
}

export async function compressVideo(
    videoFile: File,
    options: CompressionOptions = {}
): Promise<File> {
    const {
        maxSizeMB = 10,
        maxWidthOrHeight = 1920,
        quality = 0.8
    } = options;

    // Create FFmpeg instance
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    try {
        // Write input file to FFmpeg
        const inputFileName = 'input.mp4';
        const outputFileName = 'output.mp4';
        const data = await fetchFile(videoFile);
        await ffmpeg.writeFile(inputFileName, data);

        // Compress video using FFmpeg
        await ffmpeg.exec([
            '-i', inputFileName,
            '-c:v', 'libx264', // Video codec
            '-crf', String(Math.round((1 - quality) * 51)), // Quality (0-51, lower is better)
            '-preset', 'medium', // Compression speed preset
            '-vf', `scale='min(${maxWidthOrHeight},iw)':'-2'`, // Scale video
            '-movflags', '+faststart',
            '-y', // Overwrite output file if it exists
            outputFileName
        ]);

        // Read the compressed file
        const compressedData = await ffmpeg.readFile(outputFileName) as Uint8Array;
        const compressedSize = compressedData.byteLength;

        // Create new File object
        const compressedFile = new File(
            [compressedData],
            videoFile.name.replace(/\.[^/.]+$/, "_compressed.mp4"),
            { type: 'video/mp4' }
        );

        // Check if size meets requirements
        if (compressedSize > maxSizeMB * 1024 * 1024) {
            throw new Error('Compressed video still exceeds maximum size limit');
        }

        return compressedFile;

    } catch (error: any) {
        throw new Error(`Video compression failed: ${error.message}`);
    } finally {
        // Cleanup
        ffmpeg.terminate();
    }
}
