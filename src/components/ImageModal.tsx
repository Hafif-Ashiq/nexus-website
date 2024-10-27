import React from 'react'

interface ImageModalProps {
    imageSelected: string | undefined,
    onClose: () => void,
    onPreviousClick: () => void,
    onNextClick: () => void
}

const ImageModal = ({ imageSelected, onClose, onPreviousClick, onNextClick }: ImageModalProps) => {
    return (
        <div className='absolute inset-0 bg-[#00000090] overflow-hidden flex justify-center items-center'>
            <div className='w-[1000px] h-[800px] bg-white p-[25px] rounded-[25px]'>
                <div className='relative w-full h-full bg-black flex justify-between items-center rounded-[15px]'>
                    {/* Cross */}
                    <button onClick={onClose} className='absolute right-[10px] top-[10px] '>
                        <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                    </button>
                    {/* Previous Button */}
                    <button onClick={onPreviousClick}>
                        <img src="/assets/arrow-left-white.svg" alt="" />
                    </button>
                    <img className="object-contain max-h-full max-w-[80%]" src={imageSelected} alt={"input file"} />
                    {/* Next Button */}
                    <button onClick={onNextClick}>
                        <img src="/assets/arrow-left-white.svg" className='rotate-180' alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageModal