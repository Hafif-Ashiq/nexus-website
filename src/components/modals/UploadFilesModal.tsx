import React, { useState } from 'react';
import Loader from '../Loader';
import { extractAudioFromVideo } from '../../backendFunctions/extractAudio';
import { getTextFromAudio } from '../../backendFunctions/getTextFromBackend';
import { extractTextFromPDF } from '../../backendFunctions/extractTextFromPDF';
import { extractTextFromDOCX } from '../../backendFunctions/extractTextFromDOCX';
import { getTextFromImage } from '../../backendFunctions/getTextFromBackend';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { summarize } from '@/backendFunctions/summarization';
import { addContent, addSummarizationText, addTranslationText } from '@/firebaseFunctions/user/contentFunctions/addContent';
import { ContentType } from '@/services/ContentInterface';
import { SummarizationConfig, TranslationConfig } from '@/services/Configs';
import { uploadContentFile } from '@/firebaseFunctions/user/contentFunctions/uploadFiles';
import { translate } from '@/backendFunctions/translation';


interface UploadFilesModalProps {
    onClose: () => void
}

interface FileStatus {
    file: File;
    status: 'pending' | 'processing' | 'completed' | 'error';
    result?: string;
}

const UploadFilesModal = ({ onClose }: UploadFilesModalProps) => {

    const userId = useSelector((state: RootState) => state.userReducer.userId)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [processType, setProcessType] = useState<'translation' | 'summarization'>('translation');
    const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([]);

    const translationModelId = useSelector((state: RootState) => state.aiModelsReducer.translationModelId)
    const abstractiveSummarizationModelId = useSelector((state: RootState) => state.aiModelsReducer.abstractiveSummarizationModelId)
    const extractiveSummarizationModelId = useSelector((state: RootState) => state.aiModelsReducer.extractiveSummarizationModelId)
    const allModels = useSelector((state: RootState) => state.aiModelsReducer.allModels)

    // const userIsPremium = useSelector((state: RootState) => state.userReducer.user?.is_premium) 
    const userIsPremium = true

    const fileTypes = {
        video: 'video/*',
        audio: 'audio/*',
        document: 'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        image: 'image/*'
    }

    const fileIcons = {
        video: "/assets/contentTypes/video-blue.svg",
        audio: "/assets/contentTypes/audio-blue.svg",
        pdf: "/assets/contentTypes/document-blue.svg",
        docx: "/assets/contentTypes/document-blue.svg",
        image: "/assets/contentTypes/image-blue.svg"
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('video/')) return fileIcons.video;
        if (fileType.startsWith('audio/')) return fileIcons.audio;
        if (fileType.startsWith('application/pdf')) return fileIcons.pdf;
        if (fileType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return fileIcons.docx;
        if (fileType.startsWith('image/')) return fileIcons.image;
        return "/assets/file-icon.svg"; // default icon
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

    const processVideoFile = async (file: File) => {
        const { file: audioFile } = await extractAudioFromVideo(file);

        const extractedText = await getTextFromAudio(audioFile);
        await handleProcess(extractedText, ContentType.VIDEO, file);

    };

    const processAudioFile = async (file: File) => {
        const extractedText = await getTextFromAudio(file);
        await handleProcess(extractedText, ContentType.AUDIO, file);

    };

    const processPDFFile = async (file: File) => {
        const extractedText = await extractTextFromPDF(file);
        await handleProcess(extractedText, ContentType.DOCUMENT, file);

    };

    const processImageFile = async (file: File) => {
        const extractedText = await getTextFromImage(file);
        await handleProcess(extractedText, ContentType.IMAGE, file);

    };

    const processDOCXFile = async (file: File) => {
        const extractedText = await extractTextFromDOCX(file);
        await handleProcess(extractedText, ContentType.DOCUMENT, file);

    };

    const processFiles = async () => {
        setError(null);
        setLoading(true);
        const results: string[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            setFileStatuses(prev => prev.map((status, idx) =>
                idx === i ? { ...status, status: 'processing' } : status
            ));

            try {

                if (file.type.startsWith('video/')) {
                    await processVideoFile(file);
                } else if (file.type.startsWith('audio/')) {
                    await processAudioFile(file);
                } else if (file.type.startsWith('application/pdf')) {
                    await processPDFFile(file);
                } else if (file.type.startsWith('image/')) {
                    await processImageFile(file);
                } else if (file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                    await processDOCXFile(file);
                }


                setFileStatuses(prev => prev.map((status, idx) =>
                    idx === i ? { ...status, status: 'completed' } : status
                ));
            } catch (err) {
                console.error(`Failed to process ${file.name}:`, err);
                results.push(`Failed to process ${file.name}`);
                setFileStatuses(prev => prev.map((status, idx) =>
                    idx === i ? { ...status, status: 'error' } : status
                ));
            }
        }


        setLoading(false);
        onClose()
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length + selectedFiles.length > 5) {
                setError('Maximum 5 files allowed');
                return;
            }
            const newFileStatuses = files.map(file => ({
                file,
                status: 'pending' as const
            }));
            setFileStatuses(prev => [...prev, ...newFileStatuses]);
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setFileStatuses(prev => prev.filter((_, i) => i !== index));
    };


    const handleProcess = async (extracted_text: string, content_type: ContentType, file: File) => {
        if (processType === 'translation') {
            await handleTranslation(extracted_text, content_type, file);
        } else {
            await handleTextSummarization(extracted_text, content_type, file);
        }

    }


    const handleTextSummarization = async (extracted_text: string, content_type: ContentType, file: File) => {
        console.log("in handleTextSummarization");

        // Extract file name without extension
        const title = file.name.split('.').slice(0, -1).join('.');

        if (userIsPremium) {
            let modelId = abstractiveSummarizationModelId
            let model = allModels.find(model => model.model_id === modelId)
            let config = {
                type: "abstractive",
                length: "medium"
            }

            const content = await addContent(userId, title, extracted_text, content_type, false, true, config as SummarizationConfig)
            console.log("content", content);
            console.log("model", model);
            if (model) {
                const res = await summarize(extracted_text, "medium", model.endpoint);
                console.log(res);
                await uploadContentFile(userId, file, content.content_id);
                await addSummarizationText(userId, content.content_id, res.text);
            }

            console.log("done");


        }
        else {
            let modelId = extractiveSummarizationModelId
            let model = allModels.find(model => model.model_id === modelId)
            let config = {
                type: "extractive",
                length: "medium"
            }

            const content = await addContent(userId, title, extracted_text, content_type, false, true, config as SummarizationConfig)
            console.log("content", content);
            console.log("model", model);
            if (model) {
                const res = await summarize(extracted_text, "medium", model.endpoint);
                console.log(res);
                await uploadContentFile(userId, file, content.content_id);
                await addSummarizationText(userId, content.content_id, res.text);
            }

            console.log("done");
        }

    }

    const handleTranslation = async (extracted_text: string, content_type: ContentType, file: File) => {
        const title = file.name.split('.').slice(0, -1).join('.');

        let modelId = translationModelId
        let model = allModels.find(model => model.model_id === modelId)
        let config = {
            source_languages: ["English"],
            target_languages: ["Urdu"],
        }

        const content = await addContent(userId, title, extracted_text, content_type, false, true, config as TranslationConfig)
        console.log("content", content);
        console.log("model", model);
        if (model) {
            const res = await translate(extracted_text, "English", "Urdu", model.endpoint);
            console.log(res);
            await uploadContentFile(userId, file, content.content_id);
            await addTranslationText(userId, content.content_id, res.text);
        }
    }

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[1000px] h-[800px] bg-white  rounded-[25px] overflow-hidden flex flex-col'>
                {/* Header */}
                <div className='flex justify-between items-center pb-[20px] px-[25px] pt-[25px]'>
                    <div className='text-[24px] font-semibold'>
                        Upload Files
                    </div>
                    <button onClick={onClose} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" alt="close" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Main Content */}
                <div className='flex-1 flex'>
                    {/* Left Side */}
                    <div className='flex-1 p-[25px]'>
                        <h3 className="font-bold mb-4">Selected Files</h3>
                        <div className="flex-1 overflow-y-auto flex flex-col gap-[10px]">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-[10px] bg-accentColorLight rounded-[15px]">
                                    <div className="flex items-center flex-1 gap-[20px]">
                                        <div className='w-[50px] h-[50px] p-[13px] bg-white rounded-[5px]'>
                                            <img
                                                src={getFileIcon(file.type)}
                                                alt="file type"
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="truncate text-[14px] font-semibold max-w-[200px]">{file.name}</span>
                                            <span className="text-sm text-gray-500">
                                                {fileStatuses[index]?.status === 'pending' && 'Pending'}
                                                {fileStatuses[index]?.status === 'processing' && 'Processing...'}
                                                {fileStatuses[index]?.status === 'completed' && 'Completed'}
                                                {fileStatuses[index]?.status === 'error' && 'Error'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="ml-2"
                                    >
                                        <img src="/assets/cancel.svg" alt="close" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='w-[2px] bg-borderColor'></div>

                    {/* Right Side */}
                    <div className='flex-1 p-[25px] flex flex-col items-center justify-center' onDrop={handleDrop} onDragOver={handleDragOver}>
                        {loading ?
                            <div className="w-full h-full flex items-center justify-center flex-col gap-[10px]">
                                <Loader />
                                <span className='text-[16px] font-semibold'>Processing...</span>
                            </div> :
                            <>
                                <input
                                    type="file"
                                    accept={Object.values(fileTypes).join(',')}
                                    onChange={(e) => handleFileSelect(e, 'all')}
                                    className="hidden"
                                    id="file-upload"
                                    multiple
                                />
                                <label
                                    htmlFor="file-upload"
                                    className='bg-accentColorLight text-black w-full h-full rounded-[10px] cursor-pointer text-center mb-4 flex flex-col  items-center justify-center   gap-[10px]'
                                >
                                    <img src="/assets/document-upload.svg" alt="upload" />
                                    <span className='text-[16px] font-semibold'>Choose Files to Upload</span>
                                </label>
                                <p className="text-sm text-gray-500 text-center">
                                    Supported formats:<br />
                                    Video, Audio, PDF, DOCX, Images
                                </p>
                            </>
                        }
                    </div>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Bottom Area */}
                <div className='px-[25px] flex'>
                    {/* Left Side */}
                    <div className='flex-1 w-full pt-[25px] pb-[25px] pr-[25px]'>
                        <label className='flex w-full flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Process Type</p>
                            <select
                                value={processType}
                                onChange={(e) => setProcessType(e.target.value as 'translation' | 'summarization')}
                                className='input-field w-full'
                            >
                                <option value="translation" className='text-primaryColorLight font-semibold'>Translation</option>
                                <option value="summarization" className='text-primaryColorLight font-semibold'>Summarization</option>
                            </select>
                        </label>
                    </div>

                    {/* Divider */}
                    <div className='w-[2px] bg-borderColor'></div>

                    {/* Right Side */}
                    <div className='flex-1 pb-[25px] pt-[25px] pl-[25px]  flex-col justify-end items-end'>
                        <p className="text-[14px] text-gray-500 mb-[15px]">
                            {selectedFiles.length}/5 files selected
                        </p>

                        <button
                            onClick={processFiles}
                            disabled={selectedFiles.length === 0 || loading}
                            className='bg-primaryColorLight text-white rounded-[15px] text-[16px] w-full font-semibold disabled:opacity-50 h-[50px]'
                        >
                            {loading ? "Processing..." : "Upload Files"}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

            </div>
        </div>
    );
};

export default UploadFilesModal; 