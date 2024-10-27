export interface AiChatMessageInterface {
    text: string,
    message_type: string,
    datetime: string,
    response_status: {
        is_liked: boolean,
        is_disliked: boolean
    }
}

export interface AiChatInterface {
    user_id: string,
    conversation: AiChatMessageInterface[],
    chat_type: string,
    summarization_config: {
        length: string,
        sentences: number,
        style: string
    },
    translation_config: {
        source_language: string,
        target_language: string
    }
}