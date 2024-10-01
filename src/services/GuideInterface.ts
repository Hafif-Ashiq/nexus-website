
export interface GuideInterface {
    id: string,
    is_visible: boolean,
    title: string,
    description: string,
    likedBy: string[],
    viewedBy: string[],
    link: string,
    thumbnail: string,
    total_likes: number
}  