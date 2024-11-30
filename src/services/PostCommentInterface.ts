export interface PostCommentInterface {
    user_id: string;
    comment_id: string;
    text: string;
    liked_by: string[];
    total_likes: number;
    date_created: string;
}