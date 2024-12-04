import { SummarizationConfig, TranslationConfig } from '@/services/Configs'
import React, { useEffect, useState } from 'react'

interface TranslationConfigModalProps {
    config: TranslationConfig
    onConfigChange: (newConfig: TranslationConfig) => void
}

const TranslationConfigModal = ({ config, onConfigChange }: TranslationConfigModalProps) => {

    const [selectedSourceLanguage, setSelectedSourceLanguage] = useState<string>(config.source_language)
    const [selectedTargetLanguage, setSelectedTargetLanguage] = useState<string>(config.target_language)


    const sourceLanguages = ["English",]
    const targetLanguages = ["Urdu"]




    const handleConfigChange = () => {
        let newConfig = {
            source_language: selectedSourceLanguage,
            target_language: selectedTargetLanguage
        }
        onConfigChange(newConfig)
    }

    useEffect(() => {
        if (selectedSourceLanguage !== config.source_language || selectedTargetLanguage !== config.target_language) {
            handleConfigChange()
        }
    }, [selectedSourceLanguage, selectedTargetLanguage])

    return (
        <div className='p-[20px] bg-white rounded-[15px] border-[1px] border-borderColorLight py-[20px] shadow-md flex flex-col gap-[15px]'>
            <div className='flex flex-col gap-[15px]'>

                <span className='text-[16px] font-semibold'>Source Language</span>

                <div className='flex items-center justify-between bg-accentColorLight rounded-[14px] p-[4px]'>
                    <select
                        value={selectedSourceLanguage}
                        onChange={(e) => setSelectedSourceLanguage(e.target.value)}
                        className="flex-1 min-w-[300px] px-[35px] py-[10px] rounded-[10px] text-[14px] font-semibold bg-accentColorLight"
                    >
                        {sourceLanguages.map((lang) => (
                            <option key={lang} value={lang} className={`text-[14px] font-semibold ${selectedSourceLanguage === lang ? "bg-primaryColorLight text-white" : "bg-transparent text-primaryColorLight"}`}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex flex-col gap-[15px]'>

                <span className='text-[16px] font-semibold'>Target Language</span>


                <div className='flex items-center justify-between bg-accentColorLight rounded-[14px] p-[4px]'>
                    <select
                        value={selectedTargetLanguage}
                        onChange={(e) => setSelectedTargetLanguage(e.target.value)}
                        className="flex-1 min-w-[300px] px-[35px] py-[10px] rounded-[10px] text-[14px] font-semibold bg-accentColorLight"
                    >
                        {targetLanguages.map((lang) => (
                            <option key={lang} value={lang} className={`text-[14px] font-semibold ${selectedTargetLanguage === lang ? "bg-primaryColorLight text-white" : "bg-transparent text-primaryColorLight"}`}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </div>
    )
}

export default TranslationConfigModal