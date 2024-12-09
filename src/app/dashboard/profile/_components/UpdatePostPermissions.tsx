import React, { useState } from 'react';
import CheckBox from '@/components/CheckBox';

interface UpdatePostPermissionsProps {
    onClose: () => void;
    initialPermissions: {
        is_private: boolean;
        comment_allowed: boolean;
        like_allowed: boolean;
        share_allowed: boolean;
    };
    onUpdate: (permissions: {
        is_private: boolean;
        comment_allowed: boolean;
        like_allowed: boolean;
        share_allowed: boolean;
    }) => void;
}

const UpdatePostPermissions = ({ onClose, initialPermissions, onUpdate }: UpdatePostPermissionsProps) => {
    const [permissions, setPermissions] = useState({
        allowComments: initialPermissions.comment_allowed,
        allowLikes: initialPermissions.like_allowed,
        allowShares: initialPermissions.share_allowed
    });
    const [visibility, setVisibility] = useState(initialPermissions.is_private ? 'private' : 'public');
    const [isLoading, setIsLoading] = useState(false);

    const permissionsList = [
        { id: 'allowComments', label: 'Allow Comments' },
        { id: 'allowLikes', label: 'Allow Likes' },
        { id: 'allowShares', label: 'Allow Shares' },
    ];

    const handleUpdatePermissions = async () => {
        try {
            setIsLoading(true);
            onUpdate({
                is_private: visibility === 'private',
                comment_allowed: permissions.allowComments,
                like_allowed: permissions.allowLikes,
                share_allowed: permissions.allowShares
            });
            onClose();
        } catch (error) {
            console.error('Error updating permissions:', error);
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
                        Update Post Permissions
                    </div>
                    <button onClick={onClose} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" alt="close" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Main Content */}
                <div className='p-[25px] flex flex-col gap-[20px]'>
                    {/* Visibility */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>Who can see your post?</p>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className='p-[10px] border-[2px] border-solid border-borderColor rounded-[10px]'
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {/* Permissions */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>Permissions</p>
                        <div className='flex flex-col gap-[15px]'>
                            {permissionsList.map((item) => (
                                <div key={item.id} className='flex items-center gap-[10px]'>
                                    <CheckBox
                                        checked={permissions[item.id as keyof typeof permissions]}
                                        onChange={(checked) => setPermissions(prev => ({
                                            ...prev,
                                            [item.id]: checked
                                        }))}
                                    />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
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
                        onClick={handleUpdatePermissions}
                        disabled={isLoading}
                        className='px-6 py-2 rounded-lg bg-primaryColorLight hover:bg-primaryColor text-white font-medium disabled:opacity-50'
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostPermissions;
