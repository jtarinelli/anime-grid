import { Clue, ClueType } from "./types";

const getSentenceCaseString = (string: string) => {
    return string[0].toUpperCase().concat(string.slice(1).toLowerCase());
}

const getClueString = (clue: Clue): string => {
    const clueValue = clue.value;
    switch (clue.type) {
        case ClueType.VOICE_ACTOR:
        case ClueType.STUDIO:
        case ClueType.GENRE:
            return clueValue;
        case ClueType.SOURCE:
        case ClueType.FORMAT:
        case ClueType.TAG:
            return getSentenceCaseString(clueValue);
        case ClueType.YEAR: {
            const { min, max } = clueValue;
            if (min && max) {
                return `Started ${min}-${max}`;
            } else if (min) {
                return `Started ${min} or later`;
            }
            return `Started ${max} or before`
        }
        case ClueType.EPISODES: {
            const { min, max } = clueValue;
            if (!min) {
                return `${max} or less episodes`;
            } else if (!max) {
                return `${min} or more episodes`;
            } else {
                return `Between ${min} and ${max} episodes`;
            }
        }
        case ClueType.WORDS_IN_TITLE: {
            const { min, max } = clueValue;

             if (min) {
                return `${min} or more word title`
            } else if (max) {
                return `${max} or less word title`
            } else {
                return `${clueValue} word${clueValue !== 1 ? 's' : ''} in title`
            }
        }
        case ClueType.FIRST_LETTER: {
            const { min, max } = clueValue;

            return `First letter between ${min} and ${max}`
        }
        default:
            throw Error("Bad clue type! CRINGE!!!")
    }
}

export default getClueString;