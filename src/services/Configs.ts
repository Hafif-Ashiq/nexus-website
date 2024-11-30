export interface SummarizationConfig {
    type: "extractive" | "abstractive",
    length: "short" | "medium" | "long"
}

export interface TranslationConfig {
    source_language: string,
    target_language: string
}