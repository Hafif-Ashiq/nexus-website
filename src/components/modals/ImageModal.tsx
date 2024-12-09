import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

interface ImageModalProps {
    imageSelected: string | undefined,
    onClose: () => void,
    onPreviousClick?: () => void,
    onNextClick?: () => void,
    timeout?: number
}

const ImageModal = ({ imageSelected, onClose, onPreviousClick, onNextClick, timeout = 2000 }: ImageModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (imageSelected) {
            setLoading(true); // Set loading to true when a new image is selected
            const img = new Image();
            img.src = imageSelected;
            img.onload = () => setLoading(false);
            img.onerror = () => setLoading(false); // Handle error case
        }
    }, [imageSelected]);

    useEffect(() => {
        if (timeout && !loading && imageSelected) {
            const timer = setTimeout(() => {
                onClose();
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [timeout, loading, imageSelected, onClose]);

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px]'>
                <div className={`relative w-full h-full bg-black flex  items-center rounded-[15px] ${onPreviousClick && onNextClick ? "justify-between" : "justify-center"}`}>
                    {/* Cross */}
                    <button onClick={onClose} className='absolute right-[10px] top-[10px] '>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                    </button>
                    {/* Previous Button */}
                    {onPreviousClick && <button onClick={onPreviousClick}>
                        <img src="/assets/arrow-left-white.svg" alt="" />
                    </button>}
                    {loading ? (
                        <Loader />
                    ) : (
                        <img className="object-contain max-h-full max-w-[80%]" src={imageSelected} alt={"input file"} />
                    )}
                    {/* Next Button */}
                    {onNextClick && <button onClick={onNextClick}>
                        <img src="/assets/arrow-left-white.svg" className='rotate-180' alt="" />
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default ImageModal