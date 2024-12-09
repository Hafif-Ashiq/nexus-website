import { SummarizationConfig, TranslationConfig } from "./Configs"

export interface AiChatMessageInterface {
    text: string,
    message_type: string,
    datetime: string,
    response_status?: {
        is_liked: boolean,
        is_disliked: boolean
    },
    response_message_id?: string
}

export interface AiChatInterface {
    chat_id: string,
    user_id: string,
    conversation: AiChatMessageInterface[],
    chat_type: string,
    summarization_config?: SummarizationConfig,
    translation_config?: TranslationConfig,
}