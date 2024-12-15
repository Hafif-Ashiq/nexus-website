import { PostInterface } from '@/services/PostInterface'
import React, { useEffect, useRef } from 'react'
import Post from './Post'
import Loader from '../Loader'

interface PostsSectionProps {
    posts: PostInterface[],
    loading: boolean,
    onLoadMore: () => void, // Callback function to load more posts
    isOwner?: boolean,
    concise?: boolean
}

const PostsSection = ({ posts, loading, onLoadMore, isOwner = false, concise = false }: PostsSectionProps) => {
    const endOfPostsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = endOfPostsRef.current;
            if (entries[0].isIntersecting && target) {
                onLoadMore(); // Call the callback function when the last post is visible
            }
        }, { threshold: 1.0 });

        const currentRef = endOfPostsRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [endOfPostsRef, onLoadMore]);

    if (loading && posts.length === 0) return (
        <div className='flex justify-center items-center h-[50vh]'>
            <Loader />
        </div>
    )

    return (
        <div className='flex flex-col gap-[20px]'>

            {posts.map((post) => (
                <Post key={post.post_id} post={post} isOwner={isOwner} concise={concise} />
            ))}

            <div ref={endOfPostsRef} />

            {loading && posts.length > 0 && (
                <div className='flex justify-center items-center h-[40px] mb-[20px]'>
                    <Loader />
                </div>
            )}

        </div>
    )
}

export default PostsSection