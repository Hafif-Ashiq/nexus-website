import React from 'react'

const UserSideBar = () => {
    return (
        <div className='flex flex-col gap-[20px] h-full'>
            <div className='flex gap-[15px]'>
                <button className='flex-1 shadow-normal bg-primaryColorLight text-white px-[32px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/add.svg" alt="" />
                    <p>Add New User</p>
                </button>
                <button className='flex-1 shadow-normal bg-white text-black px-[32px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/arrow-down.svg" alt="" />
                    <p>Download Report</p>
                </button>
            </div>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[13px] relative'>
                    <button className='w-full h-[150px] rounded-[10px] overflow-hidden shadow-normal group relative'>
                        <img src="/guide-bg.jpg" alt="" className='w-full h-full' />
                        <div className='absolute p-[9px] bg-[#00000070] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                    <div>
                        <div className='flex justify-start items-center gap-[10px]'>
                            <p className='text-[16px] font-semibold text-black'>Emily Clark</p>
                            <img src="/assets/tick-circle-blue.svg" alt="" />
                        </div>
                        <p className='text-[14px] font-medium text-[#7A7B7C]'>@emily.clark</p>
                    </div>
                    <button className='shadow-normal absolute right-[15px] bottom-0 border-white border-[4px] border-solid rounded-[20px] overflow-hidden group'>
                        <img src="/person.jpg" className='w-[120px] h-[120px] rounded-[18px]' alt="" />
                        <div className='absolute p-[9px] bg-[#00000070] bottom-[6px] right-[6px] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                </div>
                <div className='w-full h-[1px] border-[#E5E5EF] border-[1px] border-solid'></div>
                <div className='flex-1'>
                    Hello
                </div>
            </div>
        </div>
    )
}

export default UserSideBar