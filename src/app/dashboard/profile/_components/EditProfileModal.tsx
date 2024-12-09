import React, { useState } from 'react';

interface EditProfileModalProps {
    onClose: () => void;
    initialProfile: {
        first_name: string;
        last_name: string;
        biography: string;
    };
    onUpdate: (profile: {
        first_name: string;
        last_name: string;
        biography: string;
    }) => void;
}

const EditProfileModal = ({ onClose, initialProfile, onUpdate }: EditProfileModalProps) => {
    const [profile, setProfile] = useState({
        first_name: initialProfile.first_name,
        last_name: initialProfile.last_name,
        biography: initialProfile.biography
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateProfile = async () => {
        try {
            setIsLoading(true);
            onUpdate({
                first_name: profile.first_name,
                last_name: profile.last_name,
                biography: profile.biography
            });
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
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
                        Edit Profile
                    </div>
                    <button onClick={onClose} className='border-borderColor border-[2px] border-solid rounded-full'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel.svg" alt="close" />
                    </button>
                </div>

                <div className='w-full h-[2px] bg-borderColor'></div>

                {/* Main Content */}
                <div className='p-[25px] flex flex-col gap-[20px]'>
                    {/* First Name */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>First Name</p>
                        <input
                            type="text"
                            value={profile.first_name}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                first_name: e.target.value
                            }))}
                            className='p-[10px] border-[2px] border-solid border-borderColor rounded-[10px]'
                            placeholder="Enter your first name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>Last Name</p>
                        <input
                            type="text"
                            value={profile.last_name}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                last_name: e.target.value
                            }))}
                            className='p-[10px] border-[2px] border-solid border-borderColor rounded-[10px]'
                            placeholder="Enter your last name"
                        />
                    </div>

                    {/* Biography */}
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>Biography</p>
                        <textarea
                            value={profile.biography}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                biography: e.target.value
                            }))}
                            className='p-[10px] border-[2px] border-solid border-borderColor rounded-[10px] min-h-[100px] resize-y'
                            placeholder="Tell us about yourself"
                        />
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
                        onClick={handleUpdateProfile}
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

export default EditProfileModal;
