import React, { useRef, useState } from 'react'
import LargeButton from '../../_components/LargeButton'
import GuideTile from './GuideTile'
import { title } from 'process'

const Guides = () => {

    const tilesData = [
        {
            title: "Learn to Translate",
            image: "/guide-bg.jpg"
        },
        {
            title: "Learn to Translate",
            image: "/guide-bg.jpg"
        },
        {
            title: "Learn to Translate",
            image: "/guide-bg.jpg"
        },
        {
            title: "Learn to Translate",
            image: "/guide-bg.jpg"
        },
        {
            title: "Learn to Translate",
            image: "/guide-bg.jpg"
        },
    ]

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(event.clientX);
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        const dx = event.clientX - dragStartX;
        scrollContainerRef.current.scrollLeft = scrollLeft - dx;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className='flex gap-[20px]'>
            <div className='w-[600px]'>
                <LargeButton activeIcon='note-favorite' inActiveIcon='' text='Create a new Guide' active onClick={() => { }} />
            </div>
            <div className='flex gap-[20px] overflow-x-auto select-none'
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}>
                {tilesData.map((tile, index) => (
                    <GuideTile key={index} title={tile.title} onDeleteClick={() => { }} image={tile.image} />
                ))}
            </div>
        </div>
    )
}

export default Guides