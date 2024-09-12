import sample from "lodash/sample";
import isEqual from "lodash/isEqual";
import { Clue, ClueOption, ClueType } from "./types";
import clueOptions from "./clueOptions";

enum Specificity {
    HIGH,
    MEDIUM,
    LOW,
}

const clueSpecificity: Record<ClueType, Specificity> = {
    [ClueType.EPISODES]: Specificity.LOW,
    [ClueType.FORMAT]: Specificity.LOW,
    [ClueType.WORDS_IN_TITLE]: Specificity.LOW,
    [ClueType.FIRST_LETTER]: Specificity.LOW,
    [ClueType.GENRE]: Specificity.MEDIUM,
    [ClueType.SOURCE]: Specificity.MEDIUM,
    [ClueType.TAG]: Specificity.MEDIUM,
    [ClueType.YEAR]: Specificity.MEDIUM,
    [ClueType.STUDIO]: Specificity.HIGH,
    [ClueType.VOICE_ACTOR]: Specificity.HIGH,
}

interface Template {
    type?: ClueType[];
    specificity?: Specificity[];
};

const clueTypeOptions = Object.values(ClueType).filter(value => typeof value === "number");

export enum Mode {
    ALL_RANDOM,
    HALF_VOICE_ACTORS,
    ALL_VOICE_ACTORS,
    BABY
}

const generateClues = (cluesPerSide: number, mode: Mode): Clue[] => {
    const allVoiceActorsTemplate = [];
    const noVoiceActorsTemplate = [];
    const babyTemplate = [];

    for (let i = 0; i < cluesPerSide; i++) {
        allVoiceActorsTemplate.push({ type: [ClueType.VOICE_ACTOR] })
        noVoiceActorsTemplate.push({ type: clueTypeOptions.filter(option => option !== ClueType.VOICE_ACTOR) })
        babyTemplate.push({ specificity: [Specificity.LOW, Specificity.MEDIUM] })
    }

    let side1;
    let side2;

    switch (mode) {
        case Mode.ALL_RANDOM:
            side1 = generateSide(cluesPerSide);
            side2 = generateSide(cluesPerSide, side1);
            break;
        case Mode.HALF_VOICE_ACTORS:
            side1 = generateSide(cluesPerSide, [], allVoiceActorsTemplate);
            side2 = generateSide(cluesPerSide, side1, noVoiceActorsTemplate);
            break;
        case Mode.ALL_VOICE_ACTORS:
            side1 = generateSide(cluesPerSide, [], allVoiceActorsTemplate);
            side2 = generateSide(cluesPerSide, side1, allVoiceActorsTemplate);
            break;
        case Mode.BABY:
            side1 = generateSide(cluesPerSide, [], babyTemplate);
            side2 = generateSide(cluesPerSide, side1, babyTemplate);
            break;
    }

    return [...side2, ...side1];
}

const generateSide = (length: number, previousSide?: Clue[], template?: Template[]): Clue[] => {
    let clues: Clue[] = [];

    for (let i = 0; i < length; i++) {
        let typeOptions = [...clueTypeOptions];
        let valueOptions = { ...clueOptions };

        if (template) {
            const thisTemplate = template[i];
            if (thisTemplate.type !== undefined) {
                typeOptions = typeOptions.filter(option => thisTemplate.type?.some(type => option === type));
            }
            if (thisTemplate.specificity !== undefined) {
                typeOptions = typeOptions.filter(option => thisTemplate.specificity?.some(specificity => clueSpecificity[option] === specificity));
            }
        }

        const previouslySelectedClues = [...clues, ...previousSide ?? []];

        // fix casting
        // undefined because length of arrays is unknown
        let clueType = sample(typeOptions) as ClueType;
        let clueValue = sample(valueOptions[clueType]) as ClueOption;

        let duplicatesPreviousClue = getDuplicatesPreviousClue(clueType, clueValue, previouslySelectedClues)
        let isPreviousSideNoGo = getIsPreviousSideNoGo(clueType, clueValue, previousSide);
        let isInvalidByYear = getIsInvalidByYear(clueType, clueValue, previousSide);

        let tries = 0;

        while (duplicatesPreviousClue || isPreviousSideNoGo || isInvalidByYear) {
            console.log('invalid clue :(');
            if (valueOptions[clueType] && valueOptions[clueType].length) {
                valueOptions[clueType] = valueOptions[clueType].filter(value => !isEqual(value, clueValue));
                if (valueOptions[clueType].length === 0) {
                    typeOptions = typeOptions.filter(type => type !== clueType);
                }
            } else if (typeOptions.length) {
                typeOptions = typeOptions.filter(type => type !== clueType);
            }

            if (typeOptions.length === 0) {
                throw new Error(`Bad clues, no valid options left ${JSON.stringify(previouslySelectedClues)}`)
            }

            tries++;
            if (tries > 50) {
                throw new Error(`Bad clues, too many tries ${JSON.stringify(previouslySelectedClues)}`);
            }

            // fix casting
            // undefined because length of arrays is unknown
            clueType = sample(typeOptions) as ClueType;
            clueValue = sample(valueOptions[clueType]) as ClueOption;

            duplicatesPreviousClue = getDuplicatesPreviousClue(clueType, clueValue, previouslySelectedClues);
            isPreviousSideNoGo = getIsPreviousSideNoGo(clueType, clueValue, previousSide);
            isInvalidByYear = getIsInvalidByYear(clueType, clueValue, previousSide);
        }

        clues.push({ type: clueType, data: clueValue })
    }

    return clues;

    function getIsPreviousSideNoGo(clueType: ClueType, clueValue: ClueOption, previousSide?: Clue[]) {
        const newClueHasNoGo = previousSide?.some(previousClue => clueValue.noGos?.some(nogo => nogo.type === previousClue.type && (nogo.value === undefined || isEqual(nogo.value, previousClue.data?.value)))) ?? false;
        const previousClueHasNoGo = previousSide?.some(previousClue => previousClue.data?.noGos?.some(nogo => nogo.type === clueType && (nogo.value === undefined || isEqual(nogo.value, clueValue.value)))) ?? false;
        return newClueHasNoGo || previousClueHasNoGo;
    }

    function getDuplicatesPreviousClue(clueType: ClueType, clueValue: ClueOption, previouslySelectedClues: Clue[]) {
        return previouslySelectedClues.some(previousClue => previousClue.type === clueType && isEqual(previousClue.data?.value, clueValue.value));
    }

    // if there aren't a lot of valid options sometimes this makes a quasi-infinite loop : /
    // might not be an issue often but also might want to use this to filter options to only valid ones
    // instead of just generating a new random selections
    function getIsInvalidByYear(clueType: ClueType, clueValue: ClueOption, previousSide?: Clue[]) {
        if (clueType === ClueType.YEAR) {
            return previousSide?.some(previousClue => {
                if (!previousClue.data?.yearsActive) {
                    return false;
                }
                return areRangesNonOverlapping(previousClue.data.yearsActive, clueValue.value)
            })
        } else if (clueValue.yearsActive) {
            return previousSide?.some(previousClue => {
                if (previousClue.data?.yearsActive) {
                    return areRangesNonOverlapping(previousClue.data.yearsActive, clueValue.yearsActive)
                }
                if (previousClue.type === ClueType.YEAR) {
                    return areRangesNonOverlapping(previousClue.data?.value, clueValue.yearsActive)
                }
                return false;
            })
        }
        return false;
    }

    function areRangesNonOverlapping(range1?: { min?: number, max?: number }, range2?: { min?: number, max?: number }) {
        if (!range1 || !range2) {
            return false;
        }
        if (range1.min && range2.max) {
            if (range1.min > range2.max) {
                return true;
            }
        }
        if (range1.max && range2.min) {
            if (range1.max < range2.min) {
                return true;
            }
        }
        return false;
    }
}

export default generateClues;