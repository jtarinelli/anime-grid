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
}

export interface Clue {
    type: ClueType,
    data?: ClueOption, // don't really like nested data.value
}

export interface ClueOption {
    value: any;
    noGos?: {
        type: ClueType;
        value: any;
    }[]
};

export type ClueQueryInfo = {
    fragment: DocumentNode;
    fragmentName: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}