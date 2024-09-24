import React, { useState } from 'react'
import AccountDetailsSide from './AccountDetailsSide'
import BillingDetails from './BillingDetails'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { chat, users } from '@/services/abc';
import SubscriptionPlanSide from './SubscriptionPlanSide';
import { UserProfile } from '@/services/UserInterface';

enum CardDisplay {
    userInfo, billingInfo, subscriptionInfo
}

const UserSideBar = () => {

    const [activeCard, setActiveCard] = useState(CardDisplay.userInfo)
    const [addUser, setAddUser] = useState(false)

    const [firstName, setFirstName] = useState("hello")
    const [lastName, setLastName] = useState("")
    const [biography, setBiography] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const addUserToFirebase = async (user: UserProfile) => {

        try {
            const docRef = await addDoc(collection(db, "users"), user);
            console.log("Document written with ID: ", docRef.id);
            alert("User added")
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const addAllUsers = async () => {


        users.forEach(async (user, index) => {
            try {
                const docRef = await addDoc(collection(db, "users"), user);
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
    }


    const addChat = async () => {



        try {
            // Xjp0Hi2CK0LD1a9i3KPt
            const docRef = await addDoc(collection(db, "users", 'Xjp0Hi2CK0LD1a9i3KPt', "chat"), chat);

            // contentArray.forEach(async (content, index) => {
            //     try {
            //         const docRef = await addDoc(collection(db, "users", 'Xjp0Hi2CK0LD1a9i3KPt', "content"), content);
            //         console.log("Document written with ID: ", docRef.id);
            //     } catch (e) {
            //         console.error("Error adding document: ", e);
            //     }
            // })

            // console.log("Document written with ID: ", d.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    // Call the function


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
                <button  className='flex-1 shadow-normal bg-white text-black px-[25px] py-[18px] flex justify-center items-center gap-[7px] text-[16px] font-semibold rounded-[15px]'>
                    <img src="/assets/arrow-down.svg" alt="" />
                    <p>Download Report</p>
                </button>
            </div>
            <div className='shadow-normal bg-white h-full rounded-[15px] p-[20px] flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[13px] relative'>
                    <button className='w-full h-[150px] rounded-[10px] overflow-hidden shadow-normal group relative bg-accentColorLight'>
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
                    <button className='shadow-normal absolute right-[15px] bottom-0 border-white border-[4px] border-solid rounded-[20px] overflow-hidden group bg-accentColorLight'>
                        <div className='w-[120px] h-[120px] rounded-[18px]'>
                            <img src="/person.jpg" alt="" className='object-cover w-full h-full' />
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
                            onAddClick={(user) => { addUserToFirebase(user) }}
                            onBillingClick={() => setActiveCard(CardDisplay.billingInfo)}
                            onSubsClick={() => setActiveCard(CardDisplay.subscriptionInfo)}
                            addUser={addUser}
                            firstName={firstName}
                            lastName={lastName}
                            biography={biography}
                            email={email}
                            password={password}
                        />
                    }
                    {
                        activeCard == CardDisplay.billingInfo && <BillingDetails onBack={() => setActiveCard(CardDisplay.userInfo)} />
                    }
                    {
                        activeCard == CardDisplay.subscriptionInfo && <SubscriptionPlanSide onBack={() => setActiveCard(CardDisplay.userInfo)} />
                    }


                </div>
            </div>
        </div>
    )
}

export default UserSideBar