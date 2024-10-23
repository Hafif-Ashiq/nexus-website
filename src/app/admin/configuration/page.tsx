"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LargeButton from '../_components/LargeButton'
import ModelsGraph from './_components/ModelsGraph'
import { getAllModels, updateModel } from '@/firebaseFunctions/aiModels'
import { AiModelInterface } from '@/services/AiModelsInterface'

const page = () => {
    const [activeTile, setActiveTile] = useState(0)

    const [tiles, setTiles] = useState<AiModelInterface[]>([])

    const barGraphLabels = ["UP VOTES", "DOWN VOTES"];




    useEffect(() => {
        getModels()
    }, [])

    const getModels = () => {
        getAllModels().then(res => {
            setTiles(res)
        })
    }

    const getGraphData = (tile: AiModelInterface) => {
        const data = {
            labels: barGraphLabels,
            datasets:
                [
                    {
                        label: '',
                        data: [tile.total_up_votes, tile.total_down_votes],
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

        return data
    }

    const onUpdateClicked = (tile: AiModelInterface) => {
        updateModel(tile.model_id, { active_status: tile.active_status ? false : true }).then(res => {
            console.log(res);
            getModels()
        })
    }

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
                                text={stat.total_up_votes.toString()}
                                title={stat.model_name}
                                increase={false}
                                onClick={() => setActiveTile(index)}
                                active={index == activeTile}
                            />
                        ))}
                    </div>
                    {/* <GraphInfo data={tiles[activeTile].data} title={tiles[activeTile].title} value={tiles[activeTile].value} change={tiles[activeTile].change} increase={tiles[activeTile].increase} /> */}
                    {tiles.length > 0 ?
                        <ModelsGraph
                            data={getGraphData(tiles[activeTile])}
                            title={tiles[activeTile].model_name}
                            modelData={tiles[activeTile]}
                            onPrimaryClicked={() => onUpdateClicked(tiles[activeTile])}
                        />

                        :
                        <></>}
                </div>

                {/* <div className='basis-[30%]'>a</div> */}
            </div>
        </div>
    )
}

export default page