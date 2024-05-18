
import React from 'react'

const RecentUsers = () => {


    const users = [
        {
            userId: "123123",
            email: "07hafif@gmail.com",
            username: "Hafif Ashiq",
            status: "Active"
        },
        {
            userId: "123123",
            email: "07hafif@gmail.com",
            username: "Hafif Ashiq",
            status: "Active"
        },


    ]

    return (
        <div className='flex flex-col gap-[15px]'>
            <div className='flex justify-between items-center'>
                <h3 className='text-[24px] font-semibold text-textColorDarkBlue'>Recent Users</h3>
                <button className='flex justify-end items-center gap-[14px]'>
                    <p className='text-[16px] font-semibold text-primaryColorLight'>View all</p>
                    <img src="/assets/small-arrow-right.svg" alt="" />
                </button>
            </div>

            <table className='bg-white w-full rounded-[15px]'>
                <thead>
                    <tr className='flex justify-evenly text-left px-[40px] py-[17px] text-ellipsis overflow-hidden rounded-[15px] bg-primaryColorLight text-white'>
                        <th className='w-[20px]'>#</th>
                        <th className='w-[100px]'>User ID</th>
                        <th className='w-[200px]'>Email Address</th>
                        <th className='w-[200px]'>Username</th>
                        <th className='w-[100px]'>Status</th>
                        <th className='w-[50px]'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className='flex justify-evenly text-left px-[40px] py-[17px] text-ellipsis overflow-hidden rounded-[15px]'>
                            <td className='w-[20px]'>{index < 10 ? `0${index + 1}` : index + 1}</td>
                            <td className='w-[100px]'>{user.userId}</td>
                            <td className='w-[200px]'>{user.email}</td>
                            <td className='w-[200px]'>{user.username}</td>
                            <td className='w-[100px]'>{user.status}</td>
                            <td className='w-[50px]'>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default RecentUsers