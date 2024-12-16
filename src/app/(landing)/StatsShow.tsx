import React from 'react'

const StatsShow = () => {
    const stats = [
        {
            title: "24/7",
            description: "Content Accessibility"
        },
        {
            title: "4.9/5",
            description: "User Satisfaction"
        },
        {
            title: "500+",
            description: "Hours Transcribed"
        }
    ]
    return (
        <div className='w-[80%] flex justify-center items-center gap-[60px] bg-[#27322f3d] rounded-[32px] p-[64px] mx-auto backdrop-blur-[16px]'>
            {stats.map((stat) => (
                <div key={stat.description} className='flex flex-col justify-start items-start gap-[8px] px-[56px]'>
                    <h1 className='text-[48px] font-bold leading-[56px] text-white'>{stat.title}</h1>
                    <p className='text-[16px] font-medium leading-[24px] text-landingPrimaryColor'>{stat.description}</p>
                </div>
            ))}
        </div>
    )
}

export default StatsShow