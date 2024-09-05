import { DocumentNode } from "graphql";

export enum ClueType {
    VOICE_ACTOR,
    STUDIO,
    YEAR,
    GENRE,
    SOURCE,
    EPISODES,
    FORMAT,
    WORDS_IN_TITLE,
    TAG,
    FIRST_LETTER,
}

export interface Clue {
    type: ClueType,
    data?: ClueOption, // don't really like nested data.value
}

export interface ClueOption {
    value: any;
    noGos?: {
        type: ClueType;
        value?: any;
    }[]
    yearsActive?: {
        min?: number;
        max?: number;
    }
};

export type ClueQueryInfo = {
    fragment: DocumentNode;
    fragmentName: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}