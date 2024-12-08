import React, { useEffect, useRef } from 'react';

interface AudioModalProps {
    audioSelected: string | undefined,
    onClose: () => void
}

const AudioModal = ({ audioSelected, onClose }: AudioModalProps) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        return () => {
        };
    }, [audioSelected]);

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[600px] h-[600px] bg-white p-[25px] rounded-[25px]'>
                <div className='relative w-full h-full bg-black flex flex-col justify-center items-center py-[25px] rounded-[15px]'>
                    <button onClick={onClose} className='absolute right-[10px] top-[10px]'>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                    </button>

                    <audio
                        ref={audioRef}
                        controls
                        className="w-[80%]"
                    >
                        <source src={audioSelected} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    )
}

export default AudioModal
