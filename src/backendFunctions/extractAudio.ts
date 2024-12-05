import { FFmpeg } from '@ffmpeg/ffmpeg';

export const extractAudioFromVideo = async (videoFile: File): Promise<{ blob: Blob, file: File }> => {
    // Create FFmpeg instance
    const ffmpeg = new FFmpeg();

    try {
        // Load FFmpeg
        await ffmpeg.load();

        // Convert video file to array buffer
        const videoData = await videoFile.arrayBuffer();

        // Write video file to FFmpeg's virtual filesystem
        await ffmpeg.writeFile('input.mp4', new Uint8Array(videoData));

        // Run FFmpeg command to extract audio
        // -i: input file
        // -vn: disable video
        // -acodec: audio codec (mp3)
        // -b:a: audio bitrate
        await ffmpeg.exec([
            '-i', 'input.mp4',
            '-vn',
            '-acodec', 'mp3',
            '-b:a', '192k',
            'output.mp3'
        ]);

        // Read the output file
        const audioData = await ffmpeg.readFile('output.mp3');

        // Convert to Blob
        const audioBlob = new Blob([audioData], { type: 'audio/mp3' });

        // Create File object from Blob
        const audioFile = new File([audioBlob], 'extracted_audio.mp3', { type: 'audio/mp3' });
        console.log(audioFile)
        return {
            blob: audioBlob,
            file: audioFile
        };
    } catch (error) {
        console.error('Error extracting audio:', error);
        throw error;
    } finally {
        // Clean up
        await ffmpeg.terminate();
    }
};
