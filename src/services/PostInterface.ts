interface PostPermissionInterface {
    is_private: boolean;
    comment_allowed: boolean;
    like_allowed: boolean;
    share_allowed: boolean;

}

export interface PostInterface {
    post_id: string;
    user_id: string;
    description: string;
    date_created: string;
    images: string[];
    total_likes: number;
    total_comments: number;
    total_shares: number;
    permissions: PostPermissionInterface
    liked_by: string[];
    saved_by: string[];
}