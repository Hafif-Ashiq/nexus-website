import React, { useState } from 'react';
import Loader from '../Loader';
import { extractAudioFromVideo } from '../../backendFunctions/extractAudio';
import { getTextFromAudio } from '../../backendFunctions/getTextFromBackend';
import { extractTextFromPDF } from '../../backendFunctions/extractTextFromPDF';
import { extractTextFromDOCX } from '../../backendFunctions/extractTextFromDOCX';
import { getTextFromImage } from '../../backendFunctions/getTextFromBackend';

interface UploadFilesModalProps {
    onClose: () => void
}

const UploadFilesModal = ({ onClose }: UploadFilesModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transcribedResponse, setTranscribedText] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const fileTypes = {
        video: 'video/*',
        audio: 'audio/*',
        document: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        image: 'image/*'
    }

    const handleVideoUpload = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            setError('Please upload a video file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Extract audio from video
            const { blob, file: audioFile } = await extractAudioFromVideo(file);

            // Create download link for audio
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'extracted_audio.mp3';
            document.body.appendChild(a);
            a.click();

            // Cleanup download elements
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Get text from audio using backend
            const response = await getTextFromAudio(audioFile);
            setTranscribedText(response);

        } catch (err) {
            setError('Failed to process video');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAudioUpload = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('audio/')) {
            setError('Please upload an audio file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const text = await getTextFromAudio(file);
            setTranscribedText(text);

        } catch (err) {
            setError('Failed to process audio');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePDFUpload = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('application/pdf')) {
            setError('Please upload a PDF file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const text = await extractTextFromPDF(file);
            setTranscribedText(text);

        } catch (err) {
            setError('Failed to process PDF');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDOCXUpload = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setError('Please upload a DOCX file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const text = await extractTextFromDOCX(file);
            setTranscribedText(text);

        } catch (err) {
            setError('Failed to process DOCX');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const text = await getTextFromImage(file);
            setTranscribedText(text);

        } catch (err) {
            setError('Failed to process image');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        if (files.length + selectedFiles.length > 5) {
            setError('Maximum 5 files allowed');
            return;
        }
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const processFiles = async () => {
        setError(null);
        setLoading(true);
        const results: string[] = [];

        for (const file of selectedFiles) {
            try {
                if (file.type.startsWith('video/')) {
                    const { file: audioFile } = await extractAudioFromVideo(file);
                    const text = await getTextFromAudio(audioFile);
                    results.push(text);
                } else if (file.type.startsWith('audio/')) {
                    const text = await getTextFromAudio(file);
                    results.push(text);
                } else if (file.type.startsWith('application/pdf')) {
                    const text = await extractTextFromPDF(file);
                    results.push(text);
                } else if (file.type.startsWith('image/')) {
                    const text = await getTextFromImage(file);
                    results.push(text);
                } else if (file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                    const text = await extractTextFromDOCX(file);
                    results.push(text);
                }
            } catch (err) {
                console.error(`Failed to process ${file.name}:`, err);
                results.push(`Failed to process ${file.name}`);
            }
        }

        setTranscribedText(results.join('\n\n'));
        setLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length + selectedFiles.length > 5) {
                setError('Maximum 5 files allowed');
                return;
            }
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const fileFields = [
        {
            "type": "video",
            "accept": fileTypes.video,
            "id": "video-upload",
            "label": "Upload Video",
        },
        {
            "type": "audio",
            "accept": fileTypes.audio,
            "id": "audio-upload",
            "label": "Upload Audio",
        },
        {
            "type": "document",
            "accept": fileTypes.document,
            "id": "document-upload",
            "label": "Upload Document",
        },
        {
            "type": "image",
            "accept": fileTypes.image,
            "id": "image-upload",
            "label": "Upload Image",
        }
    ]

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div
                className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px]'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {loading ? (
                    <div className="flex flex-col items-center">
                        <Loader />
                        <p className="mt-4">Processing...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            {fileFields.map((field) => (
                                <div key={field.id} className="mb-2">
                                    <input
                                        type="file"
                                        accept={field.accept}
                                        onChange={(e) => handleFileSelect(e, field.type)}
                                        className="hidden"
                                        id={field.id}
                                        multiple
                                    />
                                    <label
                                        htmlFor={field.id}
                                        className='bg-accentColorLight text-black p-[10px] rounded-[10px] cursor-pointer inline-block mr-2'
                                    >
                                        {field.label}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-bold mb-2">Selected Files:</h3>
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center mb-1">
                                        <span>{file.name}</span>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="ml-2 text-red-500"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={processFiles}
                                    className='bg-accentColorLight text-black p-[10px] rounded-[10px] mt-4'
                                >
                                    Process Files
                                </button>
                            </div>
                        )}

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </>
                )}
                <div className='flex justify-between items-center'>
                    <button onClick={onClose} className='bg-primaryColorLight text-white p-[10px] rounded-[10px]'>
                        Cancel
                    </button>
                </div>
                {transcribedResponse && <p className="mt-4">{transcribedResponse}</p>}
            </div>
        </div>
    )
}

export default UploadFilesModal