import React, { useRef, useState } from 'react'
import LargeButton from '../app/admin/_components/LargeButton'
import GuideTile from './GuideTile'
import { title } from 'process'
import GuideModal from '../app/admin/dashboard/_components/GuideModal'
import { GuideInterface } from '@/services/GuideInterface'
import { deleteGuideFromFirebase } from '@/firebaseFunctions/admin/guide'
import ImageModal from './modals/ImageModal'
import VideoModal from './modals/VideoModal'

interface GuidesProps {
    guides: GuideInterface[],
    editEnabled: boolean
}

const Guides = ({ guides, editEnabled }: GuidesProps) => {

    const [guideOpen, setGuideOpen] = useState(false)
    const [viewGuideIndex, setViewGuideIndex] = useState<number | null>(null)
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

    const onGuideClick = (index: number) => {
        if (editEnabled) {
            return
        }
        setViewGuideIndex(index)
    }

    return (
        <div className='flex gap-[20px] overflow-x-hidden'>
            {
                editEnabled && <div className='w-[400px]'>
                    <LargeButton activeIcon='note-favorite' inActiveIcon='' text='Create a new Guide' active onClick={() => { setGuideOpen(true) }} />
                </div>
            }
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
                {guides.map((tile, index) => (
                    <GuideTile key={index} title={tile.title} onClick={() => { onGuideClick(index) }} onDeleteClick={() => {
                        if (confirm("Are you sure you want to delete the guide?") && editEnabled) {
                            deleteGuideFromFirebase(tile.guide_id).then(res => {
                                if (res) {
                                    alert("Guide Deleted Successfully")
                                }
                                else {
                                    alert("Error in deleting Guide")
                                }
                            })
                        }
                    }} image={tile.thumbnail} editEnabled={editEnabled} />
                ))}
            </div>
            {editEnabled && guideOpen && <GuideModal onCloseClick={() => setGuideOpen(false)} />}
            {viewGuideIndex !== null && guides[viewGuideIndex].type === "image" && <ImageModal imageSelected={guides[viewGuideIndex].link} onClose={() => setViewGuideIndex(null)} timeout={10000} />}
            {viewGuideIndex !== null && guides[viewGuideIndex].type === "video" && <VideoModal videoSelected={guides[viewGuideIndex].link} onClose={() => setViewGuideIndex(null)} autoClose={true} controls={false} />}
        </div>
    )
}

export default Guides