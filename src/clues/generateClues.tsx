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
    NORMAL,
    HALF_VOICE_ACTORS,
    ALL_VOICE_ACTORS,
}

const generateClues = (cluesPerSide: number, mode: Mode): Clue[] => {
    const allVoiceActorsTemplate = [];
    const noVoiceActorsTemplate = [];

    for (let i = 0; i < cluesPerSide; i++) {
        allVoiceActorsTemplate.push({ type: [ClueType.VOICE_ACTOR] })
        noVoiceActorsTemplate.push({ type: clueTypeOptions.filter(option => option !== ClueType.VOICE_ACTOR)})
    }

    let side1;
    let side2;

    switch(mode) {
        case Mode.NORMAL:
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
        let duplicatesPreviousClue = previouslySelectedClues.some(previousClue => previousClue.type === clueType && isEqual(previousClue.data, clueValue.value))
        let isPreviousSideNoGo = previousSide?.some(previousClue => clueValue.noGos?.some(nogo => nogo.type === previousClue.type && isEqual(nogo.value, previousClue.data))) ?? false;

        while (duplicatesPreviousClue || isPreviousSideNoGo) {
            clueType = sample(options);
            clueValue = sample(clueOptions[clueType]);

            duplicatesPreviousClue = previouslySelectedClues.some(previousClue => previousClue.type === clueType && isEqual(previousClue.data, clueValue.value))
            isPreviousSideNoGo = previousSide?.some(previousClue => clueValue.noGos?.some(nogo => nogo.type === previousClue.type && isEqual(nogo.value, previousClue.data))) ?? false;
        }

        clues.push({ type: clueType, data: clueValue.value })

    }

    return clues;
}

export default generateClues;