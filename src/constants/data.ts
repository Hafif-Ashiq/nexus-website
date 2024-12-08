import { SupportInterface } from "@/services/SupportInterface";
import { UserProfile } from "@/services/UserInterface";

import FolderMinus from "../../public/assets/folderIcons/folder-minus.svg"
import DoubleFolder from "../../public/assets/folderIcons/double-folder.svg"
import HeartFolder from "../../public/assets/folderIcons/heart-folder.svg"
import FavoriteChart from "../../public/assets/folderIcons/favorite-chart.svg"
import NotificationStatus from "../../public/assets/folderIcons/notification-status.svg"
import BrushSquare from "../../public/assets/folderIcons/brush-square.svg"
import Gallery from "../../public/assets/folderIcons/gallery.svg"
import AudioSquare from "../../public/assets/folderIcons/audio-square.svg"
import VideoSquare from "../../public/assets/folderIcons/video-square.svg"
import Calendar from "../../public/assets/folderIcons/calendar.svg"
import Code from "../../public/assets/folderIcons/code.svg"
import KeySquare from "../../public/assets/folderIcons/key-square.svg"

export const folderIcons: any[] = [

    { component: FolderMinus },
    { component: DoubleFolder },
    { component: HeartFolder },
    { component: FavoriteChart },
    { component: NotificationStatus },
    { component: BrushSquare },
    { component: Gallery },
    { component: AudioSquare },
    { component: VideoSquare },
    { component: Calendar },
    { component: Code },
    { component: KeySquare }
]




export const mockUser: UserProfile = {
    "user_id": "",
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