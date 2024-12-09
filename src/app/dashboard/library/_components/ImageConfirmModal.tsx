import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';

interface ImageConfirmModalProps {
    imageSelected: string | undefined,
    onClose: () => void,
    onConfirm: () => void
}

const ImageConfirmModal = ({ imageSelected, onClose, onConfirm }: ImageConfirmModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (imageSelected) {
            setLoading(true);
            const img = new Image();
            img.src = imageSelected;
            img.onload = () => setLoading(false);
            img.onerror = () => setLoading(false);
        }
    }, [imageSelected]);

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px]'>
                <div className='relative w-full h-full flex flex-col'>
                    <div className='flex-1 bg-black rounded-[15px] flex justify-center items-center'>
                        {/* Cross */}
                        <button onClick={onClose} className='absolute right-[10px] top-[10px]'>
                            <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                        </button>

                        {loading ? (
                            <Loader />
                        ) : (
                            <img className="object-contain max-h-full max-w-[80%]" src={imageSelected} alt={"preview image"} />
                        )}
                    </div>

                    <div className='flex justify-end gap-4 mt-4'>
                        <button
                            onClick={onClose}
                            className='px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className='px-6 py-2 rounded-lg bg-primaryColorLight hover:bg-primaryColor text-white font-medium'
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageConfirmModal;
