import sample from "lodash/sample";
import { Clue, ClueType } from "./types";
import clueOptions from "./clueOptions";

const generateClues = (number: number, halfVoiceActors: boolean): Clue[] => {
    const clues: Clue[] = [];

    let clueTypeOptions = Object.values(ClueType).filter(value => typeof value === "number");

    for (let i = 0; i < number; i++) {
        let type: ClueType;
        if (halfVoiceActors && (i >= number / 2)) {
            type = ClueType.VOICE_ACTOR;
        } else if (halfVoiceActors && (i < number / 2)) {
            type = sample(clueTypeOptions.filter(option => option !== ClueType.VOICE_ACTOR));
        } else {
            type = sample(clueTypeOptions);
        }
        clueTypeOptions = clueTypeOptions.filter(option => option !== type);
        const data = sample(clueOptions[type])
        clues.push({type, data});
    }
    return clues;
}

export default generateClues;