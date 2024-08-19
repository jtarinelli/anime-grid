export enum ClueType {
    VOICE_ACTOR,
    STUDIO,
    YEAR,
    GENRE,
    ORIGINAL,
    EPISODES,
    MOVIE,
    WORDS_IN_TITLE,
}

export interface Clue {
    type: ClueType,
    data?: any, // idk what to call this but just like the VA name/year/boolean maybe. diff depending on type
}

export type ClueQueryInfo = {
    fields: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}