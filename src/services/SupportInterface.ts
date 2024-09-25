

interface SentInterface {
    is_sent: boolean,
    is_seen: boolean
}


export interface ConversationInterface {
    sender_id: string,
    time_stamp: string,
    image_link?: string,
    message_type: string,
    text?: string,
    status: SentInterface

}


export interface SupportInterface {
    user_id: string;
    user_name?: string;
    issue_id: string;
    issue_opened_time: string;
    issue_closed_time: string;
    issue_category: "AI Features" | "Community" | "Application" | "Custom";
    issue_status: "Pending" | "Closed" | "Resolved";

    conversation: ConversationInterface[]
}



//issue_status: ["Pending", "Closed", "Resolved"]
//issue_category: ["AI Features", "Community", "Application", "Custom"]
