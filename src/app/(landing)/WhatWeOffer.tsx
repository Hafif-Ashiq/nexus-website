import React from 'react'

const WhatWeOffer = () => {

    const offers = [
        {
            icon: "/landingPage/assets/translate.svg",
            title: "Seemless Translations",
            description: "Quickly translate text, audio, and video between English and Urdu."
        },
        {
            icon: "/landingPage/assets/book.svg",
            title: "AI-Powered Summaries",
            description: "Instantly condense long content into key insights.."
        },
        {
            icon: "/landingPage/assets/microphone.svg",
            title: "Accurate Transcriptions",
            description: "Convert audio and video to text with high accuracy."
        }
    ]

    return (
        <div className='w-full flex justify-center items-center gap-[64px] flex-col'>
            <h2 className='text-[40px] font-bold leading-[56px] text-white'>What We Offer</h2>
            <div className='flex justify-between items-center gap-[32px] w-full'>
                {
                    offers.map((offer) => (
                        <div key={offer.title} className='flex justify-start items-start gap-[16px]'>
                            <div className='w-[64px] h-[64px] bg-landingSecondaryColor rounded-[32px] flex justify-center items-center'>
                                <img src={offer.icon} alt={offer.title} className='w-[32px] h-[32px]' />
                            </div>
                            <div>
                                <h3 className='text-[24px] font-medium   leading-[32px] text-white'>{offer.title}</h3>
                                <p className='text-[16px] font-normal leading-[24px] text-landingSecondaryColorLight max-w-[280px]'>{offer.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default WhatWeOffer