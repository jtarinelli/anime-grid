import { Clue, ClueType } from "./types";

const getClueString = (clue: Clue): string => {
    switch (clue.type) {
        case ClueType.VOICE_ACTOR:
        case ClueType.STUDIO:
        case ClueType.GENRE:
            return clue.data;
        case ClueType.MOVIE:
            return "Movie";
        case ClueType.YEAR: {
            const { min, max } = clue.data;
            if (min && max) {
                return `Started between ${min} and ${max}`;
            } else if (min) {
                return `Started after ${min}`;
            }
            return `Started before ${max}`
        }
        case ClueType.ORIGINAL:
            return "Is original anime (not adapted)"
        case ClueType.EPISODES: {
            const { min, max } = clue.data;
            if (!min) {
                return `Under ${max} episodes`;
            } else if (!max) {
                return `Over ${min} episodes`;
            } else if (min === 11 && max === 13) {
                return "Single cour";
            } else {
                return `Between ${min} and ${max} episodes`;
            }
        }
        default:
            throw Error("Bad clue type! CRINGE!!!")
    }
}

export default getClueString;