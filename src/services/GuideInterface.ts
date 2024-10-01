
export interface GuideInterface {
    guide_id: string,
    is_visible: boolean,
    title: string,
    description: string,
    liked_by: string[],
    viewed_by: string[],
    link: string,
    thumbnail: string,
    total_likes: number,
    date_posted: string
}  