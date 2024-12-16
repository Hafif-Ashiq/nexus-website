import React from 'react'

const Testimonials = () => {

    const testimonials = [
        {
            image: "/landingPage/hadid.png",
            name: "Hadid Khan",
            designation: "Web Developer",
            testimonial: "Incredibly helpful! The translation and summarization features are a game changer for my research. It's made learning so much more efficient."
        },
        {
            image: "/landingPage/wade.png",
            name: "Wade Warren",
            designation: "UI/UX Designer",
            testimonial: "NEXUS is intuitive and incredibly versatile. The ability to transcribe, translate, and summarize content all in one place is exactly what I needed."
        },
        {
            image: "/landingPage/jenny.png",
            name: "Jenny Wilson",
            designation: "Trust Advisor",
            testimonial: "I’m so satisfied with how easy it is to manage my content. NEXUS has saved me so much time. It’s exactly what my workflow was missing."
        }
    ]

    return (
        <div className='w-full flex justify-between items-stretch gap-[32px]'>
            {
                testimonials.map((testimonial) => (
                    <div key={testimonial.name} className='flex flex-col justify-between items-start gap-[32px] flex-1 relative backdrop-blur-[16px] bg-[#27322f3d] px-[24px] py-[48px] rounded-[32px] '>
                        <div className='w-[56px] h-[56px] rounded-[50%] bg-landingSecondaryColor flex justify-center items-center'>
                            <img src="/landingPage/assets/quote.svg" alt="" className='w-[24px] h-[24px]' />
                        </div>
                        <div className='flex flex-col justify-start items-start gap-[16px] text-white font-normal leading-[24px] text-[16px]'>
                            “{testimonial.testimonial}”
                        </div>
                        <div className='flex justify-start items-start gap-[8px]'>
                            <img src={testimonial.image} alt="" className='w-[48px] h-[48px] rounded-[50%]' />
                            <div className='flex flex-col justify-start items-start gap-[4px]'>
                                <span className='text-white font-medium leading-[24px] text-[16px]'>{testimonial.name}</span>
                                <span className='text-landingSecondaryColorLight font-normal leading-[24px] text-[16px]'>{testimonial.designation}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Testimonials