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
    type: ClueType,
    value: any,
    //data?: ClueOption, // don't really like nested data.value
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