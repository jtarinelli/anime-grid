export enum ClueType {
    VOICE_ACTOR,
    STUDIO,
    YEAR,
    GENRE,
    ORIGINAL,
}

export interface Clue {
    type: ClueType,
    data: any, // idk what to call this but just like the VA name/year/boolean maybe. diff depending on type
}

export const getClueString = (clue: Clue): string => {
    switch(clue.type) {
        case ClueType.VOICE_ACTOR:
        case ClueType.STUDIO:
        case ClueType.GENRE:
            return clue.data;
        case ClueType.YEAR:
            const { start, end } = clue.data;
            if (start && end) {
                return `Started between ${start} and ${end}`;
            } else if (start) {
                return `Started before ${start}`;
            } 
            return `Started after ${end}`
        case ClueType.ORIGINAL:
            return "Is original anime (not adapted)"
        default:
            throw Error ("Bad clue type! CRINGE!!!")
    }
}