interface LanguageInterface {

    source: string,
    target: string

}

export interface AiModelInterface {
    model_id: string,
    model_name: string,
    endpoint: string,
    languages: LanguageInterface | null,
    active_status: boolean,
    total_up_votes: number,
    total_down_votes: number
}
