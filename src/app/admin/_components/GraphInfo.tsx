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



interface UsersDataProps {
    data: {
        labels: string[];
        datasets: {
            label?: string;
            data: number[];
            borderColor?: string;
            backgroundColor?: string;
            fill?: boolean;
        }[];
    },
    title: string,
    value: string,
    increase?: boolean,
    change?: string
}


const GraphInfo: React.FC<UsersDataProps> = ({ data, increase = false, change = "", title, value }) => {
    return (
        <div className='flex flex-col bg-white px-[35px] py-[32px] rounded-[15px] gap-[22px] shadow-normal basis-[40%]'>
            <div className='flex justify-between items-center '>
                <div className='flex flex-col justify-start gap-[4px]'>
                    <p className='text-[18px] text-[#9291A5] leading-5'>{title}</p>
                    <p className='text-[22px] text-textColorDarkBlue leading-7 font-semibold'>{value}</p>
                </div>
                <div className='flex flex-col justify-end items-end gap-[4px]'>
                    <div className='flex gap-[6px] justify-center items-center'>
                        <p className='text-[16px] text-textColorDarkBlue leading-[18px] font-semibold'>{change}</p>
                        <div
                            className='px-[6px] py-[6px] rounded-full flex justify-center items-center'
                            style={{
                                backgroundColor: increase ? "#04CE00" : "#FF0707",
                                transform: increase ? "" : "rotate(90deg)"
                            }}
                        >
                            <img src="/assets/Arrow-rightup.svg" alt="" />
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

export default GraphInfo