import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

interface VideoModalProps {
    videoSelected: string | undefined,
    onClose: () => void
}

const VideoModal = ({ videoSelected, onClose }: VideoModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (videoSelected) {
            setLoading(true);
            const video = document.createElement('video');
            video.src = videoSelected;
            video.onloadeddata = () => setLoading(false);
            video.onerror = () => setLoading(false);
        }
    }, [videoSelected]);

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px]'>
                <div className='relative w-full h-full bg-black flex justify-center items-center rounded-[15px]'>
                    {/* Cross */}
                    <button onClick={onClose} className='absolute right-[10px] top-[10px] '>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                    </button>
                    {loading ? (
                        <Loader />
                    ) : (
                        <video
                            className="object-contain max-h-full max-w-[80%]"
                            src={videoSelected}
                            controls
                            autoPlay
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoModal