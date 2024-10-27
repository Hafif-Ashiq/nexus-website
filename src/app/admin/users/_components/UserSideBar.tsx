import React, { useEffect, useState } from 'react'
import AccountDetailsSide from './AccountDetailsSide'
import BillingDetails from './BillingDetails'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { chat, mockUsers } from '@/services/abc';
import SubscriptionPlanSide from './SubscriptionPlanSide';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { addNewUser, deleteUser, updateUser } from '@/firebaseFunctions/admin/users';
import { setCurrentUser } from '@/redux/slices/adminSlice';
import { mockUser } from '@/constants/data';
import AddUserModal from './AddUserModal';

enum CardDisplay {
    userInfo, billingInfo, subscriptionInfo
}

const UserSideBar = () => {

    const user = useSelector((state: RootState) => state.adminReducer.currentUser)
    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)

    const dispatch = useDispatch()

    const [activeCard, setActiveCard] = useState(CardDisplay.userInfo)
    const [addUser, setAddUser] = useState(false)




    // useEffect(() => {
    //     setAddUser(false)
    // }, [user])


    return (
        <div className='flex flex-col gap-[20px] h-[80vh]'>
            <div className='flex gap-[15px]'>
                <button onClick={() => {
                    setAddUser(true)
                    setActiveCard(CardDisplay.userInfo)
                }} className='flex-1 shadow-normal bg-primaryColorLight text-white px-[25px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/add.svg" alt="" />
                    <p>Add New User</p>
                </button>
                <button className='flex-1 shadow-normal bg-white text-black px-[25px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/arrow-down-black.svg" alt="" />
                    <p>Download Report</p>
                </button>
            </div>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[13px] relative'>
                    <button className='w-full h-[150px] rounded-[10px] overflow-hidden shadow-normal group relative bg-accentColorLight'>
                        <img src={user.background_pic ? user.background_pic : "/guide-bg.jpg"} alt="" className='w-full h-full' />
                        <div className='absolute p-[9px] bg-[#00000070] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                    <div>
                        <div className='flex justify-start items-center gap-[10px]'>
                            <p className='text-[16px] font-semibold text-black'>{user.first_name + " " + user.last_name}</p>
                            <img src="/assets/tick-circle-blue.svg" alt="" />
                        </div>
                        <p className='text-[14px] font-medium text-[#7A7B7C]'>{user.email}</p>
                    </div>
                    <button className='shadow-normal absolute right-[15px] bottom-0 border-white border-[4px] border-solid rounded-[20px] overflow-hidden group bg-accentColorLight'>
                        <div className='w-[120px] h-[120px] rounded-[18px]'>
                            <img src={user.profile_pic ? user.profile_pic : "/person.jpg"} alt="" className='object-cover w-full h-full' />
                        </div>
                        <div className='absolute p-[9px] bg-[#00000070] bottom-[6px] right-[6px] rounded-full hidden group-hover:block'>
                            <img src="/assets/pencil-filled-white.svg" alt="" className='object-fit' />
                        </div>
                    </button>
                </div>
                <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
                <div className='flex-1'>
                    {
                        activeCard == CardDisplay.userInfo && <AccountDetailsSide
                            onAddClick={(user) => {

                            }}
                            onDeleteClick={() => {
                                if (!(confirm("Are you sure to delete this user?"))) {
                                    return
                                }
                                deleteUser(user.id)
                                dispatch(setCurrentUser(mockUser))
                            }}
                            onUpdateClick={(first, last, mail, bio) => {
                                updateUser(user.id, {
                                    first_name: first,
                                    last_name: last,
                                    email: mail,
                                    biography: bio
                                })

                            }}
                            onBillingClick={() => setActiveCard(CardDisplay.billingInfo)}
                            onSubsClick={() => setActiveCard(CardDisplay.subscriptionInfo)}
                            addUser={false}
                            user_id={user.id}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            biography={user.biography}
                            email={user.email}
                            password={user.password}
                        />
                    }
                    {
                        activeCard == CardDisplay.billingInfo && <BillingDetails
                            onBack={() => setActiveCard(CardDisplay.userInfo)}

                        />
                    }
                    {
                        activeCard == CardDisplay.subscriptionInfo && <SubscriptionPlanSide onBack={() => setActiveCard(CardDisplay.userInfo)} />
                    }
                    {
                        addUser && <AddUserModal onCloseClick={() => setAddUser(false)} />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserSideBar