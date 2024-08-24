import { Clue, ClueType } from "./types";

const getSentenceCaseString = (string: string) => {
    return string[0].toUpperCase().concat(string.slice(1).toLowerCase());
}

const getClueString = (clue: Clue): string => {
    switch (clue.type) {
        case ClueType.VOICE_ACTOR:
        case ClueType.STUDIO:
        case ClueType.GENRE:
        case ClueType.TAG:
            return clue.data;
        case ClueType.SOURCE:
        case ClueType.FORMAT:
            return getSentenceCaseString(clue.data);
        case ClueType.YEAR: {
            const { min, max } = clue.data;
            if (min && max) {
                return `Started between ${min} and ${max}`;
            } else if (min) {
                return `Started after ${min}`;
            }
            return `Started before ${max}`
        }
        case ClueType.EPISODES: {
            const { min, max } = clue.data;
            if (!min) {
                return `${max} or less episodes`;
            } else if (!max) {
                return `${min} or more episodes`;
            } else {
                return `Between ${min} and ${max} episodes`;
            }
        }
        case ClueType.WORDS_IN_TITLE: {
            const { number, min, max } = clue.data;

            if (number) {
                return `${number} word${number !== 1 ? 's' : ''} in title`
            } else if (min) {
                return `${min} or more words in title`
            } else {
                return `${max} or less words in title`
            }
        }
        default:
            throw Error("Bad clue type! CRINGE!!!")
    }
}

export default getClueString;