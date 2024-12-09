import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CheckBox from '@/components/CheckBox';
import { createPost } from '@/firebaseFunctions/user/postFunctions/createPost';

interface CreateCommunityPostModalProps {
    onClose: () => void;
}

const CreateCommunityPostModal = ({ onClose }: CreateCommunityPostModalProps) => {
    const [postText, setPostText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [permissions, setPermissions] = useState({
        allowComments: true,
        allowLikes: true,
        allowShares: true
    });
    const [visibility, setVisibility] = useState('public');
    const [isLoading, setIsLoading] = useState(false);

    const userId = useSelector((state: RootState) => state.userReducer.userId);

    const permissionsList = [
        { id: 'allowComments', label: 'Allow Comments' },
        { id: 'allowLikes', label: 'Allow Likes' },
        { id: 'allowShares', label: 'Allow Shares' },
    ];

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleCreatePost = async () => {
        try {
            setIsLoading(true);
            const postId = await createPost({
                userId: userId,
                description: postText,
                files: selectedFiles,
                permissions: {
                    is_private: visibility === 'private',
                    comment_allowed: permissions.allowComments,
                    like_allowed: permissions.allowLikes,
                    share_allowed: permissions.allowShares
                }
            });

            console.log(postId);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
            // Optionally add error handling here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[1000px] h-[900px] bg-white rounded-[25px] overflow-hidden flex flex-col'>
                {/* Header */}
                <div className='flex justify-between items-center pb-[20px] px-[25px] pt-[25px]'>
                    <div className='text-[24px] font-semibold'>
                        Create Post
                    </div>
                    <button onClick={onClose} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" alt="close" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Main Content */}
                <div className='flex-1 flex'>
                    {/* Left Side */}
                    <div className='flex-1 p-[25px] flex flex-col gap-[20px]'>
                        {/* Profile Row */}
                        <div className='flex items-center gap-[15px]'>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                <img src="/user-image.jpg" alt="profile" className='w-full h-full object-cover' />
                            </div>
                            <div className='flex-1'>
                                <p className='font-semibold text-[16px]'>John Doe</p>
                            </div>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                                className='px-4 py-2 bg-accentColorLight rounded-[10px] font-medium cursor-pointer outline-none hover:border-primaryColorLight border-transparent border-[3px] border-solid transition-all duration-300 focus:border-primaryColorLight focus:outline-none'
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        {/* Text Input */}
                        <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            placeholder="What's on your mind?"
                            className='p-[13px] font-semibold text-[16px] w-full border-borderColor border-[3px] border-solid rounded-[15px] text-primaryColorLight placeholder:text-primaryColorLight placeholder:opacity-50 focus:outline-primaryColorLight resize-none'
                            style={{
                                scrollbarWidth: "none",
                                maxHeight: '120px',
                                minHeight: '50px'
                            }}
                        />

                        {/* Upload Section */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                            multiple
                        />
                        <label
                            htmlFor="file-upload"
                            className='bg-accentColorLight text-black h-[200px] rounded-[10px] cursor-pointer text-center flex flex-col items-center justify-center gap-[10px]'
                        >
                            <img src="/assets/document-upload.svg" alt="upload" />
                            <span className='text-[16px] font-semibold'>Upload</span>
                        </label>

                        {/* Permissions */}
                        <div className='flex flex-col gap-[15px]'>
                            <h3 className='font-bold'>Permissions</h3>
                            <div className='flex flex-col gap-[10px]'>
                                {permissionsList.map((permission) => (
                                    <label key={permission.id} className='flex items-center justify-between gap-[10px] bg-accentColorLight p-3 rounded-[10px]'>
                                        <span className='text-[16px] font-semibold'>{permission.label}</span>
                                        <CheckBox
                                            checked={permissions[permission.id as keyof typeof permissions]}
                                            onChange={(checked) => setPermissions(prev => ({
                                                ...prev,
                                                [permission.id]: checked
                                            }))}
                                        />

                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='w-[2px] bg-borderColor'></div>

                    {/* Right Side */}
                    <div className='flex-1 p-[25px]'>
                        <h3 className="font-bold mb-4">Selected Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview ${index}`}
                                        className="w-full h-[150px] object-cover rounded-[10px]"
                                    />
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                                    >
                                        <img src="/assets/cancel.svg" alt="remove" className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Area */}
                <div className='w-full h-[2px] bg-borderColor'></div>
                <div className='p-[25px] flex justify-end'>
                    <button
                        onClick={handleCreatePost}
                        disabled={isLoading}
                        className='bg-primaryColorLight text-white rounded-[15px] px-8 py-3 text-[16px] font-semibold disabled:opacity-50 flex items-center gap-2'
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating...
                            </>
                        ) : 'Create Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCommunityPostModal;
