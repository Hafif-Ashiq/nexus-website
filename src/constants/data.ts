import { SupportInterface } from "@/services/SupportInterface";
import { UserProfile } from "@/services/UserInterface";

export const mockUser: UserProfile = {
    "id": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "account_status": {
        "is_premium": false,
        "is_deactivated": false
    },
    "profile_pic": "",
    "background_pic": "",
    "biography": "",
    "community": {
        "posts": [],
        "saved_posts": []
    },
    "guides": {
        "viewed_guides": []
    },
    "app_customization": {
        "is_dark": true,
        "notification_settings": {
            "community_notis_enabled": true,
            "app_notis_enabled": true
        }
    }
}


export const mockSupportChat: SupportInterface = {
    "user_id": "mockSupport",
    "user_name": "mockSupport",
    "issue_id": "",
    "issue_opened_time": "",
    "issue_closed_time": "",
    "issue_category": "Application",
    "issue_status": "Pending",
    "conversation": [
        {
            "sender_id": "",
            "time_stamp": "",
            "image_link": "",
            "message_type": "",
            "text": "",
            "status": {
                "is_sent": false,
                "is_seen": false
            }
        }
    ]
}