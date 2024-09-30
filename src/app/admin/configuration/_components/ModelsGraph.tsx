"use client"
import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { AiModelInterface } from '@/services/AiModelsInterface';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            // enabled: false,
            callbacks: {
                title: (tooltipItems: any) => {
                    return ``;
                },
                label: (tooltipItem: any) => {
                    return `${tooltipItem.raw}`;
                },
                // footer: () => {
                //     return 'Custom Footer';
                // },
            },
            // Optional: Set the tooltip position
            position: 'nearest' as const,

        },
        title: {
            display: false,
            // text: 'Monthly Sales'
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};



interface BarGraphDataProps {
    data: {
        labels: string[];

        datasets: {
            barPercentage?: number,
            barThickness?: number,
            maxBarThickness?: number,
            minBarLength?: number,
            data: number[]
            label?: string,

            backgroundColor?: string[],
            borderColor?: string[],
            borderWidth?: number,
            borderRadius?: number

        }[]

    },
    title?: string,
    modelData: AiModelInterface,
    onPrimaryClicked: () => void
}


const ModelsGraph: React.FC<BarGraphDataProps> = ({ data, title, modelData, onPrimaryClicked }) => {
    return (
        <div className='flex h-[80vh] bg-white px-[35px] py-[32px] rounded-[15px] gap-[22px] shadow-normal basis-[40%]'>

            <div className='min-h-[600px] flex-1 flex flex-col justify-between'>
                <div>
                    <div className='text-[#9291A5] text-[18px] '>Activity</div>
                    <div className='text-textColorDarkBlue text-[22px] font-semibold '>{title}</div>
                </div>
                <Bar style={{ maxHeight: 500 }} data={data} options={options} />
            </div>
            <div className='h-full w-[1px] border-[#E5E5EF] border-[1px] border-solid'></div>

            <div className='flex-1 flex flex-col justify-between gap-[20px]'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-[20px] font-semibold text-black'>AI Model Details</h3>

                    <button onClick={() => { }}>
                        <img src="/assets/more-circle.svg" alt="" />
                    </button>


                </div>
                <div className='flex flex-col flex-1 justify-between gap-[20px]'>
                    <div className='flex flex-col gap-[14px] '>
                        <label htmlFor="model-name" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Model Name</p>

                            <input
                                type="text"
                                name='model-name'
                                className='input-field w-full'
                                value={modelData.model_name}
                                placeholder='Model Name'
                                onChange={(event) => { }}
                            />


                        </label>
                        <label htmlFor="endpoint" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Endpoint Access</p>
                            <input
                                type="text"
                                name='endpoint'
                                className='input-field w-full'
                                value={modelData.endpoint}
                                placeholder='Endpoint'
                                onChange={(event) => { }}
                            />
                        </label>
                        <label htmlFor="status" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Status</p>
                            <input
                                type="text"
                                name='status'
                                className={`input-field w-full`}
                                style={{
                                    color: modelData.active_status ? "#2B9F03" : "#B50202"
                                }}
                                disabled
                                value={modelData.active_status ? "Active" : "InActive"}
                                placeholder='email@gmail.com'
                            />
                        </label>
                        <label htmlFor="upVotes" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Total Up Votes</p>
                            <input
                                type="number"
                                name='upVotes'
                                className='input-field w-full'
                                value={modelData.total_up_votes}
                                placeholder='0'
                                disabled={true}

                            />
                        </label>
                        <label htmlFor="downVotes" className='flex flex-col gap-[10px]'>
                            <p className='text-[16px] font-bold text-primaryColorLight'>Total Down Votes</p>
                            <input
                                type="number"
                                name='downVotes'
                                className='input-field w-full'
                                value={modelData.total_down_votes}
                                placeholder='0'
                                disabled={true}
                            />
                        </label>
                    </div>

                    <button onClick={onPrimaryClicked} className={` ${modelData.active_status ? "bg-warningColor" : "bg-primaryColorLight"} py-[14px] w-full flex justify-center items-center rounded-[15px] text-[16px] font-semibold text-white disabled:opacity-50`}>{modelData.active_status ? "Deactivate Model" : "Activate Model"}</button>
                </div>

            </div>
        </div>
    )
}

export default ModelsGraph