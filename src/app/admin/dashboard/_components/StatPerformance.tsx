import PerformanceTitleTile from '@/components/PerformanceTitleTile'
import React, { useState } from 'react'

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

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: [0, 5000, 15000, 20000, 30000, 25000, 15000, 10000, 5000, 15000, 25000, 20000],
            borderColor: '#2A4E8F',
            backgroundColor: '#2A4E8F50',
            fill: false,
            borderDash: [12, 15],  // Define dash pattern
            tension: 0.4
        },
        {
            label: '',
            data: [0, 3000, 10000, 20000, 4000, 25000, 10000, 7000, 10000, 20000, 30000, 10000],
            borderColor: '#FF718B',
            backgroundColor: '#FF718B50',
            fill: false,
            borderDash: [12, 15],  // Define dash pattern
            tension: 0.4
        },
    ],
};


const StatPerformance = () => {

    const [activeDuration, setActiveDuration] = useState(2)

    const performanceTypes = [
        {
            text: "Active Users",
            color: "#2A4E8F"
        },
        {
            text: "API Calls",
            color: "#FF718B"
        },
    ]

    const durationTypes = [
        {
            text: "7 days",
            value: 7
        },
        {
            text: "30 days",
            value: 30
        },
        {
            text: "12 months",
            value: 240
        },
    ]



    return (
        <div className='bg-white shadow-normal px-[24px] py-[26px] rounded-[15px] flex flex-col justify-start gap-[22px] basis-[60%]'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col justify-start gap-[4px]'>
                    <p className='text-[18px] text-[#9291A5] leading-5'>Statistics</p>
                    <p className='text-[22px] text-textColorDarkBlue leading-7 font-semibold'>Performance</p>
                </div>
                <div className='flex items-center justify-end gap-[22px]'>
                    {/* active + api show */}
                    <div className='flex gap-[15px]'>
                        {
                            performanceTypes.map((type, index) => (
                                <PerformanceTitleTile color={type.color} text={type.text} key={index} />
                            ))
                        }
                    </div>
                    <div className='py-[6px] px-[8px] flex justify-center items-center gap-[4px] rounded-[14.77px] bg-[#F4F6F9]'>
                        {durationTypes.map((type, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveDuration(index)}
                                className={`px-[15px] bg-[#F4F6F9] py-[10px] rounded-[10px] ${index == activeDuration ? " text-white" : " text-[#9291A5]"}`}
                                style={{
                                    backgroundColor: index == activeDuration ? "#2A4E8F" : "transparent"
                                }}>
                                {type.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full h-[1px] border-[#E5E5EF] border-[1px] border-solid'></div>
            <div className='h-[300px]'>
                <Line data={data} options={options} />

            </div>
        </div>
    )
}

export default StatPerformance