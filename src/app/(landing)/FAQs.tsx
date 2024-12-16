"use client"

import React, { useState } from 'react'

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What AI tools does NEXUS offer for learning?",
            answer: "NEXUS provides AI-powered tools for content translation, summarization, and transcription. These tools enhance your learning experience by making content more accessible and manageable in multiple formats."
        },
        {
            question: "How can I upload my content to NEXUS?",
            answer: "You can upload content in various formats such as text (docx, pdf), images, audio (mp3, wav), and videos (mp4, avi). You can also drag and drop files directly or upload from third-party services like Google Drive."
        },
        {
            question: "Can I personalize the translation or summarization results?",
            answer: "Yes, NEXUS allows you to customize your content transformation preferences, including selecting summary lengths and adjusting translation settings based on your needs."
        },
        {
            question: "How secure is my data on NEXUS?",
            answer: "Your data is securely stored with industry-standard encryption methods. NEXUS ensures that your information, including personal data and uploaded content, is safe and protected."
        },
        {
            question: "Can I share my transformed content with others?",
            answer: "Yes, you can share your content, including summaries and translations, with others via social media or direct links. NEXUS provides secure sharing mechanisms for easy distribution."
        },
        {
            question: "What should I do if I encounter an issue with NEXUS?",
            answer: "If you experience any issues, you can reach out to our customer support team via the help section. We offer assistance for all your inquiries related to features, functionality, and more."
        },
        {
            question: "Are there any limitations on the types of content I can upload?",
            answer: "NEXUS supports a wide range of content types, including text documents, images, audio, and video files. However, please ensure that the files meet the platform's size and format guidelines."
        }
    ]

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='w-full flex flex-col justify-start items-start gap-[32px]'>
            <h2 className='text-[40px] font-semibold leading-[64px] text-white'>FAQs</h2>
            <div className='w-full flex flex-col justify-start items-start gap-[16px]'>
                {faqs.map((faq, index) => (
                    <div
                        key={faq.question}
                        className='w-full overflow-hidden transition-opacity duration-300 ease-in-out'
                        style={{
                            opacity: openIndex === index ? '1' : '0.7'
                        }}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className='w-full flex justify-between items-center p-[24px] text-left cursor-pointer'
                        >
                            <h2 className='text-[24px] font-semibold leading-[32px] text-white'>{faq.question}</h2>
                            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                {openIndex === index ? <img src="/landingPage/assets/minus.svg" alt="" /> : <img src="/landingPage/assets/plus.svg" alt="" />}
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100 p-[24px] pt-0' : 'max-h-0 opacity-0'}`}
                        >
                            <p className='text-[16px] font-normal leading-[24px] text-landingSecondaryColorLight'>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQs