import React, { useState } from 'react';
import { createNewSupportChat } from '@/firebaseFunctions/user/supportChat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedUserSupportChat } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';

interface NewIssueModalProps {
    onClose: () => void;
}

const NewIssueModal = ({ onClose }: NewIssueModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState<"AI Features" | "Community" | "Application" | "Custom">("AI Features");

    const userId = useSelector((state: RootState) => state.userReducer.userId);
    const dispatch = useDispatch();

    const handleCreateIssue = async () => {
        try {
            setIsLoading(true);
            const newIssue = await createNewSupportChat({
                userId,
                issueCategory: category
            });
            dispatch(setSelectedUserSupportChat(newIssue));
            onClose();
        } catch (error) {
            console.error('Error creating new issue:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[500px] bg-white rounded-[25px] overflow-hidden flex flex-col'>
                {/* Header */}
                <div className='flex justify-between items-center pb-[20px] px-[25px] pt-[25px]'>
                    <div className='text-[24px] font-semibold'>
                        Create New Support Issue
                    </div>
                    <button onClick={onClose} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" alt="close" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Main Content */}
                <div className='p-[25px] flex flex-col gap-[20px]'>
                    {/* Category Selection */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>What type of issue are you experiencing?</p>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as "AI Features" | "Community" | "Application" | "Custom")}
                            className='p-[10px] border-[2px] border-solid border-borderColor rounded-[15px] w-full text-[16px] text-primaryColorLight font-medium'
                        >
                            <option value="AI Features">AI Features</option>
                            <option value="Community">Community</option>
                            <option value="Application">Application</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className='p-[25px] flex justify-end gap-[10px]'>
                    <button
                        onClick={onClose}
                        className='px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateIssue}
                        disabled={isLoading}
                        className='px-6 py-2 rounded-lg bg-primaryColorLight hover:bg-primaryColor text-white font-medium disabled:opacity-50'
                    >
                        {isLoading ? 'Creating...' : 'Create Issue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewIssueModal;
