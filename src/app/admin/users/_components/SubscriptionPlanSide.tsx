import React, { useEffect, useState } from 'react'

interface subscriptionPlanProps {
    onBack: () => void;
}

const SubscriptionPlanSide: React.FC<subscriptionPlanProps> = ({ onBack }) => {

    const [currentPlan, setCurrentPlan] = useState(0)

    const plans = [
        {
            title: "Monthly",
            price: "9.99",
            tagline: "Empower Your Words - Monthly AI Magic for Summarization and Translation!",
            bg: "/bgs/monthly-sub.png"
        },
        {
            title: "Twice a Year",
            price: "39.99",
            tagline: "Stay Ahead, Stay Smart - Bi-Annual AI Summarization and Translation at Your Fingertips!",
            bg: "/bgs/twice-sub.png"
        },
        {
            title: "Yearly",
            price: "79.99",
            tagline: "AI Unleashed - Year-Round Summarization and Translation Excellence!",
            bg: "/bgs/yearly-sub.png"
        },
    ]


    return (
        <div className='flex flex-col gap-[10px] h-full justify-between'>

            <div className='flex justify-start items-center gap-[14px]'>
                <button onClick={onBack}>
                    <img src="/assets/small-arrow-left-black.svg" alt="" />
                </button>
                <h3 className='text-[20px] font-semibold text-black'>Subscription Plans</h3>
            </div>

            <div className='flex flex-col gap-[10px] relative'>
                {plans.map((plan, index) => (
                    <button
                        onClick={() => setCurrentPlan(index)}
                        className={`relative flex-1 text-left min-w-[415px] min-h-[147.5px] p-[15px] overflow-hidden rounded-[15px] border-[2px] border-solid ${index == currentPlan ? " border-primaryColorLight" : "border-white"} box-content`}
                    >
                        <img src={plan.bg} alt="" className='w-full h-full absolute inset-0 object-cover z-[0]' />
                        <div className='bg-gradient-to-b from-[#00000010] to-[#00000050] absolute inset-0 z-1'></div>
                        <div className='flex flex-col h-full bg-transparent z-[2] relative'>
                            <div className='flex  justify-between items-center'>
                                <h2 className='text-[32px] text-white font-semibold'>{plan.title}</h2>
                                {
                                    index == currentPlan
                                    &&
                                    <div className='flex justify-end items-center gap-[7px]'>
                                        <p className='text-[14px] font-semibold text-black '>Current Plan</p>
                                        <img src="/assets/tick-circle-blue.svg" alt="" />
                                    </div>
                                }
                            </div>
                            <div className='flex flex-1 justify-between'>
                                <p className='text-[12px] text-white opacity-50 font-medium max-w-[60%]'>{plan.tagline}</p>
                                <div className='flex justify-end items-end'>
                                    <p className='text-[40px] font-semibold text-white'>${plan.price}</p>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SubscriptionPlanSide