"use client"
import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: 'bottom' as const,
            display: false

        },
        title: {
            display: false,

        },

    },
};

const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: [62, 100, 500, 650, 230, 324, 234],
            borderColor: '#2A4E8F',
            backgroundColor: '#93AAFD30',
            fill: true

        }
    ],
};


const ActiveUsers = () => {
    return (
        <div className='flex flex-col bg-white px-[35px] py-[32px] rounded-[15px] gap-[22px] shadow-normal basis-[40%]'>
            <div className='flex justify-between items-center '>
                <div className='flex flex-col justify-start gap-[4px]'>
                    <p className='text-[18px] text-[#9291A5] leading-5'>Active users</p>
                    <p className='text-[22px] text-textColorDarkBlue leading-7 font-semibold'>6345</p>
                </div>
                <div className='flex flex-col justify-end items-end gap-[4px]'>
                    <div className='flex gap-[6px] justify-center items-center'>
                        <p className='text-[16px] text-textColorDarkBlue leading-[18px] font-semibold'>1.3%</p>
                        <div className='px-[6px] py-[6px] rounded-full bg-[#04CE00] flex justify-center items-center'>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.13569 3.11844L6.83324 3.4053C5.21483 4.94029 3.59627 6.47543 1.97754 8.01073C1.65009 8.32131 1.26318 8.38933 0.87674 8.21972C0.504458 8.05369 0.300152 7.74982 0.354413 7.38241C0.403165 7.11695 0.535212 6.87161 0.7333 6.67846C2.29839 5.16718 3.88377 3.67515 5.46302 2.1773L5.76217 1.89357C5.66564 1.87792 5.56831 1.86717 5.47057 1.86135C4.83736 1.85867 4.20368 1.86448 3.57094 1.85688C3.06985 1.85151 2.72399 1.52437 2.71739 1.06969C2.71078 0.573836 3.02455 0.241328 3.54877 0.238195C5.00518 0.229244 6.46081 0.2282 7.91564 0.235062C8.50403 0.238195 8.83526 0.539824 8.84611 1.09162C8.87285 2.46133 8.88874 3.83119 8.89377 5.20119C8.89566 5.70331 8.55121 5.99868 8.02511 5.99465C7.52874 5.99017 7.20222 5.68765 7.18712 5.19985C7.17108 4.62076 7.16967 4.04122 7.1607 3.46168C7.15881 3.37039 7.14655 3.28089 7.13569 3.11844Z" fill="white" />
                            </svg>

                        </div>
                    </div>
                    <p className='text-[#615E83] text-[14px] uppercase'>VS LAST WEEK</p>
                </div>
            </div>
            <div className='w-full h-[1px] border-[#E5E5EF] border-[1px] border-solid'></div>
            <div className='min-h-[300px]'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default ActiveUsers