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
    data?: ClueOption, // idk what to call this but just like the VA name/year/boolean maybe. diff depending on type
}

export interface ClueOption {
    value: any;
    noGo?: {
        type: ClueType;
        value: any;
    }
};

export type ClueQueryInfo = {
    fragment: DocumentNode;
    fragmentName: string;
    isPaginated: boolean;
    getHasNextPage?: Function;
}