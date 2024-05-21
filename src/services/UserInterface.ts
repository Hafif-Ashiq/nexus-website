interface AccountStatus {
    is_premium: boolean;
    is_deactivated: boolean;
}

interface Community {
    posts: any[];  // Adjust the type of posts if a specific structure is known
    saved_posts: any[];  // Adjust the type of saved_posts if a specific structure is known
}

interface Guides {
    viewed_guides: any[];  // Adjust the type of viewed_guides if a specific structure is known
}

interface NotificationSettings {
    community_notis_enabled: boolean;
    app_notis_enabled: boolean;
}

interface AppCustomization {
    is_dark: boolean;
    notification_settings: NotificationSettings;
}

export interface UserProfile {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    account_status: AccountStatus;
    profile_pic: string;
    background_pic: string;
    biography: string;
    community: Community;
    guides: Guides;
    app_customization: AppCustomization;
}
