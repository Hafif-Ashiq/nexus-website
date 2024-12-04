import { SummarizationConfig } from '@/services/Configs'
import React, { useEffect, useState } from 'react'

interface SummarizationConfigModalProps {
    config: SummarizationConfig
    onConfigChange: (newConfig: SummarizationConfig) => void
}

const SummarizationConfigModal = ({ config, onConfigChange }: SummarizationConfigModalProps) => {

    const [selectedType, setSelectedType] = useState<"extractive" | "abstractive">("extractive")
    const [selectedLength, setSelectedLength] = useState<"short" | "medium" | "long">("medium")

    const summarizationStyles = ["Extractive", "Abstractive"]
    const summarizationLengths = ["Short", "Medium", "Long"]

    useEffect(() => {
        setSelectedType(config.type)
        setSelectedLength(config.length)
    }, [config])

    const handleConfigChange = () => {
        let newConfig = {
            type: selectedType,
            length: selectedLength
        }
        onConfigChange(newConfig)
    }

    return (
        <div className='p-[20px] bg-white rounded-[15px] border-[1px] border-borderColorLight py-[20px] shadow-md flex flex-col gap-[15px]'>
            <div className='flex flex-col gap-[15px]'>
                <div className='flex items-center justify-between '>
                    <span className='text-[16px] font-semibold'>Summarization Style</span>
                    <button>
                        <img src="/assets/info-circle.svg" alt="info" />
                    </button>
                </div>
                <div className='flex items-center justify-between bg-accentColorLight rounded-[14px] p-[4px]'>
                    {
                        summarizationStyles.map((sty) => (
                            <button key={sty} className={`flex-1 px-[35px] py-[10px] rounded-[10px] text-[14px] font-semibold ${selectedType === sty.toLowerCase() ? "bg-primaryColorLight text-white" : "bg-transparent text-primaryColorLight"}`}
                                onClick={() => {
                                    setSelectedType(sty.toLowerCase() as "extractive" | "abstractive")
                                }}>
                                {sty}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-[15px]'>

                <span className='text-[16px] font-semibold'>Summarization Length</span>


                <div className='flex items-center justify-between bg-accentColorLight rounded-[14px] p-[4px]'>
                    {
                        summarizationLengths.map((sty) => (
                            <button key={sty} className={`flex-1 px-[35px] py-[10px] rounded-[10px] text-[14px] font-semibold ${selectedLength === sty.toLowerCase() ? "bg-primaryColorLight text-white" : "bg-transparent text-primaryColorLight"}`}
                                onClick={() => {
                                    setSelectedLength(sty.toLowerCase() as "short" | "medium" | "long")
                                }}>
                                {sty}
                            </button>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default SummarizationConfigModal