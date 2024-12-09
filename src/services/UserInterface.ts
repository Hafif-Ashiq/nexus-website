interface AccountStatus {
    is_premium: boolean;
    is_deactivated: boolean;
}

interface Community {
    posts: string[];  // Adjust the type of posts if a specific structure is known
    saved_posts: string[];  // Adjust the type of saved_posts if a specific structure is known
}

interface Guides {
    viewed_guides: string[];  // Adjust the type of viewed_guides if a specific structure is known
}

interface NotificationSettings {
    community_notis_enabled: boolean;
    app_notis_enabled: boolean;
}

interface AppCustomization {
    is_dark: boolean;
    notification_settings: NotificationSettings;
}

interface BillingInfo {
    card_number: string;
    expiry_date: string;
    cvv: string;
    is_activated: boolean;
    name: string;
}

export interface UserProfile {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    account_status: AccountStatus;
    profile_pic: string;
    background_pic: string;
    biography: string;
    community: Community;
    guides: Guides;
    app_customization: AppCustomization;
    start_date: string;
    last_payment_date: string;
    subscription_plan: "Free" | "Premium-Monthly" | "Premium-Twice" | "Premium-Yearly";
    billing_infos: BillingInfo[];
}
