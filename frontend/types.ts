

export interface tokens {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface prompt {
    promptName: string;
    promptText: string;
}

export interface mockdata {
    _id: string;
    name: string;
    data: string;
}