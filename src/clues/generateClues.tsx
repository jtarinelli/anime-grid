import sample from "lodash/sample";
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

const generateClues = (cluesPerSide: number, halfVoiceActors: boolean): Clue[] => {
    const halfVoiceActorsTemplate = [];
    const noVoiceActorsTemplate = [];

    for (let i = 0; i < cluesPerSide; i++) {
        halfVoiceActorsTemplate.push({ type: [ClueType.VOICE_ACTOR] })
        noVoiceActorsTemplate.push({ type: clueTypeOptions.filter(option => option !== ClueType.VOICE_ACTOR)})
    }

    const side1 = halfVoiceActors ? generateSide(cluesPerSide, [], noVoiceActorsTemplate) : generateSide(cluesPerSide);
    const side2 = halfVoiceActors ? generateSide(cluesPerSide, side1, halfVoiceActorsTemplate) : generateSide(cluesPerSide, side1);

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
        let duplicatesPreviousClue = previouslySelectedClues.some(previousClue => previousClue.type === clueType && previousClue.data === clueValue.value)
        let isPreviousSideNoGo = previousSide?.some(previousClue => previousClue.type === clueValue.noGo?.type && previousClue.data === clueValue.noGo.value) ?? false;

        while (duplicatesPreviousClue || isPreviousSideNoGo) {
            clueType = sample(options);
            clueValue = sample(clueOptions[clueType]);

            duplicatesPreviousClue = previouslySelectedClues.some(previousClue => previousClue.type === clueType && previousClue.data === clueValue.value)
            isPreviousSideNoGo = previousSide?.some(previousClue => previousClue.type === clueValue.noGo?.type && previousClue.data === clueValue.noGo.value) ?? false;
        }

        clues.push({ type: clueType, data: clueValue.value })

    }

    return clues;
}

export default generateClues;