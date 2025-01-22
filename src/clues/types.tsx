import { DocumentNode } from "graphql";

export enum ClueType {
    VOICE_ACTOR = "VOICE_ACTOR",
    STUDIO = "STUDIO",
    YEAR = "YEAR",
    GENRE = "GENRE",
    SOURCE = "SOURCE",
    EPISODES = "EPISODES",
    FORMAT = "FORMAT",
    WORDS_IN_TITLE = "WORDS_IN_TITLE",
    TAG = "TAG",
    FIRST_LETTER = "FIRST_LETTER",
}

export interface Clue {
    id: number,
    type: ClueType,
    value: any,
    description?: string,
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
    description?: string;
};

export type ClueQueryInfo = {
    fragment: DocumentNode;
    fragmentName: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}