import Image from 'next/image';
import React, { useState } from 'react'

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const carouselItems = [
        {
            id: 1,
            image: '/landingPage/heroImage.png',
            title: 'Learn Faster, Understand Better',
            description: 'Translate, summarize, and transcribe seamlessly with NEXUS—bridging English and Urdu to save time and boost productivity.'
        },
        {
            id: 2,
            image: '/landingPage/personalized-experience.png',
            title: 'Design Your Personalized Learning Experience',
            description: 'With NEXUS, personalize your translations, summaries, and transcriptions for a more efficient and tailored experience.'
        },
        {
            id: 3,
            image: '/landingPage/perfect-learning.png',
            title: 'Find the Perfect Learning Tools for You',
            description: 'NEXUS offers seamless translation, summarization, and transcription. Manage content easily, connect with a supportive community, and get reliable support to meet your learning goals.'
        },
        {
            id: 4,
            image: '/landingPage/manage-learning.png',
            title: 'Easy Way to Manage Your Learning Journey',
            description: 'NEXUS offers an easy-to-use app for Android and web, ensuring a seamless experience across all devices.'
        },
    ]

    return (
        <div className="w-full h-full flex flex-col items-center justify-end gap-[32px] ">
            <div className='w-full h-full flex items-center justify-center'>
                <img src={carouselItems[currentSlide].image} alt={carouselItems[currentSlide].title} className=' object-fit rounded-[25px] max-w-[600px] max-h-[600px]' />
            </div>
            <span className='text-[18px] font-medium text-[#00000070] text-center'>
                {carouselItems[currentSlide].description}
            </span>
            <div className="flex space-x-1">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={` h-[10px] rounded-full transition-all duration-500 bg-primaryColorLight ${currentSlide === index ? ' w-[40px]' : 'opacity-50 w-[10px]'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel