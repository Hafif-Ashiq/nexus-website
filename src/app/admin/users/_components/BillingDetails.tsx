import React, { useEffect, useState } from 'react'


interface billingDetailsProps {
    onBack: () => void;
}


const BillingDetails: React.FC<billingDetailsProps> = ({ onBack }) => {
    const [name, setName] = useState("")

    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCVV] = useState("")


    interface billingCard {
        cardType: string,
        name: string,
        cardNumber: string
    }

    const cards: billingCard[] = [
        {
            cardType: "visa",
            name: "Emily Clark",
            cardNumber: "1234567890123456"
        },
        {
            cardType: "visa",
            name: "Hafif Ashiq",
            cardNumber: "1234567890123456"
        },
    ]



    return (
        <div className='flex flex-col gap-[10px] h-full justify-between'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-[14px]'>
                    <button onClick={onBack}>
                        <img src="/assets/small-arrow-left-black.svg" alt="" />
                    </button>
                    <h3 className='text-[20px] font-semibold text-black'>Billing Details</h3>
                </div>
                <div className='flex items-center justify-end gap-[20px]'>
                    <button>
                        <img src="/assets/trash-black.svg" alt="" />
                    </button>
                    <button>
                        <img src="/assets/add-circle.svg" alt="" />
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-[10px]  '>
                <label htmlFor="username" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Full Name</p>

                    <input
                        type="text"
                        name='username'
                        className='input-field flex-1'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Name'
                        autoComplete='off'
                    />


                </label>
                <label htmlFor="card-number" className='flex flex-col gap-[10px]'>
                    <p className='text-[16px] font-bold text-primaryColorLight'>Card Number</p>
                    <input
                        type="number"
                        name='card-number'
                        className='input-field w-full'
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        placeholder='1234 5678 9012 3456'

                    />
                </label>
                <div className='flex justify-between items-center gap-[15px] '>
                    <label htmlFor="date" className='flex flex-col gap-[10px] w-[70%]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>Expiration Date</p>
                        <input
                            type="month"
                            name='date'
                            className='input-field flex-1'
                            value={expiry}
                            onChange={(event) => setExpiry(event.target.value)}
                            placeholder='December 12, 2028'
                            autoComplete='off'
                        />

                    </label>
                    <label htmlFor="cvv" className='flex flex-col gap-[10px] max-w-[30%]'>
                        <p className='text-[16px] font-bold text-primaryColorLight'>CVV</p>
                        <input
                            type="number"
                            maxLength={3}
                            minLength={3}
                            name='cvv'
                            className='input-field flex-1'
                            value={cvv}
                            onChange={(event) => setCVV(event.target.value)}
                            placeholder='123'
                            autoComplete='off'

                        />

                    </label>
                </div>

            </div>
            <div className='w-full h-[1px] border-[#EBEEF4] border-[1px] border-solid'></div>
            <div className='flex flex-col gap-[10px]'>
                <p className='text-[16px] font-bold text-primaryColorLight'>Existing Accounts</p>
                {
                    cards.length !== 0 ? cards.map((card, index) => (
                        <div key={index} className='px-[15px] py-[13px] text-[16px] text-primaryColorLight border-[1px] border-solid border-[#CBD5E4]  rounded-[15px] font-semibold flex gap-[15px]'>
                            <img src={`/assets/${card.cardType}.svg`} alt="" />
                            <div className='w-[1px] flex items-stretch border-[#EBEEF4] border-[1px] border-solid'></div>
                            <div className='flex-1 flex justify-between items-center '>
                                <p>{card.name}</p>
                                <p>{card.cardNumber}</p>
                            </div>
                        </div>
                    )) : <div className='bg-accentColorLight w-full min-h-[110px] rounded-[10px] shadow-normal'></div>
                }
            </div>
        </div>
    )
}

export default BillingDetails