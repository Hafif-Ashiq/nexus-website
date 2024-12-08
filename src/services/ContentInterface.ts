import { SummarizationConfig, TranslationConfig } from "./Configs"

export enum ContentType {
    VIDEO = "video",
    AUDIO = "audio",
    DOCUMENT = "document",
    IMAGE = "image"
}

interface StatusInterface {
    is_liked: boolean,
    is_disliked: boolean
}

interface TranslationInterface {
    text: string,
    status: StatusInterface,
    translation_config: TranslationConfig
}

interface SummarizationInterface {
    text: string,
    status: StatusInterface,
    summarization_config: SummarizationConfig
}

export interface ContentInterface {
    content_id: string,
    extracted_text: string,
    date_updated: string,
    translation?: TranslationInterface,
    summarization?: SummarizationInterface,
    type: ContentType,
    title: string,
    folder_id: string,
    thumbnail: string,
    link: string,
    tags: string[]
}

