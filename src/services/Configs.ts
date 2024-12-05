export interface SummarizationConfig {
    type: "extractive" | "abstractive",
    length: "short" | "medium" | "long"
}

export interface TranslationConfig {
    source_languages: string[],
    target_languages: string[]
}