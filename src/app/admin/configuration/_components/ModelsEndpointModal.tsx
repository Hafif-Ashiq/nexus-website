import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { updateEndpointPrefix } from '@/firebaseFunctions/admin/aiModels';

interface ModelsEndpointModalProps {
    onClose: () => void
}

const ModelsEndpointModal = ({ onClose }: ModelsEndpointModalProps) => {

    const [endpoint, setEndpoint] = useState('')

    const handleUpdateEndpoint = async () => {
        await updateEndpointPrefix(endpoint)
        onClose()
    }

    return (
        <div className='fixed inset-0 bg-[#00000090] w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <div className='w-[600px] h-[250px] bg-white p-[25px] rounded-[25px]'>

                {/* Cross */}
                <button onClick={onClose} className='absolute right-[10px] top-[10px] '>
                    <img className='w-[45px] h-[45px]' src="/assets/cancel-white.svg" alt='cancel' />
                </button>
                <div className='flex flex-col gap-[20px]'>
                    <span className='text-[24px] font-semibold text-primaryColorLight'>Ai Models Endpoint</span>
                    <input type="text" placeholder='Enter Endpoint' className='w-full text-[18px] rounded-[10px] border-[1px] border-borderColorLight p-[10px] focus:outline-primaryColorLight text-primaryColorLight text-medium' value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
                    <button onClick={handleUpdateEndpoint} className='bg-primaryColorLight text-white px-[20px] py-[10px] rounded-[10px]'>Update</button>
                </div>

            </div>
        </div>
    )
}

export default ModelsEndpointModal