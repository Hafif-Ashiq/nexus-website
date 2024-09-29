"use client"
import React, { useState } from 'react'
import Header from '../_components/Header'
import LargeButton from '../_components/LargeButton'
import ModelsGraph from './_components/ModelsGraph'

const page = () => {
    const [activeTile, setActiveTile] = useState(0)


    const labelsBarGraph = ["UP VOTES", "DOWN VOTES"];





    const tiles = [
        {
            title: "MT MODEL 1.0",
            value: "2.5k",
            increase: true,
            change: "5.4%",
            data: {
                labels: labelsBarGraph,
                datasets:
                    [
                        {
                            label: '',
                            data: [502, 100],
                            backgroundColor: ['#04CE00', "#B50202"],
                            borderColor: ['#04CE00', "#B50202"],
                            borderWidth: 1,
                            borderRadius: 15,
                            barPercentage: 0.5, // Optional bar settings
                            barThickness: 150,
                            maxBarThickness: 700,
                            minBarLength: 2,

                        },

                    ]
            }
        },
        {
            title: "ATS - Model 1.0",
            value: "3.56k",

            increase: true,
            change: "2.14%",
            data: {
                labels: labelsBarGraph,
                datasets:
                    [
                        {
                            label: '',
                            data: [102, 610],
                            backgroundColor: ['#04CE00', "#B50202"],
                            borderColor: ['#04CE00', "#B50202"],
                            borderWidth: 1,
                            borderRadius: 15,
                            barPercentage: 0.5, // Optional bar settings
                            barThickness: 150,
                            maxBarThickness: 700,
                            minBarLength: 2,

                        },

                    ]

            }
        },
        {
            title: "Whisper X 1.0",
            value: "567",
            increase: false,
            change: "1.24%",
            data: {
                labels: labelsBarGraph,
                datasets:
                    [
                        {
                            label: '',
                            data: [1002, 300],
                            backgroundColor: ['#04CE00', "#B50202"],
                            borderColor: ['#04CE00', "#B50202"],
                            borderWidth: 1,
                            borderRadius: 15,
                            barPercentage: 0.5, // Optional bar settings
                            barThickness: 150,
                            maxBarThickness: 700,
                            minBarLength: 2,

                        },

                    ]
            }
        },
    ]


    return (
        <div className="flex flex-col gap-[30px] flex-1 ">
            <Header title='Configuration' subtitle='' />
            <div className="flex gap-[40px] flex-1">
                <div className='basis-[70%] flex flex-col gap-[20px]'>
                    <div className='flex justify-between items-center gap-[20px]'>
                        {tiles.map((stat, index) => (
                            <LargeButton
                                key={index}
                                activeIcon={"sparkle"}
                                inActiveIcon={"sparkle-blue"}
                                text={stat.value}
                                title={stat.title}
                                increase={stat.increase}
                                change={stat.change}
                                onClick={() => setActiveTile(index)}
                                active={index == activeTile}
                            />
                        ))}
                    </div>
                    {/* <GraphInfo data={tiles[activeTile].data} title={tiles[activeTile].title} value={tiles[activeTile].value} change={tiles[activeTile].change} increase={tiles[activeTile].increase} /> */}
                    <ModelsGraph data={tiles[activeTile].data} title={tiles[activeTile].title} />
                </div>

                {/* <div className='basis-[30%]'>a</div> */}
            </div>
        </div>
    )
}

export default page