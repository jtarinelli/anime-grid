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
}

const generateClues = (cluesPerSide: number, mode: Mode): Clue[] => {
    const allVoiceActorsTemplate = [];
    const noVoiceActorsTemplate = [];

    for (let i = 0; i < cluesPerSide; i++) {
        allVoiceActorsTemplate.push({ type: [ClueType.VOICE_ACTOR] })
        noVoiceActorsTemplate.push({ type: clueTypeOptions.filter(option => option !== ClueType.VOICE_ACTOR) })
    }

    let side1;
    let side2;

    switch (mode) {
        case Mode.ALL_RANDOM:
            side1 = generateSide(cluesPerSide);
            side2 = generateSide(cluesPerSide, side1);
            break;
        case Mode.HALF_VOICE_ACTORS:
            side1 = generateSide(cluesPerSide, [], noVoiceActorsTemplate);
            side2 = generateSide(cluesPerSide, side1, allVoiceActorsTemplate);
            break;
        case Mode.ALL_VOICE_ACTORS:
            side1 = generateSide(cluesPerSide, [], allVoiceActorsTemplate);
            side2 = generateSide(cluesPerSide, side1, allVoiceActorsTemplate);
            break;
    }

    return [...side1, ...side2];
}

const generateSide = (length: number, previousSide?: Clue[], template?: Template[]): Clue[] => {
    const clues: Clue[] = [];

    for (let i = 0; i < length; i++) {
        let options = [...clueTypeOptions];

        if (template) {
            const thisTemplate = template[i];
            if (thisTemplate.type !== undefined) {
                options = options.filter(option => thisTemplate.type?.some(type => option === type));
            }
            if (thisTemplate.specificity !== undefined) {
                options = options.filter(option => thisTemplate.specificity?.some(specificity => clueSpecificity[option] === specificity));
            }
        }

        const previouslySelectedClues = [...clues, ...previousSide ?? []];

        let clueType: ClueType = sample(options);
        let clueValue: ClueOption = sample(clueOptions[clueType]);

        let duplicatesPreviousClue = getDuplicatesPreviousClue(clueType, clueValue, previouslySelectedClues)
        let isPreviousSideNoGo = getIsPreviousSideNoGo(clueType, clueValue, previousSide);
        let isInvalidByYear = getIsInvalidByYear(clueType, clueValue, previousSide);

        while (duplicatesPreviousClue || isPreviousSideNoGo || isInvalidByYear) {
            console.log('invalid clue :(');
            clueType = sample(options);
            clueValue = sample(clueOptions[clueType]);

            duplicatesPreviousClue = getDuplicatesPreviousClue(clueType, clueValue, previouslySelectedClues);
            isPreviousSideNoGo = getIsPreviousSideNoGo(clueType, clueValue, previousSide);
            isInvalidByYear = getIsInvalidByYear(clueType, clueValue, previousSide);
        }

        clues.push({ type: clueType, data: clueValue })
    }

    return clues;

    function getIsPreviousSideNoGo(clueType: ClueType, clueValue: ClueOption, previousSide?: Clue[]) {
        const newClueHasNoGo = previousSide?.some(previousClue => clueValue.noGos?.some(nogo => nogo.type === previousClue.type && isEqual(nogo.value, previousClue.data?.value))) ?? false;
        const previousClueHasNoGo = previousSide?.some(previousClue => previousClue.data?.noGos?.some(nogo => nogo.type === clueType && isEqual(nogo.value, clueValue.value))) ?? false;
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