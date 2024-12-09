export const getInitialUserProfile = async (userId: string, firstName: string, lastName: string, email: string, profile_pic?: string) => {
    const initialUserProfile = {
        user_id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        account_status: {
            is_premium: false,
            is_deactivated: false
        },
        profile_pic: profile_pic || '',
        background_pic: '',
        biography: '',
        community: {
            posts: [],
            saved_posts: []
        },
        guides: {
            viewed_guides: []
        },
        app_customization: {
            is_dark: false,
            notification_settings: {
                community_notis_enabled: true,
                app_notis_enabled: true
            }
        },
        start_date: new Date().toISOString(),
        last_payment_date: '',
        subscription_plan: "Free" as const,
        billing_infos: []
    }
    return initialUserProfile
}