import React, { useState } from 'react'
import ImageModal from '../ImageModal'

interface PostDisplay {
    images: string[]
    text: string
}

const PostDisplay = ({ images, text }: PostDisplay) => {

    const [showMore, setShowMore] = useState(false)
    const [imageSelected, setImageSelected] = useState(0)

    const onPreviousImageClick = () => {
        if (imageSelected == 0) {
            setImageSelected(images.length - 1)
        } else {
            setImageSelected(imageSelected - 1)
        }
    }

    const onNextImageClick = () => {
        if (imageSelected == images.length - 1) {
            setImageSelected(0)
        } else {
            setImageSelected(imageSelected + 1)
        }
    }

    return (
        <div className='flex flex-col gap-[15px] min-h-[20px]'>
            {
                images.length > 0 && <button className='relative' onClick={() => {
                    setShowMore(true)
                }}>
                    <img src={images[0]} alt="" className='object-cover w-full aspect-[5/4]' />
                    {
                        images.length > 1 && <span className='absolute right-[15px] top-[15px] bg-[#ffffffc1] rounded-[4px] py-[4px] px-[8px] font-medium text-primaryColorLight'>+{images.length - 1} more</span>
                    }
                </button>
            }
            <span className='text-[14px] font-medium text-justify'>{text}</span>
            {showMore && <ImageModal imageSelected={images[imageSelected]} onClose={() => setShowMore(false)} onPreviousClick={onPreviousImageClick} onNextClick={onNextImageClick} />}
        </div>
    )
}

export default PostDisplay