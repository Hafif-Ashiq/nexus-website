import { PostInterface } from '@/services/PostInterface'
import React, { useEffect, useRef } from 'react'
import Post from './Post'
import Loader from '../Loader'

interface PostsSectionProps {
    posts: PostInterface[],
    loading: boolean,
    onLoadMore: () => void // Callback function to load more posts
}

const PostsSection = ({ posts, loading, onLoadMore }: PostsSectionProps) => {
    const endOfPostsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore(); // Call the callback function when the last post is visible
            }
        }, { threshold: 1.0 });

        if (endOfPostsRef.current) {
            observer.observe(endOfPostsRef.current);
        }

        return () => {
            if (endOfPostsRef.current) {
                observer.unobserve(endOfPostsRef.current);
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
                <Post key={post.post_id} post={post} />
            ))}
            {loading && posts.length > 0 && (
                <div className='flex justify-center items-center h-[40px] mb-[20px]'>
                    <Loader />
                </div>
            )}
            <div ref={endOfPostsRef} /> {/* This div is used to detect when the last post is visible */}
        </div>
    )
}

export default PostsSection